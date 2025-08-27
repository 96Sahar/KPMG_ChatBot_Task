import { Request, Response } from 'express';
import userModel from '../models/users_model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { tokenPayload, generateTokens } from '../middleware/auth_middleware';

const register = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).send('Missing data');
	}
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const user = await userModel.create({
			email: email,
			password: hashedPassword,
		});
		return res.status(201).send(user);
	} catch (err) {
		res.status(400).send('registration failed' + err);
		return;
	}
};

const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400).send('Email or password are required');
		return;
	}
	try {
		const user = await userModel.findOne({ email: email });
		if (!user) return res.status(400).send('Wrong email or password');
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			res.status(400).send('Wrong email or password');
			return;
		}

		const tokens = generateTokens(user._id.toString());
		if (!tokens) {
			res.status(400).send('Token generation failed');
			return;
		}
		const { accessToken, refreshToken } = tokens;

		user.refreshToken.push(refreshToken);
		await user.save();
		res.status(200).send({
			email: user.email,
			_id: user._id,
			accessToken: accessToken,
			refreshToken: refreshToken,
		});
	} catch (err) {
		return res.status(400).send('login failed' + err);
	}
};

const logout = async (req: Request, res: Response) => {
	const refreshToken = req.body.refreshToken;
	if (!refreshToken) {
		res.status(400).send('Missing refresh token');
	}
	if (!process.env.TOKEN_SECRET) {
		res.status(400).send('missing auth configuration');
		return;
	}

	jwt.verify(
		refreshToken,
		process.env.TOKEN_SECRET,
		async (err: unknown, data: unknown) => {
			if (err) {
				res.status(403).send('invalid token');
				return;
			}
			const payload = data as tokenPayload;
			try {
				const user = await userModel.findOne({ _id: payload._id });
				if (!user) {
					res.status(400).send('invalid token');
					return;
				}
				if (
					!user.refreshToken ||
					!user.refreshToken.includes(refreshToken)
				) {
					res.status(400).send('invalid refresh token');
					user.refreshToken = [];
					await user.save();
					return;
				}
				user.refreshToken = user.refreshToken.filter(
					(token) => token != refreshToken
				);
				await user.save();
				res.status(200).send('Logged out');
			} catch (err) {
				res.status(400).send('Logout failed: ' + err);
			}
		}
	);
};

const refresh = async (req: Request, res: Response) => {
	const refreshToken = req.body.refreshToken;
	if (!refreshToken) {
		res.status(400).send('invalid token');
		return;
	}
	if (!process.env.TOKEN_SECRET) {
		res.status(400).send('missing auth configuration');
		return;
	}

	jwt.verify(
		refreshToken,
		process.env.TOKEN_SECRET,
		async (err: unknown, data: unknown) => {
			if (err) {
				res.status(403).send('invalid token');
				return;
			}
			const payload = data as tokenPayload;
			try {
				const user = await userModel.findOne({ _id: payload._id });
				if (!user) {
					res.status(400).send('invalid token');
					return;
				}
				const tokens = generateTokens(user._id.toString());
				if (!tokens) {
					res.status(400).send('Token generation failed');
					return;
				}
				const { accessToken, refreshToken } = tokens;
				if (
					!user.refreshToken ||
					!user.refreshToken.includes(refreshToken)
				) {
					user.refreshToken = [];
					await user.save();
					res.status(400).send('invalid refresh token');
					return;
				}
				user.refreshToken = user.refreshToken.filter(
					(token) => token !== refreshToken
				);

				user.refreshToken.push(refreshToken);
				await user.save();

				return res.status(200).send({
					accessToken: accessToken,
					refreshToken: refreshToken,
				});
			} catch (err) {
				res.status(400).send('Refresh failed: ' + err);
			}
		}
	);
};
export default { register, login, logout, refresh };
