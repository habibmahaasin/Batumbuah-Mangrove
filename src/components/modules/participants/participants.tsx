'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { parseError } from '@/utils/helpers';
import { participantsFormSchema } from './utils';
import { z } from 'zod';

export default function ParticipantsTab() {
  const supabase = createClient();
  const form = useForm<z.infer<typeof participantsFormSchema>>({
    resolver: zodResolver(participantsFormSchema),
    defaultValues: {
      name: '',
      images: undefined,
      note: '',
      total_trees: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof participantsFormSchema>) => {
    let imageUrl: string | null = null;
    if (values.images) {
      const { data: fileData, error: fileError } = await supabase.storage
        .from('batumbuah_mangrove')
        .upload(
          `participants/${Date.now()}_${values.images.name}`,
          values.images,
          {
            cacheControl: '3600',
            upsert: false,
          }
        );

      if (fileError) {
        console.error('File upload error:', fileError);
        return;
      }
      imageUrl = fileData?.path ? fileData.path : null;
    }

    const { data, error } = await supabase
      .from('participants')
      .insert([
        {
          name: values.name,
          images: imageUrl,
          note: values.note,
          total_trees: values.total_trees,
        },
      ])
      .select();

    if (error) {
      toast(parseError(error));
    } else {
      form.reset();
      toast('Data Successfully Added');
    }
  };

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
      <div className='w-full h-fullrounded-lg mb-4 -translate-y-32 p-2'>
        <div className='w-full h-full bg-white -mb-32 rounded-xl shadow-xl p-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              {/* Name */}
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='John Doe' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Images */}
              <FormField
                control={form.control}
                name='images'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Image</FormLabel>
                    <FormControl>
                      <Input
                        type='file'
                        accept='image/*'
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // save the file name (or convert to base64 / upload directly)
                            field.onChange(file);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Note */}
              <FormField
                control={form.control}
                name='note'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Input placeholder='Add a note...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Total Trees */}
              <FormField
                control={form.control}
                name='total_trees'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Trees</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='e.g. 100' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button type='submit' className='w-full mt-4'>
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
