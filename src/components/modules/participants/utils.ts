import { z } from 'zod';

export const participantsFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Nama harus memiliki minimal 2 karakter.' }),
  images: z.instanceof(File, { message: 'Silakan unggah file gambar.' }),
  note: z.string().optional(),
  total_trees: z
    .string()
    .min(1, { message: 'Silakan masukkan jumlah pohon yang ditanam.' }),
});
