import { Request, Response } from 'express';
import chatModel from '../models/chat_model';

const getChatById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const chat = await chatModel.findOne({ id });
		if (!chat) {
			res.status(404).send('Chat not found');
			return;
		}
		res.status(200).send(chat);
	} catch (err) {
		res.status(400).send(err);
	}
};

const createChat = async (req: Request, res: Response) => {
	try {
		const { id, messages = [] }: { id: string; messages?: string[] } =
			req.body;
		if (!id) {
			res.status(400).send('Chat ID is required');
			return;
		}

		const newChat = new chatModel({
			id,
			messages,
		});
		await newChat.save();

		res.status(201).send(newChat);
	} catch (err) {
		res.status(400).send(err);
	}
};

const addMessage = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { message }: { message: string } = req.body;
		if (!message) {
			res.status(400).send('Message is required');
			return;
		}
		const chat = await chatModel.findOneAndUpdate(
			{ id },
			{ $push: { messages: message } }
		);
		if (!chat) {
			res.status(404).send('Chat was not found');
			return;
		}
		res.status(200).send(chat);
	} catch (err) {
		res.status(400).send(err);
	}
};

export { getChatById, createChat, addMessage };
