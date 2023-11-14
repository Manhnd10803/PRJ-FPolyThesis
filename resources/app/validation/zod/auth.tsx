import { z } from 'zod';

const containsNumberOrSymbol = (value: any) => {
  // Kiểm tra xem chuỗi có chứa ký tự hoặc số không
  return !/[0-9!@#$%^&*()_+|~=`{}\[\]:";'<>?,./\\]/.test(value);
};
export const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
});

export const signUpSchema = z
  .object({
    first_name: z
      .string()
      .min(1, 'Tên không được để trống')
      .refine(value => containsNumberOrSymbol(value), {
        message: 'Tên không được chứa ký tự hoặc số',
      }),
    last_name: z
      .string()
      .min(1, 'Họ không được để trống')
      .refine(value => containsNumberOrSymbol(value), {
        message: 'Họ không được chứa ký tự hoặc số',
      }),
    email: z.string().min(1, 'Bạn chưa nhập địa chỉ email').email('Bạn chưa nhập đúng email'),
    major_id: z.string().min(1, 'Chuyên ngành không được để trống'),
    password: z.string().min(1, 'Không được để trống').min(8, 'Mật khẩu đủ 8 kí tự'),
    confirmPassword: z.string().min(1, 'Không được để trống'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Không khớp mật khẩu',
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
