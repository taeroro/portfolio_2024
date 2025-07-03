import type { Metadata, ResolvingMetadata } from 'next'
import WorkDetailLayout from "./workDetailLayout"
import Footer from "@/app/components/footer/footer"
import NavigationLayout from "@/app/components/navigation/navigationLayout"

type Props = {
  params: { slug: string }
}

// TODO When adding new project please update here
const pageTitles = {
  expedia: "Expedia",
  jpmorganchase: "JPMorgan Chase",
  microsoft: "Microsoft",
  marriott: "Marriott",
  tiktok: "Tiktok",
  michaelkors: "Michael Kors",
  riley: "Riley",
}

export default function WorkDetailPage({ params }: Props) {

  return (
    <main className="min-h-screen m-0 fullpage overflow-y-auto overflow-x-hidden">
      <NavigationLayout />

      <div className="z-10 relative bg-white overflow-hidden" id='page-content'>
        <WorkDetailLayout slug={params.slug[0]} />
      </div>

      <div id='footerArea' 
        className='w-full h-[80svh] min-h-[600px] bg-transparent invisible relative max-sm:h-[35svh] max-sm:min-h-[320px]'
      />
      <Footer />

    </main>
  )
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const slug = params.slug.toString()
  const current = pageTitles[slug as keyof typeof pageTitles] + ' – ' || ''
  const base = (await parent).title?.absolute!  

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  // TODO: fetch page specific image
  
  return {
    title: current.concat(base),
    openGraph: {
      images: [...previousImages],
    },
  }
}