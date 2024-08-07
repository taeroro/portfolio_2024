'use client';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { ArchiveListData, ArchiveData } from "@/contentful/fetchArchive";


/****************************************************/
/*                                                  */
/* Archive Component                                */
/*                                                  */
/****************************************************/

export default function Archive(props: {archiveListData: ArchiveListData}) {

  /************** Defining variables ***************/
  const title: string = props.archiveListData.sectionTitle
  const archiveList: ArchiveData[] = props.archiveListData.archiveData
  
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
      'max-sm:px-2 max-sm:mt-1',
    ].join(' '),
  }

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: archiveContainerRef.current,
        start: "top+=10%",
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
        .to(h1DisplayRef.current, { x: cdt ? 8 : 32, fontSize: cdt ? '2.25rem' : '3.5rem', rotation: cdt ? '10deg' : '5deg' })
    })
      
  }, [])

  return (
    <div className={styles.archiveContainer} ref={archiveContainerRef}>
      <div className={styles.sectionTitleContainer} id='archive'>
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

function SingleArchive(props: {archiveData: ArchiveData}) {

    /************** Style classNames ***************/
    const styles = {
      singleArchiveContainer: [
        'w-full py-8',
        'flex flex-row',
        'grid grid-cols-12 gap-8',
        'border-b-4 border-primary',
        'max-sm:gap-4 max-sm:py-6 max-sm:border-b-[3px]',
      ].join(' '),
      clientWrapper: [
        'col-span-6',
        'flex flex-row ',
        'font-bold h2-text',
        'max-xl:col-span-12',
      ].join(' '),
      comingSoonTag: [
        'self-start px-2 py-1',
        'rounded-full border-2 border-highlight bg-white',
        'rotate-12 -translate-y-2',
        'font-medium leading-none text-highlight body-text whitespace-nowrap',
        'max-sm:px-1.5 max-sm:py-0.5 max-sm:-translate-y-1',
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
          { props.archiveData.category.join(', ') }
        </span>
      </div>
    </div>
  )
}