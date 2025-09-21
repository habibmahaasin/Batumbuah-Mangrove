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

const formSchema = z.object({
  email: z.string().email('Enter a valid email'),
});

export default function ApprovalsTab() {
  const supabase = createClient();

  const [participant, setParticipant] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await supabase
      .from('participants')
      .select(
        `
          id,
          name,
          email,
          total_trees,
          updated_at,
          status (
            id,
            name
          )
        `
      )
      .eq('email', values.email)
      .single();

    if (error) {
      setParticipant({ error: error.message });
    } else {
      setParticipant(data);
    }
    setOpen(true); // open modal
  }

  return (
    <div className='max-w-md mx-auto p-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Enter email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            Check Status
          </Button>
        </form>
      </Form>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Participant Result</DialogTitle>
            <DialogDescription>
              {participant?.error
                ? 'An error occurred while fetching participant.'
                : 'Here are the details of the participant:'}
            </DialogDescription>
          </DialogHeader>

          {/* Structured content goes outside of DialogDescription */}
          {participant?.error ? (
            <p className='text-red-500 mt-2'>{participant.error}</p>
          ) : participant ? (
            <div className='space-y-2 mt-2'>
              <p>
                <strong>Name:</strong> {participant.name}
              </p>
              <p>
                <strong>Email:</strong> {participant.email}
              </p>
              <p>
                <strong>Total Trees:</strong> {participant.total_trees}
              </p>
              <p>
                <strong>Status:</strong> {participant.status?.name || '-'}
              </p>
            </div>
          ) : (
            <p className='mt-2'>No data yet.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
