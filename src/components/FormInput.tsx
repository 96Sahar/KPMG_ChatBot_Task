import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
	placeholder: string;
	type?: 'text' | 'password' | 'email';
	error?: string;
	register: UseFormRegisterReturn;
}

const FormInput: React.FC<FormInputProps> = ({
	placeholder,
	type = 'text',
	error,
	register,
}) => {
	return (
		<div>
			<input
				{...register}
				type={type}
				placeholder={placeholder}
				className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
			/>
			{error && (
				<span className="mt-1 text-sm text-red-500 block">{error}</span>
			)}
		</div>
	);
};

export default FormInput;
