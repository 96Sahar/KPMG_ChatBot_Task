import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export type tokenPayload = {
	_id: string;
};
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) {
		res.status(401).send('Missing token');
		return;
	}
	if (!process.env.TOKEN_SECRET) {
		res.status(400).send('Missing auth configuration');
		return;
	}
	jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
		if (err) {
			res.status(403).send('invalid token');
			return;
		}
		const payload = data as tokenPayload;
		req.query.userId = payload!._id;
		next();
	});
};

const generateTokens = (
	_id: string
): { accessToken: string; refreshToken: string } | null => {
	const random = Math.floor(Math.random() * 1000000);
	if (!process.env.TOKEN_SECRET) {
		return null;
	}
	const accessToken = jwt.sign(
		{ id: _id, random: random },
		process.env.TOKEN_SECRET,
		{
			expiresIn: '1h',
		}
	);

	const refreshToken = jwt.sign(
		{ _id: _id, random: random },
		process.env.TOKEN_SECRET,
		{ expiresIn: '1d' }
	);

	return { accessToken, refreshToken };
};

export { authMiddleware, generateTokens };
