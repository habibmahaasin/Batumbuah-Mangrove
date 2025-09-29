import Image from 'next/image';

export default function IntroHome() {
  return (
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
          elit vel, malesuada elementum nisl. Nulla maximus ipsum eu mi sagittis
          vehicula. Cras molestie mattis ipsum, non viverra orci pretium at.
          Aliquam tristique ante ligula, ut fringilla enim rhoncus at. In quis
          urna et ligula vehicula feugiat. Donec placerat, leo sed elementum
          rutrum, arcu metus maximus tellus, a hendrerit mauris justo eget
          metus. Nullam sed nunc sit amet lorem hendrerit feugiat. Quisque ac
          dignissim nisi. Nullam et eros id lacus vulputate ornare vitae a leo.
          Morbi accumsan lacus at nunc viverra, id congue augue tempus. In quis
          urna et ligula vehicula feugiat. Donec placerat, leo sed elementum
          rutrum, arcu metus maximus tellus, a hendrerit mauris justo eget
          metus. Nullam sed nunc sit amet lorem hendrerit feugiat. Quisque ac
          dignissim nisi. Nullam et eros id lacus vulputate ornare vitae a leo.
          Morbi accumsan lacus at nunc viverra, id congue augue tempus.
        </p>
      </div>
    </div>
  );
}
