import HeroLayout from './components/hero/heroLayout'
import ArchiveLayout from './components/archive/archiveLayout'
import WorkOverviewLayout from './components/work/workOverviewLayout'
import Who from './components/who/who'
import Footer from './components/footer/footer'
import NavigationLayout from './components/navigation/navigationLayout'

export default function HomePage() {
  return (
    <main className="min-h-screen m-0 fullpage overflow-y-auto overflow-x-hidden overscroll-contain">
      <NavigationLayout />

      <div className="z-10 relative bg-white">
        <HeroLayout />
        <WorkOverviewLayout />
        <ArchiveLayout />
        <Who />
      </div>

      <div id='footerArea' 
        className='w-full h-[80svh] min-h-[600px] bg-transparent invisible relative max-sm:h-[35svh] max-sm:min-h-[320px]'
      />
      <Footer />

    </main>
  )
}