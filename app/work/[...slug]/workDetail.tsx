'use client';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";import { useEffect, useRef } from "react";
import { FullWorkData } from "@/contentful/fetchWorkDetail";
import { ImageData } from "@/contentful/parseImage";
import Image from "next/image";


/****************************************************/
/*                                                  */
/* Work Detail Page                                 */
/*                                                  */
/****************************************************/

export default function WorkDetail({fullWorkData} : {fullWorkData: FullWorkData}) {

  /************** Defining variables ***************/  
  const [
    slug,
    title,
    overview,
    thumbnail,
    fullDescription,

    role,
    category,
    agency,
    collaborator,
    deliverable,

    projectLink,
  ] : [
    string,
    string,
    string,
    ImageData,
    string,

    string,
    string,
    string,
    string,
    string,

    string,
  ]
   = [
    fullWorkData.slug,
    fullWorkData.title,
    fullWorkData.overview,
    fullWorkData.thumbnail,
    fullWorkData.workDetailData.fullDescription,

    fullWorkData.workDetailData.role,
    fullWorkData.workDetailData.category,
    fullWorkData.workDetailData.agency || '',
    fullWorkData.workDetailData.collaborator || '',
    fullWorkData.workDetailData.deliverable,

    fullWorkData.workDetailData.projectLink,
  ]
  
  // console.dir(fullWorkData, {depth: null});

  return (
    <div>
      <Title title={title} />
      <Overview 
        thumbnail={thumbnail} overview={overview} fullDescription={fullDescription} 
        role={role} category={category} agency={agency} collaborator={collaborator} deliverable={deliverable}
        projectLink={projectLink}
      />
    </div>
  )
}




/****************************************************/
/*                                                  */
/* Title - Work Detail Page                         */
/*                                                  */
/****************************************************/

function Title({title}: {title: string}) {

  /************** Defining variables ***************/  
  const heroContainerRef = useRef(null)
  const h1DisplayRef = useRef(null)
  

  /************** Style classNames ***************/
  const styles = {
    heroContainer: [
      'w-full h-svh-screen min-h-[600px]',
      'flex flex-col justify-end',
    ].join(' '),
    h1: [
      'font-display font-bold display-microsoft',
      'select-none pointer-events-none',
    ].join(' '),
  }


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroContainerRef.current,
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
    <div className={styles.heroContainer} ref={heroContainerRef}>
      <h1 className={styles.h1} ref={h1DisplayRef}>
        {title}
      </h1>
    </div>
  )
}




/****************************************************/
/*                                                  */
/* Overview - Work Detail Page                      */
/*                                                  */
/****************************************************/

function Overview({
    thumbnail, overview, fullDescription,
    role, category, agency, collaborator, deliverable,
    projectLink
  }: 
  {
    thumbnail: ImageData, overview: string, fullDescription: string,
    role: string, category: string, agency: string, collaborator: string, deliverable: string,
    projectLink: string
  }) {

  /************** Defining variables ***************/  
  const roleKey = Object.keys({role});
  const detailArr = [
    {
      name: Object.keys({role})[0],
      item: role,
    },
    {
      name: Object.keys({category})[0],
      item: category,
    },
    {
      name: Object.keys({agency})[0],
      item: agency,
    },
    {
      name: Object.keys({collaborator})[0],
      item: collaborator,
    },
    {
      name: Object.keys({deliverable})[0],
      item: deliverable,
    },
  ]
  
  /************** Style classNames ***************/
  const styles = {
    overviewContainer: [
      'w-full px-8 mt-16',
      'grid grid-cols-12 gap-8',
      'max-sm:px-2 max-sm:mt-8',
      'pb-16',
    ].join(' '),
    imgWrapper: [
      'w-full col-span-12',
      'flex flex-row justify-center',
      'aspect-[2/1] relative overflow-hidden',
      'bg-gray-300',
      'max-sm:aspect-[3/4] max-lg:aspect-[3/2] max-xl:aspect-[5/3]',
    ].join(' '),
    img: [
      'object-cover',
    ].join(' '),
    sectionTitleWrapper: [
      'col-span-8',
      'font-bold h2-text',
      'max-lg:col-span-12 max-xl:col-span-10',
    ].join(' '),
    overviewWrapper: [
      'col-span-8',
      'font-bold title-text',
      'max-lg:col-span-12 max-xl:col-span-10',
    ].join(' '),
    descriptionWrapper: [
      'col-span-8',
      'font-medium leading-6 body-text whitespace-pre-line',
      'max-lg:col-span-12 max-xl:col-span-10',
    ].join(' '),
    detailOuterContainer: [
      'col-span-8',
      'grid grid-cols-4 gap-8',
      'max-lg:col-span-12 max-xl:col-span-10 max-sm:gap-4',
    ].join(' '),
    singleDetailWrapper: [
      'col-span-1 gap-1/2',
      'flex flex-col',
      'font-medium body-text whitespace-pre-line',
      'max-sm:col-span-2',
    ].join(' '),
    detailTitle: [
      'font-bold capitalize',
    ].join(' '),
  }


  return (
    <div className={styles.overviewContainer}>
      <div className={styles.imgWrapper}>
        <Image 
          className={styles.img}
          src={thumbnail.url}
          width={thumbnail.width}
          height={thumbnail.height}
          alt={"Project thumbnail."}
        />
      </div>

      <div className={styles.sectionTitleWrapper}>
        <h2>
          Overview
        </h2>
      </div>

      <div className={styles.overviewWrapper}>
        <span>
          {overview}
        </span>
      </div>

      <div className={styles.descriptionWrapper}>
        <p>
          {fullDescription}
        </p>
      </div>

      <div className={styles.detailOuterContainer}>
      {
        detailArr.map((e) => (
          e.item ?
            <div className={styles.singleDetailWrapper}>
              <span className={styles.detailTitle}>
                {e.name}
              </span>
    
              <span>
                {e.item}
              </span>
            </div>
          :
          <></>
        ))
      }
      </div>

    </div>
  )
}