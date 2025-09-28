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
import DetailParticipant from './detail';
import { Participant } from './type';
import { Badge } from '@/components/ui/badge';

export default function ParticipantsTable() {
  const supabase = createClient();
  const [data, setData] = useState<Participant[]>([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [total, setTotal] = useState(0);

  const [selected, setSelected] = useState<Participant | null>(null);
  const [open, setOpen] = useState(false);

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
        total_trees,
        total_approved,
        created_at,
        images,
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

  useEffect(() => {
    fetchData();
  }, [page, perPage]);

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className='space-y-4'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Total Trees</TableHead>
            <TableHead>Total Approved</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Dibuat</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.total_trees}</TableCell>{' '}
              <TableCell>{p.total_approved ?? '-'}</TableCell>
              <TableCell>
                {p.status?.name ? (
                  <Badge
                    className={
                      p.status.name === 'approved'
                        ? 'bg-green-500 hover:bg-green-600'
                        : p.status.name === 'pending'
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                        : p.status.name === 'rejected'
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-gray-500 hover:bg-gray-600'
                    }
                  >
                    {p.status.name}
                  </Badge>
                ) : (
                  '-'
                )}
              </TableCell>
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

      <DetailParticipant
        open={open}
        selected={selected}
        fetchData={fetchData}
        setOpen={setOpen}
      />
    </div>
  );
}
