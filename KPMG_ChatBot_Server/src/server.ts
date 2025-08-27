import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import users_routes from './routes/users_route';
import auth_routes from './routes/auth_routes';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

const initApp = (): Promise<Express> => {
	return new Promise<Express>((resolve, reject) => {
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', () => console.log('Connected to Database'));

		if (process.env.DB_CONNECTION) {
			mongoose
				.connect(process.env.DB_CONNECTION)
				.then(() => {
					app.use(bodyParser.json());
					app.use(bodyParser.urlencoded({ extended: true }));
					app.use('/users', users_routes);
					app.use('/auth', auth_routes);
					resolve(app);
				})
				.catch((err) => {
					reject(err);
				});
		} else {
			reject('DB_CONNECTION is not defined');
		}
	});
};

export default initApp;
