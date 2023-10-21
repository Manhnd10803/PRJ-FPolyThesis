import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
});

export const signUpSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
});

export type TSignInSchema = z.infer<typeof signInSchema>;
export type TSignUpSchema = z.infer<typeof signUpSchema>;
