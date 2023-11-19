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
      thumbnailURL: 'https://images.ctfassets.net/i0awqvhf3ypo/6JtILa6rXRb61JKMBMNlD6/0fc04a34919b336b712142c70f0373bf/thumbnail.jpg',
    },
    {
      slug: 'marriott',
      title: '/marriott',
      highlightDescription: 'Lorem ispum dolor adist.',
      thumbnailURL: 'https://images.ctfassets.net/i0awqvhf3ypo/4GzuMdH5j6Wji2i5JkFV15/c9d69c4667c5c17fed397a6c10ed5f9f/00_HERO_WALK_0030.jpg',
    },
    {
      slug: 'tiktok',
      title: '/tiktok',
      highlightDescription: 'Prototype that moves.',
      thumbnailURL: 'https://images.ctfassets.net/i0awqvhf3ypo/2WyhcgV9NX8zKATEi8jL2W/e198a0e7599321e289ef9af5cf3ac467/tt4b-1.jpg',
    },
    {
      slug: 'michaelkors',
      title: '/michaelkors',
      highlightDescription: 'Debuted the first digital fashion show with Michael Kors.',
      thumbnailURL: 'https://images.ctfassets.net/i0awqvhf3ypo/1BEwJco8TVgqR4nSJ4vL5a/c682ad8ea6f58a8fc1ae24ba0ffd5ed1/-2021_Sep-Mockup.jpg',
    },
    {
      slug: 'riley',
      title: '/riley',
      highlightDescription: 'Where home meets life.',
      thumbnailURL: 'https://images.ctfassets.net/i0awqvhf3ypo/4GzuMdH5j6Wji2i5JkFV15/c9d69c4667c5c17fed397a6c10ed5f9f/00_HERO_WALK_0030.jpg',
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
        'max-lg:grid-cols-1 max-sm:px-2 max-sm:mt-8 max-sm:gap-x-4 max-sm:gap-y-8',
      ].join(' '),
    }

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: workOverviewContainerRef.current,
        start: "top",
        end: "+=100%",
        scrub: 0.3,
      }
    })

    mm.add({
      isMobile: "(max-width: 640px)",
      isDesktop: "(min-width: 641px)",
    }, (context)=> {
      let cdt = false;
      if(context.conditions) cdt = context.conditions.isMobile;

      tl
        .to(h1DisplayRef.current, { x: cdt ? 8 : 32, fontSize: cdt ? '2.25rem' : '3.5rem' })
    })
      
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
      'hover:text-highlight group',
      'max-sm:gap-2'
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
      'w-full aspect-[5/3] relative overflow-hidden',
      // 'bg-gray-300',
      'bg-highlight',
    ].join(' '),
    img: [
      'object-cover',
      'group-hover:mix-blend-screen group-hover:filter group-hover:grayscale group-hover:opacity-100',
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
          fill={true}
          alt={"Project thumbnail."}
        />
      </div>
    </Link>
  )
}