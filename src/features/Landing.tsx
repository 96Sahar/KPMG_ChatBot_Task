import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/UI/Button';
import RegisterModal from '../components/RegisterModal';
import { useForm } from 'react-hook-form';
// import { type LoginFormFields, loginSchema } from '../utils/authSchema';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { login } from '../services/userServices';
// import { toast } from 'sonner';

export const Landing = () => {
	// const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		// setError,
		formState: { errors, isSubmitting },
	} = useForm({});

	// const onSubmit = async (data:) => {
	// 	try {
	// 		const response = await login({
	// 			email: data.email,
	// 			password: data.password,
	// 		});
	// 		toast.success('Login successful!', { duration: 2500 });
	// 		navigate('./ChatBot');
	// 		console.log('Login successful: ', response);
	// 	} catch (err) {
	// 		toast.error('Something went wrong');
	// 		console.log('server error: ' + err);
	// 		setError('root', {
	// 			type: 'server',
	// 			message:
	// 				err instanceof Error
	// 					? err.message
	// 					: 'Login failed. Please try again.',
	// 		});
	// 	}
	// };
	const onSubmit = async () => {
		try {
			const response = await fetch(
				'https://chat-bot-app-gtaqazfch2bcgwbw.israelcentral-01.azurewebsites.net/api/testMongoDB?code=1npcHPyWaUk37FnYKVQbY0pogbGS0tN5npjy91BlYeyuAzFuaOW9gA=='
			);
			const result = await response.json();
			console.log('Database test result: ', result);
		} catch (error) {
			console.log('Database test failed: ', error);
		}
	};

	const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

	const openRegisterModal = () => setIsRegisterModalOpen(true);
	const closeRegisterModal = () => setIsRegisterModalOpen(false);

	return (
		<div className="flex justify-center items-center min-h-screen">
			<motion.div
				className="max-w-5xl bg-white rounded-2xl px-20 py-16 text-center space-y-12 shadow-layered-card"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, ease: 'easeOut' }}
			>
				<div className="text-2xl font-semibold leading-tight whitespace-pre-line text-dark-blue">
					Welcome to the KPMG AI Chatbot!
				</div>
				<div className="flex flex-col items-center space-y-6">
					<form
						className="flex flex-col items-center space-y-4 w-full max-w-md"
						onSubmit={handleSubmit(onSubmit)}
					>
						<input
							{...register('email')}
							type="text"
							placeholder="Email"
							className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
						{errors.email && (
							<span className="text-red-500">
								{/* {errors.email.message} */}
							</span>
						)}
						<input
							{...register('password')}
							type="password"
							placeholder="Password"
							className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
						{errors.password && (
							<span className="text-red-500">
								{/* {errors.password.message} */}
							</span>
						)}

						<div className="flex space-x-4 pt-2">
							<Button
								disabled={isSubmitting}
								buttonStyle="main"
								type="submit"
							>
								{isSubmitting ? 'Submitting' : 'Submit'}
							</Button>
						</div>
						{errors.root && (
							<span className="text-red-500">
								{errors.root.message}
							</span>
						)}
					</form>
					<div>
						Don't have an account?{' '}
						<button
							className="text-blue hover:cursor-pointer"
							onClick={openRegisterModal}
						>
							sign up!
						</button>
					</div>
				</div>
			</motion.div>

			<RegisterModal
				isOpen={isRegisterModalOpen}
				onClose={closeRegisterModal}
			/>
		</div>
	);
};

export default Landing;
