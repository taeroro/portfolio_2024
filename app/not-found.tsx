import Navigation from "@/app/components/navigation/navigation"
import Footer from "@/app/components/footer/footer"
import Image from "next/image"

export default function NotFoundPage() {

	const styles = {
    heroContainer: [
      'w-full h-svh-screen min-h-[600px] overflow-y-hidden',
      'flex flex-col justify-end gap-16',
    ].join(' '),
		descriptionContainer: [
      'w-full px-8',
      'grid grid-cols-12 gap-8',
      'max-sm:px-2 max-sm:gap-4',
    ].join(' '),
    description: [
      'col-span-6',
      'font-bold title-text whitespace-pre-line',
      'max-sm:col-span-7',
    ].join(' '),
		h1Wrapper: [
			'w-full pr-14',
			'flex flex-row justify-evenly'
		].join(' '),
		imgWrapper: [
			'w-full',
			'flex flex-row justify-center',
      'relative overflow-hidden',
		].join(' '),
		img: [
			'object-contain',
			'-rotate-12'
		].join(' '),
    h1: [
      'font-display font-bold display-not-found',
      'select-none pointer-events-none',
    ].join(' '),
	}
	const notFoundIcon: string = '/248.png'
	const notFoundMessage: string = '/404'
	const description: string = 'Uh oh! This page could not be found. \n\n Try something else.'

	return (
		<main className="min-h-screen m-0 fullpage overflow-y-auto overflow-x-hidden">
			<Navigation />
	
			<div className="z-10 relative bg-white">
				<div className={styles.heroContainer}>
					<div className={styles.descriptionContainer}>
						<span className={styles.description}>
							{description}
						</span>
					</div>

					<div className={styles.h1Wrapper}>
						<div className={styles.imgWrapper}>
							<Image
								className={styles.img}
								src={notFoundIcon}
								width={2000}
								height={2000}
								alt={"Not found image."}
							/>
						</div>

						<h1 className={styles.h1}>
							{notFoundMessage}
						</h1>
					</div>
				</div>
			</div>
	
			<div id='footerArea' className='w-full h-screen min-h-[600px] bg-transparent invisible relative' />
			<Footer />
	
		</main>
	)
}



