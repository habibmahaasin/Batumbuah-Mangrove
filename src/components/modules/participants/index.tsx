import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ParticipantsTab from './participants';
import ApprovalsTab from './approvals';
import LeaderboardTab from './leaderboard';

export default function ParticipantsModules() {
  return (
    <Tabs
      defaultValue='participants'
      className='w-full h-[100dvh] flex flex-col'
    >
      <TabsList className='w-full shrink-0'>
        <TabsTrigger className='cursor-pointer' value='participants'>
          🌱 Partisipasi
        </TabsTrigger>
        <TabsTrigger className='cursor-pointer' value='approvals'>
          🔍 Pengecekan
        </TabsTrigger>
        <TabsTrigger className='cursor-pointer' value='leaderboard'>
          🏆 Peringkat
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value='participants'
        className='flex-1 overflow-y-auto scrollbar-hide'
      >
        <ParticipantsTab />
      </TabsContent>
      <TabsContent
        value='approvals'
        className='flex-1 overflow-y-auto scrollbar-hide'
      >
        <ApprovalsTab />
      </TabsContent>{' '}
      <TabsContent
        value='leaderboard'
        className='flex-1 overflow-y-auto scrollbar-hide'
      >
        <LeaderboardTab isPortal={false} />
      </TabsContent>
    </Tabs>
  );
}
