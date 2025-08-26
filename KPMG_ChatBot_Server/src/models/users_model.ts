import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	previousChats: { type: Array, default: [] },
});

const Users = mongoose.model('User', userSchema);
export default Users;
