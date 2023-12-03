import WorkDetailLayout from "./workDetailLayout"
import Footer from "@/app/components/footer/footer"
import NavigationLayout from "@/app/components/navigation/navigationLayout"

export default function WorkDetailPage({ params }: { params: { slug: string } }) {

  return (
    <main className="min-h-screen m-0 fullpage overflow-y-auto overflow-x-hidden">
      <NavigationLayout />

      <div className="z-10 relative bg-white overflow-y-hidden">
        <WorkDetailLayout slug={params.slug[0]} />
      </div>

      <div id='footerArea' className='w-full h-screen min-h-[600px] bg-transparent invisible relative' />
      <Footer />

    </main>
  )
}