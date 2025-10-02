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
        <h6 className='font-bold text-[46px] text-[#006E33]'>BATUMBUAH</h6>
        <p className='text-[#006E33] text-justify'>
          Program BATUMBUAH 2025 hadir untuk mengatasi abrasi pesisir Sumatera
          Barat sekaligus mendukung target GoZero Telkom dan program dana hijau
          nasional. Melalui kolaborasi multi-stakeholder, digitalisasi, dan
          gamifikasi, program ini menargetkan survival rate mangrove hingga 90%,
          meningkatkan penghasilan masyarakat sebesar Rp800.000–1.000.000 per
          keluarga, serta menyerap sekitar 1.845 kg CO₂ per tahun. Dengan
          keterlibatan karyawan, masyarakat, pemerintah, dan pelaku usaha lokal,
          BATUMBUAH 2025 berkomitmen menciptakan ekosistem pesisir yang lestari,
          ekonomi yang berdaya, dan memberikan kontribusi nyata bagi masa depan
          hijau Indonesia.
        </p>
      </div>
    </div>
  );
}
