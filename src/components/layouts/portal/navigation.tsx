'use client';
import { ChevronsDown, Menu } from 'lucide-react';
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useRouter } from 'next/navigation';

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '#',
    label: 'Edukasi',
  },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  return (
    <header className='md:container mx-auto fixed md:top-6 left-0 right-0 z-40 mx-auto md:w-[90%] shadow-inner border border-secondary md:rounded-2xl flex justify-between items-center p-4 bg-card bg-opacity-80 backdrop-blur-md'>
      <Link href='/' className='font-bold text-lg flex items-center'>
        <Image
          priority
          src='/telkom-indonesia.png'
          alt='Mangrove'
          width={80}
          height={80}
          className='rounded-lg'
        />
      </Link>
      {/* <!-- Mobile --> */}
      <div className='flex items-center lg:hidden'>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className='cursor-pointer lg:hidden'
            />
          </SheetTrigger>

          <SheetContent
            side='left'
            className='flex flex-col justify-between bg-card border-secondary'
          >
            <div>
              <SheetHeader className='mb-4 ml-4'>
                <SheetTitle className='flex items-center'>
                  <Link href='/' className='flex items-center'>
                    <Image
                      priority
                      src='/telkom-indonesia.png'
                      alt='Mangrove'
                      width={80}
                      height={80}
                      className='rounded-lg'
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className='flex flex-col gap-2'>
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant='ghost'
                    className='justify-start text-base'
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className='hidden lg:flex justify-end'>
        <NavigationMenuList>
          <NavigationMenuItem className='flex flex-row gap-4'>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link href={href} className='text-base px-2'>
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>{' '}
          <Button
            className='bg-[#00A44C] hover:bg-[#00823c] cursor-pointer rounded-lg ml-4'
            onClick={() => router.push('/participants')}
          >
            Ikut Berpartisipasi
          </Button>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
