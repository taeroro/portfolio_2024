import Hero from '@/app/components/hero/hero'
import Navigation from '@/app/components/navigation/navigation'
import Archive from './components/archive/archive'

export default function Home() {
  return (
    <main className="min-h-screen m-0 fullpage">
      <Navigation />

      <Hero />
      <Archive />
      <div className='w-full h-screen' />
    </main>
  )
}