import { z } from 'zod';

const containsNumberOrSymbol = (value: any) => {
  // Kiểm tra xem chuỗi có chứa ký tự hoặc số không
  return !/[0-9!@#$%^&*()_+|~=`{}\[\]:";'<>?,./\\]/.test(value);
};

export const userUpdateSchema = z.object({
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
