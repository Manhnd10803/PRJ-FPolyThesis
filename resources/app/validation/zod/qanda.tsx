import { z } from 'zod';

export const QandACreateSchema = z.object({
  title: z.string().min(1, { message: 'Tiêu đề phải bắt buộc nhập' }),
  majors_id: z.string().refine(value => {
    return typeof value === 'string' && value !== '0';
  }, 'Vui lòng chọn một chuyên ngành'),
  content: z.string().min(1, 'Nội dung là bắt buộc nhập'),
  hashtag: z
    .string()
    .min(1, 'Hashtag là bắt buộc')
    .refine(value => {
      if (typeof value === 'string') {
        return value.startsWith('#');
      }
      return false;
    }, 'Hashtag phải bắt đầu bằng "#"'),
});

export type TQandACreateSchema = z.infer<typeof QandACreateSchema>;
