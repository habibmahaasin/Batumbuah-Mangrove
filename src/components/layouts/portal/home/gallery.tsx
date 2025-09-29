import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function HomeGallery() {
  const images = [
    '/mangrove-img.png',
    '/mangrove-img.png',
    '/mangrove-img.png',
    '/mangrove-img.png',
  ];
  return (
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
  );
}
