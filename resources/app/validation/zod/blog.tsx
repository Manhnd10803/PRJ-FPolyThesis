import { z } from 'zod';

export const blogCreateSchema = z.object({
  majors_id: z.string().refine(value => {
    return typeof value === 'string' && value !== '0';
  }, 'Vui lòng chọn một chuyên ngành'),
  title: z.string().min(1, 'Title is required'),
  hashtag: z
    .string()
    .min(1, 'Hashtag is required')
    .refine(value => {
      if (typeof value === 'string') {
        return value.startsWith('#');
      }
      return false;
    }, 'Hashtag must start with "#"'),
  // content: z.string().min(1, 'Content is required'),
});

export type TBlogCreateSchema = z.infer<typeof blogCreateSchema>;
