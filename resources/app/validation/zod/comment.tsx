import { z } from 'zod';

export const createCommentSchema = z.object({
  content: z.string().trim().min(1, 'Nội dung không được để trống'),
});

export type TCommentSchema = z.infer<typeof createCommentSchema>;
