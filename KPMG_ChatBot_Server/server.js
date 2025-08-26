import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import usersRoute from './routes/users_route.js';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', usersRoute);

const initApp = async () => {
	return new Promise(async (resolve, reject) => {
		await mongoose.connect(process.env.DB_CONNECTION);
		resolve(app);
	});
};

export default initApp;
