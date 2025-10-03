'use client';
import BatumbuahIcon from '@/assets/batumbuahIcon';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function HomeBanner() {
  const router = useRouter();
  return (
    <div className="relative w-screen h-screen bg-[url('/bg-banner.png')] bg-cover bg-center bg-no-repeat">
      <div className='absolute inset-0 bg-black/40'></div>
      <div className='relative container mx-auto px-4 flex justify-start items-center h-full w-[90%] pt-8'>
        <div className='w-full flex flex-col gap-2'>
          <BatumbuahIcon className='w-64 md:w-96' />

          <div className='h-full w-full flex flex-col gap-24'>
            <h4 className='text-white md:text-xl'>
              Melalui program ini, kita telah menanam 17.000 pohon mangrove yang
              <br />
              setara dengan menyerap 5.950 tCO2e dari atmosfer.
            </h4>
            <h4 className='text-white md:text-xl'>
              Kami sudah memulai langkah kecil untuk bumi. <br /> Sekarang
              giliran kamu. Ayo tunjukkan pohon mangrovemu, <br /> setiap
              pohonmu akan menambah dampak besar!
            </h4>
          </div>

          <div className='w-fit mt-4'>
            <Button
              className='bg-[#00A44C] hover:bg-[#00823c] cursor-pointer !py-4 !px-8 !h-12'
              onClick={() => router.push('/participants')}
            >
              Upload Mangrovemu Sekarang!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
