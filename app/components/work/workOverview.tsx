'use client';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

/************** Temp - TO BE DELETED ***************/
interface workData {
  slug: string,
  title: string,
  highlightDescription: string,
  thumbnailURL: string,
}
/************** Temp - TO BE DELETED ***************/


/****************************************************/
/*                                                  */
/* WorkOverview Component                           */
/*                                                  */
/****************************************************/

export default function WorkOverview() {

  /************** Defining variables ***************/
  const title: string = "/work"
  const workList: workData[] = [
    {
      slug: 'microsoft',
      title: '/microsoft',
      highlightDescription: 'Microsoft Surface and Windows global site redesign.',
      thumbnailURL: '',
    },
    {
      slug: 'marriott',
      title: '/marriott',
      highlightDescription: 'Lorem ispum dolor adist.',
      thumbnailURL: '',
    },
    {
      slug: 'tiktok',
      title: '/tiktok',
      highlightDescription: 'Prototype that moves.',
      thumbnailURL: '',
    },
    {
      slug: 'michaelkors',
      title: '/michaelkors',
      highlightDescription: 'Debuted the first digital fashion show with Michael Kors.',
      thumbnailURL: '',
    },
    {
      slug: 'riley',
      title: '/riley',
      highlightDescription: 'Where home meets life.',
      thumbnailURL: '',
    },
  ]
  
  const workOverviewContainerRef = useRef(null)
  const h1DisplayRef = useRef(null)

    /************** Style classNames ***************/
    const styles = {
      workOverviewContainer: [
        'w-full min-h-screen',
        'flex flex-col',
      ].join(' '),
      sectionTitleContainer: [
        'w-full h-svh-screen',
        'flex flex-col justify-end',
      ].join(' '),
      h1: [
        'font-display font-bold display-work',
        'select-none pointer-events-none',
      ].join(' '),
      contentContainer: [
        'w-full px-8 mt-16',
        'grid grid-cols-2 gap-x-8 gap-y-16',
        'max-lg:grid-cols-1 max-sm:px-2 max-sm:mt-8',
      ].join(' '),
    }

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: workOverviewContainerRef.current,
        start: "top",
        end: "+=100%",
        scrub: 0.3,
      }
    })

    tl
      .to(h1DisplayRef.current, { x: 32, fontSize: '3.5rem' })
      
  }, [])

  return (
    <div className={styles.workOverviewContainer} ref={workOverviewContainerRef}>
      <div className={styles.sectionTitleContainer}>
        <h1 className={styles.h1} ref={h1DisplayRef}>
          {title}
        </h1>
      </div>

      <div className={styles.contentContainer}>
        {
          workList.map((e, i) => <SingleWork workData={e} key={i} />)
        }
      </div>
    </div>  
  )
}




/****************************************************/
/*                                                  */
/* SingleWork Component                             */
/*                                                  */
/****************************************************/

function SingleWork(props: {workData: workData}) {

  /************** Style classNames ***************/
  const styles = {
    singleWorkContainer: [
      'flex flex-col gap-4',
      'hover:text-highlight transition duration-300',
    ].join(' '),
    titleWrapper: [
      'w-full',
      'font-display font-bold h1-display',
    ].join(' '),
    description: [
      'w-full',
      'font-medium body-text',
    ].join(' '),
    imgWrapper: [
      'w-full aspect-[5/3]',
      'bg-gray-300',
    ].join(' '),
    img: [
      'w-full h-full object-cover',
    ].join(' '),
  }

  return (
    <Link className={styles.singleWorkContainer} href={"/work/" + props.workData.slug}>
      <div className={styles.titleWrapper}>
        <h2>
          { props.workData.title.concat(' →') }
        </h2>
      </div>

      <span className={styles.description}>
        { props.workData.highlightDescription }
      </span>

      <div className={styles.imgWrapper}>
        <Image 
          className={styles.img}
          src={props.workData.thumbnailURL}
          alt={"Project thumbnail."}
        />
      </div>
    </Link>
  )
}