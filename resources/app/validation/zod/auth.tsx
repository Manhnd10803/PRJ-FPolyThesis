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
export const verifyRegisterSchema = z.object({
  verification_code: z.string().min(1, 'Code is required'),
  email: z.string().nullable(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: 'Bạn chưa nhập địa chỉ email' }).email({ message: 'Email bạn nhập không đúng' }),
});

export const resetPasswordSchema = z.object({
  verification_code: z
    .string()
    .min(1, { message: 'Mã xác nhận là bắt buộc' })
    .refine(value => /^\d{5}$/.test(value), {
      message: 'Mã xác nhận phải là 5 số !',
    }),
  password: z
    .string()
    .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
    .refine(value => /[A-Za-z]/.test(value) && /\d/.test(value), {
      message: 'Mật khẩu phải chứa ít nhất một chữ cái và một số',
    }),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type TSignInSchema = z.infer<typeof signInSchema>;
export type TforgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type TresetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type TSVerifyRegisterSchema = z.infer<typeof verifyRegisterSchema>;
