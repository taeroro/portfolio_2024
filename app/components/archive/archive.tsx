'use client';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

/************** Temp - TO BE DELETED ***************/
interface archiveData {
  client: string,
  project: string,
  category: string,
  isComingSoon: boolean,
}
/************** Temp - TO BE DELETED ***************/


/****************************************************/
/*                                                  */
/* Archive Component                                */
/*                                                  */
/****************************************************/

export default function Archive() {

  /************** Defining variables ***************/
  const title: string = "/archive"
  const archiveList: archiveData[] = [
    {
      client: 'JPMorgan Chase', 
      project: 'jpmorganchase.com', 
      category: 'Visual Direction Define, Product Design (Web), Design System, Prototype',
      isComingSoon: true,
    },
    {
      client: 'TIAA', 
      project: 'tiaa.org', 
      category: 'Visual Direction Define, Product Design (Web), Design System, Prototype',
      isComingSoon: true,
    },
    {
      client: 'NBC News', 
      project: 'Interactive Hitboard', 
      category: 'Visual Direction Define, Product Design (App)',
      isComingSoon: true,
    },
    {
      client: 'The Ritz-Carlton', 
      project: 'ritzcarlton.com', 
      category: 'Prototypes, Motion Design',
      isComingSoon: false,
    },
    {
      client: 'Citadel', 
      project: 'citadel.com', 
      category: 'Prototype, Motion Design',
      isComingSoon: false,
    },
    {
      client: 'Kaplan', 
      project: 'kaplan.com', 
      category: 'Visual Direction Define',
      isComingSoon: false,
    },
    {
      client: 'Benchling', 
      project: 'benchling.com', 
      category: 'Product Design (Web), Design System',
      isComingSoon: false,
    },
    {
      client: 'KPMG', 
      project: 'kpmg.com/us', 
      category: 'Visual Direction Define',
      isComingSoon: false,
    },
    {
      client: 'JLo Beauty', 
      project: 'jlobeauty.com', 
      category: 'Product Design (Web), Prototype, Motion Design',
      isComingSoon: false,
    },
    {
      client: 'Verlas', 
      project: 'verlas.com', 
      category: 'Product Design (Web), Social Campaign',
      isComingSoon: false,
    },
    {
      client: 'The Quintessential Centrist', 
      project: 'thequintessentialcentrist.com', 
      category: 'Product Design & Development (Web)',
      isComingSoon: false,
    },
  ];
  
  const archiveContainerRef = useRef(null)
  const h1DisplayRef = useRef(null)

  /************** Style classNames ***************/
  const styles = {
    archiveContainer: [
      'w-full min-h-screen',
      'flex flex-col',
    ].join(' '),
    sectionTitleContainer: [
      'w-full h-svh-screen',
      'flex flex-col justify-end',
    ].join(' '),
    h1: [
      'font-display font-bold display-archive',
      'select-none pointer-events-none',
    ].join(' '),
    contentContainer: [
      'w-full px-8 mt-16',
      'flex flex-col',
      'max-sm:px-2 max-sm:mt-8',
    ].join(' '),
  }

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: archiveContainerRef.current,
        start: "top",
        end: "+=100%",
        scrub: 0.3,
      }
    })

    tl
      .to(h1DisplayRef.current, { x: 32, fontSize: '3.5rem' })
      
  }, [])

  return (
    <div className={styles.archiveContainer} ref={archiveContainerRef}>
      <div className={styles.sectionTitleContainer}>
        <h1 className={styles.h1} ref={h1DisplayRef}>
          {title}
        </h1>
      </div>

      <div className={styles.contentContainer}>
        {
          archiveList.map((e, i) => <SingleArchive archiveData={e} key={i} />)
        }
      </div>
    </div>  
  )
}




/****************************************************/
/*                                                  */
/* SingleArchive Component                          */
/*                                                  */
/****************************************************/

function SingleArchive(props: {archiveData: archiveData}) {

    /************** Style classNames ***************/
    const styles = {
      singleArchiveContainer: [
        'w-full py-8',
        'flex flex-row',
        'grid grid-cols-12 gap-8',
        'border-b-4 border-primary',
      ].join(' '),
      clientWrapper: [
        'col-span-6',
        'flex flex-row ',
        'font-bold h2-text',
        'max-xl:col-span-12',
      ].join(' '),
      comingSoonTag: [
        'self-start px-3 py-1',
        'rounded-full border-2 border-highlight bg-white',
        'rotate-12 -translate-y-2',
        'font-medium leading-none text-highlight body-text whitespace-nowrap',
      ].join(' '),
      projectWrapper: [
        'self-end col-span-3',
        'font-bold title-text',
        'max-xl:col-span-12',
      ].join(' '),
      categoryWrapper: [
        'self-end col-span-3',
        'font-medium leading-6 body-text',
        'max-xl:col-span-12',
      ].join(' '),
    }

  return (
    <div className={styles.singleArchiveContainer}>
      <div className={styles.clientWrapper}>
        <h2>
          { props.archiveData.client }
        </h2>

        { props.archiveData.isComingSoon 
          ?
            <div className={styles.comingSoonTag}>
              <span>Coming soon</span>
            </div>
          :
            <></>
        }
      </div>

      <div className={styles.projectWrapper}>
        <span>
          { props.archiveData.project }
        </span>
      </div>

      <div className={styles.categoryWrapper}>
        <span>
          { props.archiveData.category }
        </span>
      </div>
    </div>
  )
}