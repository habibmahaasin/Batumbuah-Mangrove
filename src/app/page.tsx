import PortalLayout from '@/components/layouts/portal';
import HomeBanner from '@/components/layouts/portal/home/banner';
import DonationSection from '@/components/layouts/portal/home/donation';
import HomeGallery from '@/components/layouts/portal/home/gallery';
import IntroHome from '@/components/layouts/portal/home/intro';
import LeaderboardTab from '@/components/modules/participants/leaderboard';

export default function Home() {
  return (
    <PortalLayout>
      <>
        <HomeBanner />
        <div className='w-screen h-[82px] bg-[#EB6E6E] flex items-center justify-center'></div>
        <IntroHome />
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
