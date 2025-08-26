import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import usersRoute from './routes/users_route';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

const initApp = (): Promise<Express> => {
	return new Promise<Express>((resolve, reject) => {
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', () => console.log('Connected to Database'));
		mongoose
			.connect(process.env.DB_CONNECTION)
			.then(() => {
				app.use(bodyParser.json());
				app.use(bodyParser.urlencoded({ extended: true }));
				app.use('/users', usersRoute);
				resolve(app);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export default initApp;
