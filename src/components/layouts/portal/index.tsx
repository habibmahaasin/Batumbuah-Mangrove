'use client';
import BatumbuahIcon from '@/assets/batumbuahIcon';
import { Navigation } from './navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import LeaderboardTab from '@/components/modules/participants/leaderboard';
import { useRouter } from 'next/navigation';

export default function PortalLayout() {
  const router = useRouter();
  const images = [
    '/mangrove-img.png',
    '/mangrove-img.png',
    '/mangrove-img.png',
    '/mangrove-img.png',
  ];

  return (
    <div className='overflow-x-hidden'>
      <Navigation />

      <div className="relative w-screen h-screen bg-[url('/bg-banner.png')] bg-cover bg-center bg-no-repeat">
        <div className='absolute inset-0 bg-black/40'></div>
        <div className='relative container mx-auto px-4 flex justify-start items-center h-full w-[90%] pt-8'>
          <div className='w-full flex flex-col gap-2'>
            <BatumbuahIcon className='w-64 md:w-96' />

            <div className='h-full w-full flex flex-col gap-24'>
              <h4 className='text-white md:text-xl'>
                Melalui program ini, kita telah menanam [X pohon mangrove] yang
                <br />
                setara dengan menyerap [Y kilogram karbon] dari atmosfer.
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

      <div className='w-screen h-[82px] bg-[#EB6E6E] flex items-center justify-center'></div>
      <div className='relative container mx-auto p-4 md:grid md:grid-cols-2 h-full w-[90%] py-24 gap-8'>
        <Image
          priority
          src='/mangrove-img.png'
          alt='Mangrove'
          width={1000}
          height={1000}
          className='rounded-lg w-full h-auto'
        />

        <div className='flex items-center flex-col gap-4 items-start'>
          <h6 className='font-bold text-[46px] text-[#006E33]'>
            Lorem ipsum dolor
          </h6>
          <p className='text-[#006E33] text-justify'>
            sit amet, consectetur adipiscing elit. Phasellus ut libero sed nulla
            elementum finibus. Morbi id turpis massa. Ut ex metus, vehicula vel
            elit vel, malesuada elementum nisl. Nulla maximus ipsum eu mi
            sagittis vehicula. Cras molestie mattis ipsum, non viverra orci
            pretium at. Aliquam tristique ante ligula, ut fringilla enim rhoncus
            at. In quis urna et ligula vehicula feugiat. Donec placerat, leo sed
            elementum rutrum, arcu metus maximus tellus, a hendrerit mauris
            justo eget metus. Nullam sed nunc sit amet lorem hendrerit feugiat.
            Quisque ac dignissim nisi. Nullam et eros id lacus vulputate ornare
            vitae a leo. Morbi accumsan lacus at nunc viverra, id congue augue
            tempus. In quis urna et ligula vehicula feugiat. Donec placerat, leo
            sed elementum rutrum, arcu metus maximus tellus, a hendrerit mauris
            justo eget metus. Nullam sed nunc sit amet lorem hendrerit feugiat.
            Quisque ac dignissim nisi. Nullam et eros id lacus vulputate ornare
            vitae a leo. Morbi accumsan lacus at nunc viverra, id congue augue
            tempus.
          </p>
        </div>
      </div>
      <div className='relative container mx-auto p-4 h-full w-[90%] pt-8 gap-8 flex flex-col gap-4'>
        <h6 className='font-bold text-[46px] text-[#006E33]'>Galeri</h6>
        <Carousel>
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index} className='basis-1/3'>
                <Image
                  priority
                  src={src}
                  alt={`Mangrove ${index + 1}`}
                  width={1000}
                  height={1000}
                  className='rounded-lg w-full h-auto'
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className='relative container mx-auto p-4 h-full w-[90%] pt-8 gap-8 flex flex-col gap-4 items-center'>
        <h6 className='font-bold text-[46px] text-[#006E33]'>Leaderboard</h6>
        <LeaderboardTab />
      </div>
      <div className='relative container mx-auto p-4 h-full w-[90%] pt-8 gap-8 flex flex-col gap-4 items-center'>
        <div className='w-fit mt-4'>
          <Button className='bg-[#EB6E6E] hover:bg-[#e65e5e] cursor-pointer !py-4 !px-8 !h-12'>
            DONASI SEKARANG
          </Button>
        </div>
      </div>
    </div>
  );
}
