'use client';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image"

/************** Temp - TO BE DELETED ***************/
interface whoContentData {
  subtitle: string,
  description: string,
  search: searchData,
}

interface searchData {
  placeholder: string,
  prompt: string,
  result: string,
}
/************** Temp - TO BE DELETED ***************/


/****************************************************/
/*                                                  */
/* Who Component                                    */
/*                                                  */
/****************************************************/

export default function Who() {

  /************** Defining variables ***************/
  const title: string = "/about"
  const whoContentData: whoContentData = {
    subtitle: '',
    description: 'Ryan Fan is an award-winning Product Designer in New York. He currently works at Code and Theory with clients such as JPMorganChase, Microsoft, TikTok, and Marriott on crafting the best-in-class digital products, experiences, and design systems. Previously, he was a Product Designer at Wondersauce, and a freelance Product Designer & Developer worked with clients including Michael Kors and JLo. \n\n His background and experience enable him to create a harmonious paradigm between design and engineering teams to create cohesive, thoughtful experiences that tailor user needs, excel in problem-solving, and achieve business goals.',
    search: {
      placeholder: '',
      prompt: '',
      result: "",
    },
  }
  
  const whoContainerRef = useRef(null)
  const h1DisplayRef = useRef(null)

  /************** Style classNames ***************/
  const styles = {
    whoContainer: [
      'w-full min-h-screen',
      'flex flex-col',
    ].join(' '),
    sectionTitleContainer: [
      'w-full h-svh-screen',
      'w-full',
      'flex flex-col justify-end',
    ].join(' '),
    h1: [
      'font-display font-bold display-about',
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

    const mm = gsap.matchMedia();
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: whoContainerRef.current,
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
    <div className={styles.whoContainer} ref={whoContainerRef}>
      <div className={styles.sectionTitleContainer} id='who?'>
        <h1 className={styles.h1} ref={h1DisplayRef}>
          {title}
        </h1>
      </div>

      <WhoContent whoContentData={whoContentData} />
    </div>  
  )
}




/****************************************************/
/*                                                  */
/* WhoContent Component                             */
/*                                                  */
/****************************************************/

function WhoContent(props: {whoContentData: whoContentData}) {

  const smileImgPath: string = '/img/ryan_smiley.svg'
  
  /************** Style classNames ***************/
  const styles = {
    contentContainer: [
      'w-full px-8 mt-20 mb-40',
      'grid grid-cols-12 auto-rows-min gap-8',
      'max-sm:px-2 max-sm:mt-8 max-sm:mb-12 max-sm:gap-4',
    ].join(' '),
    introTextWrapper: [
      'col-span-8',
      'flex flex-col gap-4',
      'max-lg:col-span-12 max-xl:col-span-10 max-sm:gap-4',
    ].join(' '),
    subtitle: [
      'font-bold h2-text',
    ].join(' '),
    description: [
      'font-medium leading-normal large-body-text whitespace-pre-line',
    ].join(' '),
    smileContainer: [
      'col-span-4',
      'grid grid-cols-4',
      'max-sm:col-span-12 max-sm:grid-cols-12',
    ].join(' '),
    img: [
      'col-span-2 w-full object-contain',
      'select-none pointer-events-none',
      'max-sm:col-span-4 max-sm:col-start-9'
    ].join(' '),
  }

  return (
    <div className={styles.contentContainer}>
      <div className={styles.introTextWrapper}>
        {
          props.whoContentData.subtitle 
          ? 
            <h2 className={styles.subtitle}>
              { props.whoContentData.subtitle }
            </h2>
          : <></>
        }

        <p className={styles.description}>
          { props.whoContentData.description }
        </p>
      </div>

      <div className={styles.smileContainer}>
        <Image
          className={styles.img}
          src={smileImgPath}
          width={150}
          height={150}
          alt={"a portrait of me"}
        />
      </div>

      {/* <WhoSeach searchData={props.whoContentData.search} /> */}

    </div>
  )
}

function WhoSeach(props: {searchData: searchData}) {
  
  /************** Defining variables ***************/
  let isResultLoaded: boolean = true

  /************** Style classNames ***************/
  const styles = {
    searchOuterContainer: [
      'col-span-8',
      'flex flex-col gap-8',
      'max-lg:col-span-12 max-xl:col-span-10 max-sm:gap-4',
    ].join(' '),
    searchContainer: [
      'w-full',
      'flex flex-col gap-2',
    ].join(' '),
    inputContainer: [
      'w-full py-1 pl-8 rounded-none',
      'border-b-4 border-primary',
      'font-bold title-text tracking-normal',
      'placeholder:text-secondary',
      'focus:outline-none',
      'max-sm:border-b-[3px] max-sm:pl-6',
    ].join(' '),
    inputIcon: [
      'absolute pointer-events-none px-1 pt-1.5',
      'font-display font-bold title-text tracking-normal not-italic'
    ].join(' '),
    helper: [
      'font-medium leading-6 text-secondary body-text',
    ].join(' '),
    resultContainer: [
      'w-full',
      'font-medium leading-6 whitespace-break-spaces body-text',
    ].join(' '),
  }

  return (
    <div className={styles.searchOuterContainer}>
      <div className={styles.searchContainer}>
        <form>
          <i className={styles.inputIcon}>
            →
          </i>
          <input
            className={styles.inputContainer}
            type="input"
            placeholder={props.searchData.placeholder}
          />
        </form>

        <span className={styles.helper}>
          { props.searchData.prompt }
        </span>
      </div>

      <div className={styles.resultContainer}>
        {
          isResultLoaded 
          ? <p>{ props.searchData.result }</p>
          : <></>
        }
      </div>
    </div>
  )
}