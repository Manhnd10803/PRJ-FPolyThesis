import { z } from 'zod';

export const createNewPostSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  feeling: z.string().optional(),
  image: z.array(z.string()).optional(),
  status: z.number().optional(),
});

export type TCreateNewPostSchema = z.infer<typeof createNewPostSchema>;
