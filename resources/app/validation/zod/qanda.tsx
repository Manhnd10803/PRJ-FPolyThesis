import { z } from 'zod';

const HashtagsStringSchema = z.string().refine(
  value => {
    const hashtags = value.split(/[,\s]+/).map(tag => tag.trim());
    return hashtags.every(tag => tag.startsWith('#'));
  },
  {
    message: 'Mỗi hashtag phải bắt đầu bằng "#" và được phân tách bằng dấu phẩy hoặc khoảng trắng',
  },
);

export const QandACreateSchema = z.object({
  title: z.string().min(1, { message: 'Tiêu đề phải bắt buộc nhập' }),
  majors_id: z.string().refine(value => {
    return typeof value === 'string' && value !== '0';
  }, 'Vui lòng chọn một chuyên ngành'),
  content: z.string().optional(),
  hashtag: HashtagsStringSchema,
});

export type TQandACreateSchema = z.infer<typeof QandACreateSchema>;
