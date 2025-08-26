import userModel from '../models/users_model.js';

const getAllUsers = async (req, res) => {
	const emailFilter = req.query.email;
	try {
		const usersFound = await userModel.find(
			emailFilter ? { email: emailFilter } : {}
		);
		res.status(200).send(usersFound);
	} catch (err) {
		console.log(err);
		res.status(400).send(err.message);
	}
	console.log('Get all Users');
};

const getUserById = async (req, res) => {
	try {
		const userId = req.params.id;
		const userFound = await userModel.findById(userId);
		res.status(200).send(userFound);
	} catch (err) {
		console.log(err);
		res.status(400).send(err.message);
	}
	console.log('Get User By Id');
};
const createUser = async (req, res) => {
	const user = req.body;
	try {
		const newUser = await userModel.create(user);
		console.log('User created successfully:', newUser);
		res.status(200).send(newUser);
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
};

export { getAllUsers, createUser, getUserById };
