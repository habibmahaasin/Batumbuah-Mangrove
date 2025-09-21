import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ParticipantsTab from './participants';
import ApprovalsTab from './approvals';

export default function ParticipantsModules() {
  return (
    <Tabs
      defaultValue='participants'
      className='w-full h-[100dvh] flex flex-col'
    >
      <TabsList className='w-full shrink-0'>
        <TabsTrigger className='cursor-pointer' value='participants'>
          Participants
        </TabsTrigger>
        <TabsTrigger className='cursor-pointer' value='approvals'>
          Approval
        </TabsTrigger>
        <TabsTrigger className='cursor-pointer' value='leaderboard'>
          Leaderboard
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
      </TabsContent>
    </Tabs>
  );
}
