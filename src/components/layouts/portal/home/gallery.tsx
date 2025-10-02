'use client';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { IMAGE_URL } from '@/utils/helpers';

export default function HomeGallery() {
  const supabase = createClient();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchImages() {
      const { data } = await supabase
        .from('participants')
        .select('images')
        .eq('status', 1)
        .order('total_approved', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: true });
      setData(data || []);
    }
    fetchImages();
  }, [supabase]);

  return (
    <div className='relative container mx-auto p-4 h-full w-[90%] pt-8 gap-8 flex flex-col gap-4'>
      <h6 className='font-bold text-[46px] text-[#006E33]'>Galeri</h6>
      <div className='w-full px-6'>
        <Carousel>
          <CarouselContent>
            {data.map((src, index) => (
              <CarouselItem
                key={index}
                className='basis-full sm:basis-1/2 md:basis-1/3'
              >
                <Image
                  priority
                  src={IMAGE_URL + src.images}
                  alt={`Mangrove ${index + 1}`}
                  width={500}
                  height={500}
                  className='rounded-lg w-full aspect-square object-cover'
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
