import { z } from 'zod';

const userSchema = z
	.object({
		userName: z
			.string()
			.min(3, 'Username must be at least 3 characters long'),
		email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
			message: 'Invalid email address',
		}),
		password: z
			.string()
			.regex(
				/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
				'Password must be at least 8 characters long and contain at least one letter and one number'
			),
		confirmPassword: z
			.string()
			.regex(
				/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
				'Passwords must match'
			),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords must match',
		path: ['confirmPassword'],
	});
const Register = () => {
	return (
		<div>
			<input />
		</div>
	);
};

export default Register;
