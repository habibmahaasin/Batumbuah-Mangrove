'use client';
import { Button } from '@/components/ui/button';

export default function DonationSection() {
  return (
    <div className='relative container mx-auto p-4 h-full w-[90%] pt-8 gap-8 flex flex-col gap-4 items-center'>
      <div className='w-fit mt-4'>
        <Button
          className='bg-[#EB6E6E] hover:bg-[#e65e5e] cursor-pointer !py-4 !px-8 !h-12'
          onClick={() => {
            window.open('https://saweria.co/batumbuah', '_blank');
          }}
        >
          DONASI SEKARANG
        </Button>
      </div>
    </div>
  );
}
