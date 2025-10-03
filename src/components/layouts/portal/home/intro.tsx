import Image from 'next/image';

export default function IntroHome({
  title,
  content,
  images,
  index,
}: {
  title: string;
  content: string;
  images: string;
  index: number;
}) {
  return (
    <div
      className={`relative container mx-auto p-4 ${
        index % 2 ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex flex-col md:flex h-full w-[90%] py-12 gap-8`}
    >
      <Image
        priority
        src={images}
        alt='Mangrove'
        width={1000}
        height={1000}
        className='rounded-lg w-full h-auto'
      />

      <div className='flex items-center flex-col gap-4 items-start'>
        <h6 className='font-bold text-[46px] text-[#006E33]'>{title}</h6>
        <p className='text-[#006E33] text-justify'>{content}</p>
      </div>
    </div>
  );
}
