'use client';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";import { useEffect, useRef, useState } from "react";
import { FullWorkData, WorkDetailContent, WorkDetailContentMediaData } from "@/contentful/fetchWorkDetail";
import { ImageData } from "@/contentful/parseImage";
import Image from "next/image";
import ReactPlayer from "react-player/vimeo";
import Markdown from "react-markdown";


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
    detailContent
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
    WorkDetailContent[]
  ] = [
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
    fullWorkData.workDetailData.workDetailContent
  ]
  
  // console.dir(fullWorkData.workDetailData.workDetailContent, {depth: null});

  return (
    <div>
      <Title slug={slug} title={title} />
      <Overview 
        thumbnail={thumbnail} overview={overview} fullDescription={fullDescription} 
        role={role} category={category} agency={agency} collaborator={collaborator} deliverable={deliverable}
        projectLink={projectLink}
      />
      {
        detailContent.map((e, i) => (
          <Content contentData={e} key={i} />
        ))
      }
    </div>
  )
}




/****************************************************/
/*                                                  */
/* Title - Work Detail Page                         */
/*                                                  */
/****************************************************/

function Title({slug, title}: {slug: string, title: string}) {

  /************** Defining variables ***************/  
  const heroContainerRef = useRef(null)
  const h1DisplayRef = useRef(null)
  

  /************** Style classNames ***************/
  const styles: any = {
    heroContainer: [
      'w-full h-svh-screen min-h-[600px]',
      'flex flex-col justify-end',
    ].join(' '),
    h1: [
      'font-display font-bold',
      'select-none pointer-events-none',
      'z-20'
    ].join(' '),
    microsoft: [
      ' display-microsoft'
    ].join(' '),
    tiktok: [
      ' display-tiktok'
    ].join(' '),
    michaelkors: [
      ' display-mkc'
    ].join(' '),
    riley: [
      ' display-riley'
    ].join(' '),
  }
  const h1ClassName = styles[slug] || ''

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
      <h1 
        className={styles.h1.concat(h1ClassName)}
        ref={h1DisplayRef}
      >
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
      'w-full px-8 py-16',
      'grid grid-cols-12 gap-8',
      'max-sm:px-2 max-sm:py-8',
    ].join(' '),
    imgWrapper: [
      'w-full col-span-12',
      'flex flex-row justify-center',
      'aspect-[2/1] relative overflow-hidden',
      'bg-gray-300',
      'max-sm:aspect-[3/4] max-lg:aspect-[3/2] max-xl:aspect-[5/3]',
    ].join(' '),
    img: [
      'h-full',
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
        detailArr.map((e, i) => (
          e.item &&
          <div className={styles.singleDetailWrapper} key={i}>
            <span className={styles.detailTitle}>
              {e.name}
            </span>
  
            <span>
              {e.item}
            </span>
          </div>
        ))
      }
      </div>

    </div>
  )
}




/****************************************************/
/*                                                  */
/* Content - Work Detail Page                       */
/*                                                  */
/****************************************************/

function Content({contentData}: {contentData: WorkDetailContent}) {

  /************** Defining variables ***************/
  const [
    title,
    subtitle,
    body,
    bottomMargin,
    workMedia
  ] : [
    string,
    string,
    string,
    boolean,
    WorkDetailContentMediaData
  ] = [
    contentData.title || '',
    contentData.subtitle || '',
    contentData.body || '',
    contentData.bottomMargin,
    contentData.workMedia || null
  ]

  /************** Style classNames ***************/
  const styles = {
    contentContainer: [
      'w-full px-8 pb-8',
      'grid grid-cols-12',
      'max-sm:px-2 max-sm:pb-4',
    ].join(' '),
    sectionTitleWrapper: [
      'col-span-8 pb-8',
      'font-bold h2-text',
      'max-lg:col-span-12 max-xl:col-span-10 max-sm:pb-4',
    ].join(' '),
    innerContent: [
      'col-span-8',
      'flex flex-col gap-8',
      'max-lg:col-span-12 max-xl:col-span-10 max-sm:pb-4',
    ].join(' '),
    bMargin: [
      ' !pb-16'
    ].join(' '),
  }

  return (
    <div className={styles.contentContainer.concat(bottomMargin ? styles.bMargin : '')}>
      {
        title &&
        <div className={styles.sectionTitleWrapper}>
          <h2>
            {title}
          </h2>
        </div>
      }

      <div className={styles.innerContent}>
        <TextContent subtitle={subtitle} body={body} />
        { workMedia && <MediaContent media={workMedia} /> }
      </div>

    </div>
  )
}




