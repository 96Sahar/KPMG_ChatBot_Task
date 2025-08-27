import mongoose from 'mongoose';

export interface iChat {
	id: string;
	messages: Array<string>;
}
const chatSchema = new mongoose.Schema<iChat>({
	id: { type: String, required: true, unique: true },
	messages: { type: [String], default: [] },
});

const chatModel = mongoose.model<iChat>('Chat', chatSchema);
export default chatModel;
