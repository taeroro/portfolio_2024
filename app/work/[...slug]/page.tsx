import WorkDetailLayout from "./workDetailLayout"
import Footer from "@/app/components/footer/footer"
import NavigationLayout from "@/app/components/navigation/navigationLayout"

export default function WorkDetailPage({ params }: { params: { slug: string } }) {

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