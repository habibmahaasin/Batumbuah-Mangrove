'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { LeaderboardPodium } from './top3';

export default function LeaderboardTab() {
  const supabase = createClient();
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .order('total_approved', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: true });
      setData(data || []);
      setError(error);
    };
    fetchData();
  }, [supabase]);

  if (error) {
    return <div className='text-red-500'>Error loading leaderboard</div>;
  }

  const top3 = data.slice(0, 3);
  const rest = data.slice(3);

  return (
    <div className='space-y-6 pb-4'>
      {/* Podium Section */}
      {top3.length > 0 && <LeaderboardPodium top3={top3} />}

      {/* Rest of participants */}
      <div className='space-y-3'>
        {rest.map((participant, index) => (
          <Card key={participant.id} className='rounded-2xl shadow-sm'>
            <CardContent className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <span className='text-lg font-bold w-6 text-center'>
                  {index + 4}
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
                <p className='font-medium'>{participant.name || 'Anonymous'}</p>
              </div>
              <Badge variant='secondary' className='text-sm px-3 py-1'>
                🌱 Approved: {participant.total_approved ?? 0}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
