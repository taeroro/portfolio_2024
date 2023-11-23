import Navigation from "@/app/components/navigation/navigation"
import WorkDetailLayout from "./workDetailLayout"
import Footer from "@/app/components/footer/footer"

export default function WorkDetailPage({ params }: { params: { slug: string } }) {

  return (
    <main className="min-h-screen m-0 fullpage overflow-y-auto overflow-x-hidden">
      <Navigation />

      <div className="z-10 relative bg-white">
        <WorkDetailLayout slug={params.slug[0]} />
      </div>

      <div id='footerArea' className='w-full h-screen min-h-[600px] bg-transparent invisible relative' />
      <Footer />

    </main>
  )
}