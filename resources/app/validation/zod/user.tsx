import { z } from 'zod';

const containsNumberOrSymbol = (value: any) => {
  return value === '' || !/[0-9!@#$%^&*()_+|~=`{}\[\]:";'<>?,./\\]/.test(value);
};
const isVietnamesePhoneNumber = (value: string): boolean => {
  const vietnamesePhoneNumberRegex = /^(0|\+84)\d{9,10}$/;
  return vietnamesePhoneNumberRegex.test(value);
};

const noSpaces = (value: any) => {
  return !/\s{2,}/.test(value); // Check if the string contains only non-whitespace characters
};
export const ValidateUserUpdateSchema = z.object({
  first_name: z
    .string()
    .min(1, 'Tên không được để trống')
    .max(20, { message: 'Tên không được quá 20 ký tự' }) // Add max validation
    .refine(value => containsNumberOrSymbol(value), {
      message: 'Không chứa ký tự hoặc số',
    })
    .refine(value => noSpaces(value), {
      message: 'Không được chứa khoảng trắng',
    }),
  last_name: z
    .string()
    .min(1, 'Họ không được để trống')
    .max(20, { message: 'Họ không được quá 20 ký tự' }) // Add max validation
    .refine(value => containsNumberOrSymbol(value), {
      message: 'Không chứa ký tự hoặc số',
    })
    .refine(value => noSpaces(value), {
      message: 'Không chứa khoảng trắng',
    }),
  major_id: z.string().min(1, 'Chuyên ngành không được để trống'),
  phone: z
    .string()
    .nullable()
    .refine(value => value === null || value === '' || isVietnamesePhoneNumber(value), {
      message: 'Số điện thoại không hợp lệ',
    }),
  birthday: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  address: z.string().max(500, { message: 'Địa chỉ không được quá 500 ký tự' }).nullable(),

  biography: z.string().max(500, { message: 'Tiểu sử không được quá 500 ký tự' }).nullable(),
});

export type TUserUpdateSchema = {
  username: string;
  first_name: string;
  last_name: string;
  birthday: string;
  avatar: string;
  phone: string;
  address: string;
  biography: string;
  gender: string;
  major_id: number;
};
