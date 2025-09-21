import MobileLayout from '@/components/layouts/mobile';
import ParticipantsModules from '@/components/modules/participants';

export default function Instruments() {
  return (
    <MobileLayout>
      <div className='w-full h-full p-2'>
        <ParticipantsModules />
      </div>
    </MobileLayout>
  );
}
