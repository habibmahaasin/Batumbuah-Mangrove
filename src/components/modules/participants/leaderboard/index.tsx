'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LeaderboardPodium } from './top3';
import TreeCounterIcon from '@/assets/treeCounterIcon';

export default function LeaderboardTab({ isPortal }: { isPortal: boolean }) {
  const supabase = createClient();
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [totalApproved, setTotalApproved] = useState<any>(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .eq('status', 1)
        .order('total_approved', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: true })
        .limit(10);
      setData(data || []);
      setError(error);

      const { data: allData, error: allError } = await supabase
        .from('participants')
        .select('total_approved')
        .eq('status', 1);

      const totalCounter =
        allData?.reduce((acc, curr) => acc + (curr.total_approved || 0), 0) ||
        0;
      setTotalApproved(totalCounter);
    };
    fetchData();
  }, [supabase]);

  if (error) {
    return <div className='text-red-500'>Error loading leaderboard</div>;
  }

  const top3 = data.slice(0, 3);
  const rest = data.slice(3);
  return (
    <div
      className={`space-y-6 w-full pb-4 ${
        isPortal && 'md:flex md:flex-row md:gap-12'
      }`}
    >
      {/* Podium Section */}
      {isPortal ? (
        <div className='flex flex-col-reverse lg:flex-col gap-6 lg:w-4/12'>
          {top3.length > 0 && <LeaderboardPodium top3={top3} />}
          <div className='w-full flex justify-center '>
            <div className='lg:w-6/12 relative'>
              <TreeCounterIcon className='w-full' />
              <p className='absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-xl font-bold text-white'>
                {totalApproved} Pohon
              </p>
            </div>
          </div>
          <p className='font-bold text-center'>
            Perkiraan Emisi Karbon: {totalApproved * 0.35} tCO2e
          </p>
        </div>
      ) : (
        <>{top3.length > 0 && <LeaderboardPodium top3={top3} />}</>
      )}

      {/* Rest of participants */}
      <div className={`space-y-3 ${isPortal && 'lg:w-8/12'}`}>
        {rest.map((participant, index) => (
          <Card
            key={participant.id}
            className='rounded-2xl shadow-none !py-3 border-2'
          >
            <CardContent className='flex items-center justify-between !px-3'>
              <div className='flex items-center gap-3'>
                <span className='text-lg font-bold w-6 text-center'>
                  {index + 4}
                </span>
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
