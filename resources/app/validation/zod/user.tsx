import { z } from 'zod';

const containsNumberOrSymbol = (value: any) => {
  return !/[0-9!@#$%^&*()_+|~=`{}\[\]:";'<>?,./\\]/.test(value);
};
const isVietnamesePhoneNumber = (value: string): boolean => {
  const vietnamesePhoneNumberRegex = /^(0|\+84)\d{9,10}$/;
  return vietnamesePhoneNumberRegex.test(value);
};

export const ValidateUserUpdateSchema = z.object({
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
  major_id: z.string().min(1, 'Chuyên ngành không được để trống'),
});
export const ValidatePhoneSchema = z.object({
  phone: z
    .string()
    .min(1, 'Số điện thoại không được để trống')
    .refine(value => isVietnamesePhoneNumber(value), {
      message: 'Số điện thoại không hợp lệ',
    }),
});

export type TUserUpdateSchema = {
  username: string;
  first_name: string;
  last_name: string;
  birthday: Date;
  avatar: string;
  phone: string;
  address: string;
  biography: string;
  gender: string;
  major_id: number;
};
