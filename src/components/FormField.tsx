import React from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import FormInput from './FormInput';
import type { RegisterFormFields } from '../utils/authSchema';

interface FormFieldsProps {
	register: UseFormRegister<RegisterFormFields>;
	errors: FieldErrors<RegisterFormFields>;
}

const FormFields: React.FC<FormFieldsProps> = ({ register, errors }) => {
	return (
		<>
			<FormInput
				placeholder="Email"
				type="email"
				error={errors.email?.message}
				register={register('email')}
			/>

			<FormInput
				placeholder="Password"
				type="password"
				error={errors.password?.message}
				register={register('password')}
			/>

			<FormInput
				placeholder="Confirm Password"
				type="password"
				error={errors.confirmPassword?.message}
				register={register('confirmPassword')}
			/>
		</>
	);
};

export default FormFields;
