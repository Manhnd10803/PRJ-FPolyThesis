import { z } from 'zod';

// Tạo một custom Zod schema cho chuỗi chứa nhiều hashtag, phân tách bằng dấu phẩy hoặc khoảng trắng
const HashtagsStringSchema = z.string().refine(
  value => {
    const hashtags = value.split(/[,\s]+/).map(tag => tag.trim());
    return hashtags.every(tag => tag.startsWith('#'));
  },
  {
    message: 'Mỗi hashtag phải bắt đầu bằng "#" và được phân tách bằng dấu phẩy hoặc khoảng trắng',
  },
);

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

  hashtag: HashtagsStringSchema,
  // content: z.string().min(1, 'Content is required'),
});

export type TBlogCreateSchema = z.infer<typeof blogCreateSchema>;
