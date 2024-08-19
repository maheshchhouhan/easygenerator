import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email address').min(1, { message: 'Email is required' });

export const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
  .regex(/\d/, { message: 'Password must contain at least one number' })
  .regex(/[@$!%*?&_]/, { message: 'Password must contain at least one special character' });

export const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
