import { Request, Response } from 'express';
import { Model } from 'mongoose';

class BaseController<T> {
	model: Model<T>;

	constructor(model: Model<T>) {
		this.model = model;
	}
	getAll = async (req: Request, res: Response) => {
		try {
			const filter = req.query as Partial<T>;
			console.log(filter);

			const data = await this.model.find(filter || {});
			return res.send(data);
		} catch (err) {
			console.log(err);
			return res.status(400).send(err);
		}
	};

	getItemById = async (req: Request, res: Response) => {
		const id = req.params.id;
		if (!id) return res.status(400).send('Id is required');
		if (id) {
			const data = await this.model.findById(id);
			return data
				? res.status(200).send(data)
				: res.status(404).send('Item not found');
		}
	};

	createItem = async (req: Request, res: Response) => {
		try {
			const data = await this.model.create(req.body);
			return res.status(201).send(data);
		} catch (err) {
			res.status(400).send(err);
		}
	};

	deleteItem = async (req: Request, res: Response) => {
		const id = req.params.id;
		if (!id) return res.status(400).send('ID is required');
		try {
			const deletedItem = await this.model.findByIdAndDelete(id);
			if (!deletedItem) return res.status(404).send('Item not found');

			return res.status(200).send('Item deleted successfully');
		} catch (err) {
			return res.status(400).send(err);
		}
	};
}

const createController = <T>(model: Model<T>) => {
	return new BaseController(model);
};
export default createController;
