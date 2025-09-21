import React from 'react';

export default function MobileLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div className='w-screen h-[100dvh] flex items-center justify-center bg-gray-100 overflow-x-hidden overflow-y-hidden'>
      <div className='w-full max-w-md bg-black h-[100dvh] bg-white'>
        {children}
      </div>
    </div>
  );
}
