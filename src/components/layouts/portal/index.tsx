import { ReactNode } from 'react';
import { Navigation } from './navigation';
import Image from 'next/image';
import Link from 'next/link';
import FooterComponent from './footer';

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className='overflow-x-hidden relative min-h-screen'>
      <Navigation />
      {children}
      <FooterComponent />
      <Link
        href='https://chat.openai.com/'
        target='_blank'
        rel='noopener noreferrer'
        className='fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white rounded-full shadow-lg px-3 py-2 hover:scale-105 transition-transform'
      >
        <Image
          priority
          src='/chatgpt.png'
          alt='ChatGPT'
          width={40}
          height={40}
          className='rounded-full'
        />
        <span className='font-medium text-gray-700 text-sm'>Tanya disini</span>
      </Link>
    </div>
  );
}
