import { z } from 'zod';

export const registerSchema = z.object({
	email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
		message: 'Invalid email address',
	}),
	firstName: z.string().min(2, 'First name is required'),
	lastName: z.string().min(2, 'Last name is required'),

	// password: z
	// 	.string()
	// 	.regex(
	// 		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
	// 		{
	// 			message:
	// 				'Password must be at least 8 characters long and contain at least one letter, one number, and one special character',
	// 		}
	// 	),
	// confirmPassword: z.string(),
});
// .superRefine(({ confirmPassword, password }, ctx) => {
// 	if (confirmPassword !== password) {
// 		ctx.addIssue({
// 			code: 'custom',
// 			message: 'Passwords do not match',
// 			path: ['confirmPassword'],
// 		});
// 	}
// });

// export const loginSchema = registerSchema.omit({ confirmPassword: true });

export type RegisterFormFields = z.infer<typeof registerSchema>;
// export type LoginFormFields = z.infer<typeof loginSchema>;
