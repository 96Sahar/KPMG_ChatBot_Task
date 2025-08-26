import { z } from 'zod';

export const registerSchema = z
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

export type RegisterFormFields = z.infer<typeof registerSchema>;
