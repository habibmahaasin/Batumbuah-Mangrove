import { useEffect, useState } from 'react';
import { InfoRowProps, Participant } from './type';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { IMAGE_URL } from '@/utils/helpers';

function InfoRow({ label, value, isLink, href }: InfoRowProps) {
  return (
    <div className='break-all text-sm flex items-center gap-1'>
      <strong>{label}:</strong>
      {value ? (
        isLink && href ? (
          <Link
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 underline truncate inline-block max-w-xs align-middle'
          >
            {value}
          </Link>
        ) : (
          <span>{value}</span>
        )
      ) : (
        <span className='text-gray-500'>No {label.toLowerCase()}</span>
      )}
    </div>
  );
}

export default function DetailParticipant({
  open,
  selected,
  fetchData,
  setOpen,
}: {
  open: boolean;
  selected: Participant | null;
  fetchData: () => void;
  setOpen: (open: boolean) => void;
}) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [totalApproved, setTotalApproved] = useState(0);

  const handleApprove = async (status: Number) => {
    if (!selected) return;
    setLoading(true);

    const { error } = await supabase
      .from('participants')
      .update({
        total_approved: totalApproved,
        status: status,
      })
      .eq('id', String(selected.id));

    if (error) {
      toast.error('Gagal approve');
    } else {
      toast.success('Status berhasil diperbaharui');
      fetchData();
      setOpen(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selected?.total_approved !== undefined) {
      setTotalApproved(selected.total_approved);
    }
  }, [selected]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Participant</DialogTitle>
        </DialogHeader>
        {selected && (
          <div className='space-y-3 text-sm'>
            <div className='space-y-2'>
              <InfoRow
                label='Images'
                value={selected?.images ? `/${selected.images}` : null}
                isLink
                href={
                  selected?.images ? IMAGE_URL + selected.images : undefined
                }
              />
              <InfoRow label='Nama' value={selected?.name} />
              <InfoRow label='Total Trees' value={selected?.total_trees} />
            </div>
            <div className='p-4 flex flex-col gap-4 w-full bg-gray-100 rounded-lg'>
              <div className='grid gap-3'>
                <Label htmlFor='total_approved'>Total Approved</Label>
                <Input
                  id='total_approved'
                  name='total_approved'
                  type='number'
                  min={0}
                  max={selected?.total_trees}
                  placeholder='ex: 1'
                  required
                  onChange={(e) => {
                    setTotalApproved(Number(e.target.value));
                  }}
                  value={totalApproved}
                />
              </div>
              <div className='flex w-full items-center gap-4'>
                <Button
                  onClick={() => {
                    handleApprove(3);
                  }}
                  disabled={loading}
                  variant={'destructive'}
                  className='flex-1'
                >
                  Reject
                </Button>
                <Button
                  onClick={() => {
                    handleApprove(1);
                  }}
                  disabled={loading}
                  className='flex-1'
                >
                  Approve
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
