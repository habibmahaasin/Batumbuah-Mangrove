import { z } from 'zod';

export const participantsFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  images: z.instanceof(File, { message: 'Please upload an image file.' }),
  note: z.string().min(2, { message: 'Note must be at least 2 characters.' }),
  total_trees: z
    .string()
    .min(1, { message: 'Please enter total trees planted.' }),
});
