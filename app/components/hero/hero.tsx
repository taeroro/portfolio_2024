'use client';

import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { HeroData } from "@/contentful/fetchHero";
import Image from "next/image";


/****************************************************/
/*                                                  */
/* Hero Component                                   */
/*                                                  */
/****************************************************/

export default function Hero(props: {heroData: HeroData}) {
  /************** Defining variables ***************/
  const description: string = props.heroData.description
  const titleImgPath: string = '/img/rf_white.svg'

  const copyright: string = "©" + " " + new Date().getFullYear()

  const heroContainerRef = useRef(null)
  const titleImgRef = useRef(null)
  const arrowRef = useRef(null)

  /************** Style classNames ***************/
  const styles = {
    heroContainer: [
      'w-full h-svh-screen min-h-[600px]',
      'flex flex-col justify-start',
      'bg-primary',
    ].join(' '),
    imgWrapper: [
      'w-full px-8 pt-8 -mb-[7vw]',
      'relative overflow-hidden',
      'max-sm:px-2',
    ].join(' '),
    img: [
      'w-full h-full object-contain object-left',
      'select-none pointer-events-none',
    ].join(' '),
    descriptionContainer: [
      'w-full px-8 pt-8',
      'grid grid-cols-12 gap-8',
      'max-sm:px-2 max-sm:gap-4',
    ].join(' '),
    description: [
      'col-span-4 col-start-9',
      'font-bold title-text text-white text-right',
      'max-sm:col-span-7',
    ].join(' '),

    topContainer: [
      'absolute pl-8 pt-8',
    ].join(' '),
    copyright: [
      'font-medium leading-6 text-white body-text',
    ].join(' '),

    bottomContainer: [
      'grow flex flex-row justify-between items-end',
      'px-8 pb-8'
    ].join(' '),
    moreIndicator: [
      'flex flex-col'
    ].join(' '),
    moreArrow: [
      'font-display text-white font-bold h3-text',
    ].join(' '),
    moreText: [
      'font-medium leading-6 text-white body-text',
    ].join(' '),
    scrollPositionIndicator: [
      'relative',
      'w-8 h-8 rounded-full border-4',
    ].join(' '),
  }

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 })
    tl.to(arrowRef.current, { y: -10,  duration: 1.2, ease: "power2.in"})
    tl.to(arrowRef.current, { y: 0,  duration: 1.1, ease: "bounce.out"})

  //   gsap.registerPlugin(ScrollTrigger);

  //   const mm = gsap.matchMedia();
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: heroContainerRef.current,
  //       start: "top",
  //       end: "+=100%",
  //       scrub: 0.3,
  //     }
  //   })

  //   mm.add({
  //     isMobile: "(max-width: 640px)",
  //     isDesktop: "(min-width: 641px)",
  //   }, (context)=> {
  //     let cdt = false;
  //     if(context.conditions) cdt = context.conditions.isMobile;
      
  //     tl
  //       .to(titleImgRef.current, { height: cdt ? '2.25rem' : '3.5rem' })

  //   })
  }, [])

  return (
    <div className={styles.heroContainer} ref={heroContainerRef} id={'hpHero'}>
      <div className={styles.topContainer}>
        <span className={styles.copyright}>
          {copyright}
        </span>
      </div>

      <div className={styles.imgWrapper} ref={titleImgRef}>
        <Image
          className={styles.img}
          src={titleImgPath}
          width={2000}
          height={650}
          priority
          alt={"ryan.fan"}
        />
      </div>

      <div className={styles.descriptionContainer}>
        <span className={styles.description}>
          {description}
        </span>
      </div>

      <div className={styles.bottomContainer}>
        <div className={styles.moreIndicator}>
          <span className={styles.moreArrow} ref={arrowRef} >
            ↓
          </span>
          <span className={styles.moreText}>
            Scroll to see more
          </span>
        </div>

        <div className={styles.scrollPositionIndicator} />
      </div>

    </div>  
  )
}