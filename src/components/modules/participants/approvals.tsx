'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { getStatusValue, getStatusVariant } from '@/utils/helpers';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Nama harus memiliki minimal 2 karakter.' }),
});

export default function ApprovalsTab() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [participant, setParticipant] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('participants')
        .select(
          `
          id,
          name,
          total_trees,
          total_approved,
          updated_at,
          status 
        `
        )
        .eq('name', values.name)
        .single();

      if (error) {
        setParticipant({ error: error.message });
      } else {
        setParticipant(data);
      }

      setOpen(true); // buka modal
    } finally {
      setLoading(false); // selesai loading
    }
  }

  return (
    <>
      <Image
        priority
        src='/mangrove.png'
        alt='Mangrove'
        width={1000}
        height={300}
        className='rounded-lg'
      />
      <div className='w-full h-fit rounded-lg mb-4 -translate-y-20 p-2'>
        <div className='w-full h-full bg-white -mb-32 rounded-xl shadow-xl p-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder='Masukkan nama' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full' isLoading={loading}>
                Mulai Pengecekan
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-xs w-full'>
          <DialogHeader>
            <DialogTitle>Hasil Pengecekan</DialogTitle>
            <DialogDescription>
              {participant?.error
                ? 'Terjadi kesalah saat melakukan pengecekan'
                : 'Berikut detail proses submission anda'}
            </DialogDescription>
          </DialogHeader>

          {/* Structured content goes outside of DialogDescription */}
          {participant?.error ? (
            <p className='text-red-500 mt-2'>
              {'Terjadi Kesalahan!, Data Tidak Ditemukan'}
            </p>
          ) : participant ? (
            <div className='mt-2 divide-y divide-gray-200 rounded-md border px-4 text-sm'>
              <div className='flex justify-between py-2'>
                <span className='font-medium'>Nama</span>
                <span className='truncate max-w-[200px] line-clamp-1'>
                  {participant.name}
                </span>
              </div>
              <div className='flex justify-between py-2'>
                <span className='font-medium'>Total Diajukan</span>
                <span className='truncate max-w-[200px] line-clamp-1'>
                  {participant.total_trees} Pohon
                </span>
              </div>
              <div className='flex justify-between py-2'>
                <span className='font-medium'>Status</span>
                <Badge variant={getStatusVariant(participant.status)}>
                  {getStatusValue(participant.status || '-')}
                </Badge>
              </div>
              {participant?.status === 1 && (
                <div className='flex justify-between py-2'>
                  <span className='font-medium'>Total Dikonfirmasi</span>
                  <span className='truncate max-w-[200px] line-clamp-1'>
                    {participant.total_approved} Pohon
                  </span>
                </div>
              )}
            </div>
          ) : (
            <p className='mt-2'>No data yet.</p>
          )}
          <p className='italic text-xs w-full text-end'>
            Diperbaharui: {participant?.updated_at || '-'}
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
