import { z } from 'zod';

export const blogCreateSchema = z.object({
  majors_id: z.string().refine(value => {
    return typeof value === 'string' && value !== '0';
  }, 'Vui lòng chọn một chuyên ngành'),
  title: z.string().min(1, 'Title is required'),
  thumbnail: z
    .custom<FileList>()
    .transform(file => file.length > 0 && file.item(0))
    .refine(
      file => {
        return !!file;
      },
      {
        message: 'Thumbnail is required.',
      },
    )
    .refine(file => !file || (!!file && file.size <= 2 * 1024 * 1024), {
      message: 'The profile picture must be a maximum of 2MB.',
    })
    .refine(file => !file || (!!file && file.type?.startsWith('image')), {
      message: 'Only images are allowed to be sent.',
    }),
  hashtag: z
    .string()
    .min(1, 'Hashtag is required')
    .refine(value => {
      if (typeof value === 'string') {
        return value.startsWith('#');
      }
      return false;
    }, 'Hashtag must start with "#"'),
  content: z.string().min(1, 'Content is required'),
});

export type TBlogCreateSchema = z.infer<typeof blogCreateSchema>;
