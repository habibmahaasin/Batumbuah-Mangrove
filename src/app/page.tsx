import PortalLayout from '@/components/layouts/portal';
import HomeBanner from '@/components/layouts/portal/home/banner';
import DonationSection from '@/components/layouts/portal/home/donation';
import HomeGallery from '@/components/layouts/portal/home/gallery';
import IntroHome from '@/components/layouts/portal/home/intro';
import LeaderboardTab from '@/components/modules/participants/leaderboard';

export default function Home() {
  const content = [
    {
      images: '/mangrove-img.png',
      title: 'BATUMBUAH',
      content: `Program BATUMBUAH 2025 hadir untuk mengatasi abrasi pesisir Sumatera
          Barat sekaligus mendukung target GoZero Telkom dan program dana hijau
          nasional. Melalui kolaborasi multi-stakeholder, digitalisasi, dan
          gamifikasi, program ini menargetkan survival rate mangrove hingga 90%,
          meningkatkan penghasilan masyarakat sebesar Rp800.000–1.000.000 per
          keluarga, serta menyerap sekitar 1.845 kg CO₂ per tahun. Dengan
          keterlibatan karyawan, masyarakat, pemerintah, dan pelaku usaha lokal,
          BATUMBUAH 2025 berkomitmen menciptakan ekosistem pesisir yang lestari,
          ekonomi yang berdaya, dan memberikan kontribusi nyata bagi masa depan
          hijau Indonesia.`,
    },
    {
      images: '/pokdarwis.jpg',
      title: 'POKDARWIS',
      content: `Di Desa Wisata Amping Parak, Kecamatan Sutera, tumbuh sebuah komunitas peduli lingkungan bernama Pokdarwis (Kelompok Sadar Wisata) yang menjadi ujung tombak pelestarian alam sekaligus pengembangan wisata berkelanjutan. Warga desa percaya bahwa wisata dan lingkungan bisa berjalan beriringan, sehingga Pokdarwis tidak hanya menjaga ekosistem pesisir, tetapi juga menjadi mitra penting dalam berbagai kegiatan konservasi. Bersama PT Telkom Indonesia, komunitas ini berkolaborasi dalam program CSR dengan menanam 17.000 mangrove di Desa Amping Parak. Kehadiran Pokdarwis membuat desa ini semakin dikenal, bukan hanya karena keindahan pesisirnya, tetapi juga karena semangat gotong royong masyarakat dalam menjadikan mangrove sebagai identitas, benteng alami, sekaligus pusat edukasi lingkungan yang berdaya guna bagi generasi mendatang.`,
    },
  ];
  return (
    <PortalLayout>
      <>
        <HomeBanner />
        <div className='w-screen h-[82px] bg-[#EB6E6E] flex items-center justify-center'></div>
        {content?.map((item, idx) => (
          <IntroHome
            key={idx}
            index={idx + 1}
            title={item.title}
            content={item.content}
            images={item.images}
          />
        ))}
        <HomeGallery />
        <div className='relative container mx-auto p-4 h-full w-[90%] pt-8 gap-8 flex flex-col gap-4 items-center'>
          <h6 className='font-bold text-[46px] text-[#006E33]'>Leaderboard</h6>
          <LeaderboardTab isPortal={true} />
        </div>
        <DonationSection />
      </>
    </PortalLayout>
  );
}
