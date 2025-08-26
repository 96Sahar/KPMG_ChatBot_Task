import React from 'react';
import Modal from './Modal';
import ModalHeader from './ModalHeader';
import RegisterForm from './RegisterForm';
import { type RegisterFormFields } from '../utils/authSchema';

interface RegisterModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
	const handleSubmit = async (data: RegisterFormFields): Promise<void> => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		console.log(data);
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
