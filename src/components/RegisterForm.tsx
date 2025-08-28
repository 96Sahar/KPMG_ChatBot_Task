import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from './UI/Button';
import { registerSchema, type RegisterFormFields } from '../utils/authSchema';
import FormInput from './FormInput';

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
				message: 'Registration failed. Please try again.',
			});
		}
	};
	return (
		<div className="p-8 pt-0">
			<form
				className="space-y-6"
				onSubmit={handleSubmit(handleFormSubmit)}
			>
				<div className="flex space-x-4">
					<div className="flex-1">
						<FormInput
							placeholder="First Name"
							type="text"
							register={register('firstName')}
							error={errors.firstName?.message}
						/>
					</div>
					<div className="flex-1">
						<FormInput
							placeholder="Last Name"
							type="text"
							register={register('lastName')}
							error={errors.lastName?.message}
						/>
					</div>
				</div>
				<FormInput
					placeholder="Email"
					type="email"
					register={register('email')}
					error={errors.email?.message}
				/>
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
