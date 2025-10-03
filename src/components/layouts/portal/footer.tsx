import { MapPin, Phone } from 'lucide-react';

export default function FooterComponent() {
  return (
    <div className='bg-[#106437] w-full mt-6'>
      <div className='relative container mx-auto p-4 flex flex-col gap-2 h-full w-[90%] gap-4'>
        <div className='flex items-center gap-4 text-white'>
          <MapPin className='min-w-5 min-h-5 w-5 h-5' />
          Desa Ampiang Parak Kecamatan Sutera Kabupaten Pesisir Selatan Provinsi
          Sumatera Barat.
        </div>
        <div className='flex items-center gap-4 text-white'>
          <Phone className='min-w-5 min-h-5 w-5 h-5' />
          +62 823-8745-4798
        </div>
      </div>
    </div>
  );
}
