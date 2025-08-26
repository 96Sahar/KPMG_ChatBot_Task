import mongoose from 'mongoose';

export interface iUser {
	email: string;
	password: string;
}
const userSchema = new mongoose.Schema<iUser>({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

const Users = mongoose.model<iUser>('User', userSchema);
export default Users;
