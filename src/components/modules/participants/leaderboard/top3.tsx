'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

type Participant = {
  id: string;
  name: string | null;
  images?: string | null;
  total_approved?: number | null;
};

export function LeaderboardPodium({ top3 }: { top3: Participant[] }) {
  return (
    <div className='flex items-end justify-center gap-4'>
      {/* 2nd Place */}
      {top3[1] && (
        <PodiumCard
          participant={top3[1]}
          rank={2}
          height='h-32'
          className='bg-[#00A44C] text-white'
        />
      )}

      {/* 1st Place */}
      {top3[0] && (
        <PodiumCard
          participant={top3[0]}
          rank={1}
          height='h-40'
          className='bg-[#00C95A] text-white'
        />
      )}

      {/* 3rd Place */}
      {top3[2] && (
        <PodiumCard
          participant={top3[2]}
          rank={3}
          height='h-28'
          className='bg-[#007A38] text-white'
        />
      )}
    </div>
  );
}

function PodiumCard({
  participant,
  rank,
  height,
  className,
}: {
  participant: Participant;
  rank: number;
  height: string;
  className?: string;
}) {
  return (
    <div className='flex flex-col items-center'>
      <Avatar className='w-16 h-16 mb-2'>
        {participant.images ? (
          <AvatarImage
            src={`https://lgdimdqopholrfpibips.supabase.co/storage/v1/object/public/${participant.images}`}
            alt={participant.name || 'User'}
          />
        ) : (
          <AvatarFallback>
            {participant.name ? participant.name.charAt(0).toUpperCase() : '?'}
          </AvatarFallback>
        )}
      </Avatar>
      <div
        className={`w-20 ${height} ${className} flex items-center justify-center rounded-t-md flex-col gap-2`}
      >
        <span className='text-xl font-bold'>#{rank}</span>
        <Badge variant='outline' className='text-xs px-2 py-2 text-white'>
          🌱 {participant.total_approved ?? 0}
        </Badge>
      </div>
      <p className='mt-1 font-medium text-sm'>
        {participant.name || 'Anonymous'}
      </p>
    </div>
  );
}
