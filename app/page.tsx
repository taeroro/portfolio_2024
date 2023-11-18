import Hero from '@/app/components/hero/hero'
import Navigation from '@/app/components/navigation/navigation'
import Archive from './components/archive/archive'
import WorkOverview from './components/work/workOverview'
import Who from './components/who/who'
import Footer from './components/footer/footer'

export default function Home() {
  return (
    <main className="min-h-screen m-0 fullpage overflow-auto">
      <Navigation />

      <div className="z-10 relative bg-white">
        <Hero />
        <WorkOverview />
        <Archive />
        <Who />
      </div>

      <div className='w-full h-screen min-h-[600px] bg-transparent invisible relative' />

      <Footer />
    </main>
  )
}