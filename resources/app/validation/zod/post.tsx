import { z } from 'zod';

export const createNewFeedSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  feeling: z.string().optional(),
  image: z.array(z.string()).optional(),
});

export type TCreateNewFeedSchema = z.infer<typeof createNewFeedSchema>;
