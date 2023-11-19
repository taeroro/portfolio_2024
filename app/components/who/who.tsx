'use client';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

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
  const title: string = "/who?"
  const whoContentData: whoContentData = {
    subtitle: 'Who is Ryan?',
    description: 'Unleash the power of AI and see what it can do.',
    search: {
      placeholder: 'Type in any question about me here...',
      prompt: 'Try: “Look up ryan’s experience and background”',
      result: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id leo nunc. Mauris a dictum libero. Aliquam sed lacus dui. Donec vitae pulvinar libero. Suspendisse vulputate congue mi, quis rhoncus massa fermentum tristique. Suspendisse potenti. Fusce tristique lacus ante, ut iaculis nibh blandit ac. Duis nisi ipsum, condimentum a vehicula pellentesque, tristique vel lorem. Fusce vulputate egestas felis, posuere bibendum arcu scelerisque sit amet. \n\n Donec id urna vitae elit ornare suscipit non a diam. Nam tempor lacinia est, vitae laoreet magna laoreet a. Etiam vestibulum nibh vel libero consectetur, quis aliquet odio commodo. In posuere lorem pellentesque dolor sagittis, ut tincidunt ipsum accumsan. In ut consequat nibh, eu tincidunt quam. In nec nisi sollicitudin, varius metus id, ultrices orci.",
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
      'flex flex-col justify-end',
    ].join(' '),
    h1: [
      'font-display font-bold display-who',
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
    <div className={styles.whoContainer} ref={whoContainerRef}>
      <div className={styles.sectionTitleContainer}>
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
  
  /************** Style classNames ***************/
  const styles = {
    contentContainer: [
      'w-full min-h-screen px-8 my-16',
      'grid grid-cols-12 auto-rows-min gap-8',
      'max-sm:px-2 max-sm:my-8',
    ].join(' '),
    introTextWrapper: [
      'col-span-8',
      'flex flex-col gap-4',
      'max-lg:col-span-12 max-xl:col-span-10',
    ].join(' '),
    subtitle: [
      'font-bold h2-text',
    ].join(' '),
    description: [
      'font-medium leading-6 body-text',
    ].join(' '),
  }

  return (
    <div className={styles.contentContainer}>
      <div className={styles.introTextWrapper}>
        <h2 className={styles.subtitle}>
          { props.whoContentData.subtitle }
        </h2>

        <p className={styles.description}>
          { props.whoContentData.description }
        </p>
      </div>

      <WhoSeach searchData={props.whoContentData.search} />

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
      'max-lg:col-span-12 max-xl:col-span-10',
    ].join(' '),
    searchContainer: [
      'w-full',
      'flex flex-col gap-2',
    ].join(' '),
    inputContainer: [
      'w-full py-1 pl-8',
      'border-b-4 border-primary',
      'font-bold title-text tracking-normal',
      'placeholder:text-secondary',
      'focus:outline-none'
    ].join(' '),
    inputIcon: [
      'absolute pointer-events-none p-1',
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