/****************************************************/
/*                                                  */
/* Content/Text - Work Detail Page                  */
/*                                                  */
/****************************************************/

function TextContent({subtitle, body}: {subtitle: string, body: string}) {

  /************** Style classNames ***************/
  const styles = {
    textOuterWrapper: [
      'col-span-8',
      'flex flex-col gap-4',
      'max-lg:col-span-12 max-xl:col-span-10',
    ].join(' '),
    subtitleWrapper: [
      'w-full',
      'font-bold title-text',
    ].join(' '),
    bodyWrapper: [
      'w-full',
      'font-medium leading-6 body-text whitespace-pre-line',
    ].join(' '),
  }
  
  if (!subtitle && !body) 
    return null

  return (
    <div className={styles.textOuterWrapper}>
      {
        subtitle &&
        <div className={styles.subtitleWrapper}>
          <span>
            {subtitle}
          </span>
        </div>
      }

      {
        body &&
        <div className={styles.bodyWrapper}>
          <Markdown>
            {body}
          </Markdown>
        </div>
      }
    </div>
  )
}




/****************************************************/
/*                                                  */
/* Content/Media - Work Detail Page                  */
/*                                                  */
/****************************************************/

function MediaContent({media}: {media: WorkDetailContentMediaData}) {

  /************** Defining variables ***************/
  const [
    mediaType,
    size,
    image,
    secondImage,
    videoLink,
    showOutline
  ] : [
    string,
    string,
    ImageData,
    ImageData,
    string,
    boolean
  ] = [
    media.mediaType,
    media.size,
    media.image as ImageData,
    media.secondImage as ImageData,
    media.videoLink || '',
    media.showOutline
  ]
  const [hasWindow, setHasWindow] = useState(false);

  /************** Style classNames ***************/
  const styles = {
    imgWrapper: [
      'w-full col-span-12',
      'flex flex-row justify-center',
      'relative overflow-hidden',
      'bg-gray-300',
    ].join(' '),
    img: [
      'object-cover',
    ].join(' '),
    imgHalvesWrapper: [
      'w-full',
      'grid grid-cols-2 gap-8',
      'max-xl:grid-cols-1 max-sm:gap-4',
    ].join(' '),
    imgHalves: [
      'object-cover',
    ].join(' '),
    videoWrapper: [
      'w-full col-span-12',
    ].join(' '),
  }

  useEffect(() => {
    if (typeof window !== 'undefined')
      setHasWindow(true)
  }, [])


  if (mediaType === 'Video') {
    return (
      <div className={styles.videoWrapper}>
        {
          hasWindow &&
          <ReactPlayer
            url={videoLink}
            width={'100%'}
            height={'100%'}
            controls={true}
            config={{
              playerOptions: {
                autoplay: true,
                loop: true,
                responsive: true,
                muted: true,
                title: false,
              }
            }}
          />
        }
      </div>
    )
  }

  if (size === 'Half') {
    return (
      <div className={styles.imgHalvesWrapper}>
        <Image 
          className={styles.imgHalves}
          src={image.url}
          width={image.width}
          height={image.height}
          alt={"Project content image."}
        />

        <Image 
          className={styles.imgHalves}
          src={secondImage.url}
          width={image.width}
          height={image.height}
          alt={"Project content image."}
        />
      </div>
    )
  }

  return (
    <div className={styles.imgWrapper}>
      <Image 
        className={styles.img}
        src={image.url}
        width={image.width}
        height={image.height}
        alt={"Project content image."}
      />
    </div>
  )
  
}