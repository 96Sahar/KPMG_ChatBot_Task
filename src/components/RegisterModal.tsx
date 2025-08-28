import React from 'react';
import Modal from './Modal';
import ModalHeader from './ModalHeader';
import RegisterForm from './RegisterForm';
import { type RegisterFormFields } from '../utils/authSchema';
import { register } from '../services/userServices';
import { toast } from 'sonner';

interface RegisterModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
	const handleSubmit = async (data: RegisterFormFields) => {
		const response = await register({
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
		});
		toast.success('Registration succeed!');
		console.log('Registration successful: ', response);
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalHeader
				title="Create Account"
				onClose={onClose}
				subtitle="Please fill in your details to register"
			/>
			<RegisterForm onSubmit={handleSubmit} onClose={onClose} />
		</Modal>
	);
};

export default RegisterModal;
