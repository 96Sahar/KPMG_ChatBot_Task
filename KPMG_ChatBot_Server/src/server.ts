import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import auth_routes from './routes/auth_routes';
import bodyParser from 'body-parser';
import cors from 'cors';
dotenv.config();

const app = express();
const corsOptions = {
	origin: process.env.CLIENT_URL,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
};

const initApp = (): Promise<Express> => {
	return new Promise<Express>((resolve, reject) => {
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', () => console.log('Connected to Database'));

		if (process.env.DB_CONNECTION) {
			mongoose
				.connect(process.env.DB_CONNECTION)
				.then(() => {
					app.use(cors(corsOptions));
					app.use(bodyParser.json());
					app.use(bodyParser.urlencoded({ extended: true }));
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
