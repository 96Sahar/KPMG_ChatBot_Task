import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from './UI/Button';

interface RegisterModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const registerSchema = z
	.object({
		email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
			message: 'Invalid email address',
		}),
		password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
			message:
				'Password must be at least 8 characters long and contain at least one letter and one number',
		}),
		confirmPassword: z.string(),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords do not match',
				path: ['confirmPassword'],
			});
		}
	});

type FormFields = z.infer<typeof registerSchema>;

const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({ resolver: zodResolver(registerSchema) });

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
			console.log(data);
			onClose();
		} catch (error) {
			console.log(error);
			setError('root', {
				message: 'Registration failed. Please try again.',
			});
		}
	};

	if (!isOpen) return null;

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4"
			onClick={handleBackdropClick}
		>
			<div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
				<div className="p-8">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-3xl font-bold text-gray-900">
							Create Account
						</h2>
						<button
							onClick={onClose}
							className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
							aria-label="Close modal"
						>
							×
						</button>
					</div>

					<p className="text-sm text-gray-600 mb-8">
						Please fill in your details to register
					</p>

					<form
						className="space-y-6"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div>
							<input
								{...register('email')}
								type="text"
								placeholder="Email"
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
							{errors.email && (
								<span className="mt-1 text-sm text-red-500 block">
									{errors.email.message}
								</span>
							)}
						</div>

						<div>
							<input
								{...register('password')}
								type="password"
								placeholder="Password"
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
							{errors.password && (
								<span className="mt-1 text-sm text-red-500 block">
									{errors.password.message}
								</span>
							)}
						</div>

						<div>
							<input
								{...register('confirmPassword')}
								type="password"
								placeholder="Confirm Password"
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
							{errors.confirmPassword && (
								<span className="mt-1 text-sm text-red-500 block">
									{errors.confirmPassword.message}
								</span>
							)}
						</div>

						<div>
							<Button
								disabled={isSubmitting}
								type="submit"
								buttonStyle="main"
								className="w-full"
							>
								{isSubmitting
									? 'Submitting...'
									: 'Create Account'}
							</Button>
						</div>

						{errors.root && (
							<div className="text-center">
								<span className="text-sm text-red-500">
									{errors.root.message}
								</span>
							</div>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

export default RegisterModal;
