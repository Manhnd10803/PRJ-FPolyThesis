import { z } from 'zod';

export const blogCreateSchema = z.object({
  majors_id: z.string().refine(value => {
    return typeof value === 'string' && value !== '0';
  }, 'Vui lòng chọn một chuyên ngành'),
  title: z.string().min(1, 'Tiêu đề không đuợc để trống'),
  // thumbnail: z
  //   .custom<FileList>(value => !!value)
  //   .transform(file => (file && file.length > 0 ? file.item(0) : null))
  //   .refine(file => !!file, {
  //     message: 'Thumbnail không được để trống',
  //   })
  //   .refine(file => !file || (!!file && file.size <= 2 * 1024 * 1024), {
  //     message: 'File phải nhỏ hơn 2MB.',
  //   })
  //   .refine(file => !file || (!!file && file.type?.startsWith('image')), {
  //     message: 'Phải là ảnh',
  //   }),

  hashtag: z
    .string()
    .min(1, 'Hashtag không được để trống')
    .refine(value => {
      if (typeof value === 'string') {
        return value.startsWith('#');
      }
      return false;
    }, 'Hashtag phải bắt đầu bằng "#"'),
  // content: z.string().min(1, 'Content is required'),
});

export type TBlogCreateSchema = z.infer<typeof blogCreateSchema>;
