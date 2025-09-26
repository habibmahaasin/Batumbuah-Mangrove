'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

type Participant = {
  id: number;
  name: string;
  email: string;
  total_trees: number;
  created_at: string;
  status: {
    id: number;
    name: string;
  } | null;
};

export default function ParticipantsTable() {
  const supabase = createClient();
  const [data, setData] = useState<Participant[]>([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [total, setTotal] = useState(0);

  const [selected, setSelected] = useState<Participant | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { count } = await supabase
        .from('participants')
        .select('*', { count: 'exact', head: true });

      setTotal(count || 0);

      const from = (page - 1) * perPage;
      const to = from + perPage - 1;

      const { data } = await supabase
        .from('participants')
        .select(
          `
          id,
          name,
          email,
          total_trees,
          created_at,
          status (
            id,
            name
          )
        `
        )
        .range(from, to);

      setData(
        (data || []).map((item: any) => ({
          ...item,
          status: Array.isArray(item.status)
            ? item.status[0] || null
            : item.status || null,
        }))
      );
    };

    fetchData();
  }, [page, perPage, supabase]);

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className='space-y-4'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Total Trees</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Dibuat</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.email}</TableCell>
              <TableCell>{p.total_trees}</TableCell>
              <TableCell>{p.status?.name ?? '-'}</TableCell>
              <TableCell>
                {new Date(p.created_at).toLocaleDateString('id-ID')}
              </TableCell>
              <TableCell>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => {
                    setSelected(p);
                    setOpen(true);
                  }}
                >
                  Detail
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className='w-full flex justify-end'>
        <div className='w-fit flex gap-4 items-center justify-between'>
          <Button
            variant='outline'
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button
            variant='outline'
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modal Detail */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Participant</DialogTitle>
            <DialogDescription>Informasi lengkap participant</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className='space-y-2 text-sm'>
              <p>
                <strong>Nama:</strong> {selected.name}
              </p>
              <p>
                <strong>Email:</strong> {selected.email}
              </p>
              <p>
                <strong>Total Trees:</strong> {selected.total_trees}
              </p>
              <p>
                <strong>Status:</strong> {selected.status?.name ?? '-'}
              </p>
              <p>
                <strong>Dibuat:</strong>{' '}
                {new Date(selected.created_at).toLocaleString('id-ID')}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
