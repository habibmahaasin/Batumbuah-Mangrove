'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function LeaderboardTab() {
  const supabase = createClient();
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .order('total_approved', { ascending: false, nullsFirst: false }) // highest first
        .order('created_at', { ascending: true }); // tie-breaker
      setData(data || []);
      setError(error);
    };
    fetchData();
  }, [supabase]);

  if (error) {
    return <div className='text-red-500'>Error loading leaderboard</div>;
  }

  return (
    <div className='space-y-3 pb-4'>
      {data.map((participant, index) => (
        <Card key={participant.id} className='rounded-2xl shadow-sm'>
          <CardContent className='flex items-center justify-between'>
            {/* Left: Rank + Avatar + Name */}
            <div className='flex items-center gap-3'>
              <span className='text-lg font-bold w-6 text-center'>
                {index + 1}
              </span>
              <Avatar>
                {participant.images ? (
                  <AvatarImage
                    src={`https://lgdimdqopholrfpibips.supabase.co/storage/v1/object/public/${participant.images}`}
                    alt={participant.name || 'User'}
                  />
                ) : (
                  <AvatarFallback>
                    {participant.name
                      ? participant.name.charAt(0).toUpperCase()
                      : '?'}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className='font-medium'>{participant.name || 'Anonymous'}</p>
              </div>
            </div>

            {/* Right: Score */}
            <Badge variant='secondary' className='text-sm px-3 py-1'>
              🌱 Approved: {participant.total_approved ?? 0}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
