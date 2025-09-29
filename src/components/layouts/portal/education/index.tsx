'use client';

import { useState } from 'react';
import ReactPlayer from 'react-player';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { EDUCATION_VIDEOS } from '@/utils/constant';

// Example video data (with YouTube IDs)
const videos = EDUCATION_VIDEOS;

export default function EducationSection() {
  const [selectedVideo, setSelectedVideo] = useState<(typeof videos)[0] | null>(
    null
  );

  return (
    <div className='relative container mx-auto py-4 h-full w-[90%] py-28 flex flex-col gap-4'>
      <h6 className='font-bold text-[46px] text-[#006E33]'>Edukasi</h6>
      <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8'>
        {videos.map((video) => {
          const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
          return (
            <Card
              key={video.id}
              className='cursor-pointer hover:shadow-lg transition !py-0'
              onClick={() => setSelectedVideo(video)}
            >
              <CardContent className='p-0'>
                <Image
                  src={thumbnailUrl}
                  alt={video.title}
                  width={500}
                  height={300}
                  className='w-full h-48 object-cover rounded-t-lg'
                />
                <div className='p-4'>
                  <h3 className='font-semibold'>{video.title}</h3>
                  <p className='text-sm text-muted-foreground line-clamp-2'>
                    {video.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
        <Dialog
          open={!!selectedVideo}
          onOpenChange={() => setSelectedVideo(null)}
        >
          <DialogContent className='sm:max-w-2xl max-h-[90vh] flex flex-col'>
            {selectedVideo && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedVideo.title}</DialogTitle>
                </DialogHeader>

                <div className='aspect-video w-full rounded-lg overflow-hidden h-[320px] mb-4'>
                  <ReactPlayer
                    src={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                    width='100%'
                    height='100%'
                    controls
                  />
                </div>

                <div className='flex-1 overflow-y-auto pr-2'>
                  <label className='font-bold text-gray-1 text-xs'>
                    Deskripsi :
                  </label>
                  <p className='text-sm leading-relaxed whitespace-pre-line'>
                    {selectedVideo.description}
                  </p>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
