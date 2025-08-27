import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from './UI/Button';
import FormFields from './FormField';
import { registerSchema, type RegisterFormFields } from '../utils/authSchema';

interface RegisterFormProps {
	onSubmit: (data: RegisterFormFields) => Promise<void>;
	onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, onClose }) => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormFields>({ resolver: zodResolver(registerSchema) });

	const handleFormSubmit: SubmitHandler<RegisterFormFields> = async (
		data
	) => {
		try {
			await onSubmit(data);
			onClose();
		} catch (error) {
			console.log(error);
			setError('root', {
				message:
					error instanceof Error
						? error.message
						: 'Registration failed. Please try again.',
			});
		}
	};

	return (
		<div className="p-8 pt-0">
			<form
				className="space-y-6"
				onSubmit={handleSubmit(handleFormSubmit)}
			>
				<FormFields register={register} errors={errors} />

				<Button
					disabled={isSubmitting}
					type="submit"
					buttonStyle="main"
					className="w-full"
				>
					{isSubmitting ? 'Submitting...' : 'Create Account'}
				</Button>

				{errors.root && (
					<div className="text-center">
						<span className="text-sm text-red-500">
							{errors.root.message}
						</span>
					</div>
				)}
			</form>
		</div>
	);
};

export default RegisterForm;
