import { z } from 'zod';

export const signInSchema = z.object({
  username: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
});

export const signUpSchema = z
  .object({
    username: z.string().min(1, 'Username is required'),
    email: z.string().min(1, 'Email is required').email(),
    password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const verifyRegisterSchema = z.object({
  verification_code: z.string().min(1, 'Code is required'),
  email: z.string().nullable(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: 'Bạn chưa nhập địa chỉ email' }).email({ message: 'Email bạn nhập không đúng' }),
});

export const confirmPasswordSchema = z
  .object({
    email: z.string().min(1, 'Bạn chưa nhập địa chỉ email').email(),
    password: z.string().min(1, 'Bạn chưa nhập mật khẩu').min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    confirmPassword: z.string().min(1, 'Bạn chưa xác nhận mật khẩu'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Mật khẩu không trùng khớp',
    path: ['confirmPassword'],
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

export const resetNewPasswordSchema = z
  .object({
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
    confirmPassword: z.string().min(1, 'Bạn chưa xác nhận mật khẩu'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Mật khẩu không trùng khớp',
    path: ['confirmPassword'],
  });

export const CommentTextSchema = z.string().min(1);

export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type TSignInSchema = z.infer<typeof signInSchema>;
export type TforgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type TresetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type TresetNewPasswordSchema = z.infer<typeof resetNewPasswordSchema>;
export type TconfirmPasswordSchema = z.infer<typeof confirmPasswordSchema>;
export type TSVerifyRegisterSchema = z.infer<typeof verifyRegisterSchema>;
