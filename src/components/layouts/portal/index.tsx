import { ReactNode } from 'react';
import { Navigation } from './navigation';

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className='overflow-x-hidden'>
      <Navigation />
      {children}
    </div>
  );
}
