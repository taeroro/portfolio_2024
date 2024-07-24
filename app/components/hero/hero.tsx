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
  const titleMobileImgPath: string = '/img/rf_white_vertical.svg'

  const copyright: string = "©" + " " + new Date().getFullYear()

  const heroContainerRef = useRef(null)
  const titleImgRef = useRef(null)
  const arrowRef = useRef(null)

  /************** Style classNames ***************/
  const styles = {
    heroContainer: [
      'w-full h-svh-screen min-h-[600px]',
      'flex flex-col justify-start',
      'bg-primary relative',
      'max-sm:flex-row'
    ].join(' '),
    imgWrapper: [
      'w-full px-8 pt-8 -mb-[7vw]',
      'relative overflow-hidden block',
      'max-sm:px-2 max-sm:hidden',
    ].join(' '),
    mobileImageWrapper: [
      'hidden',
      'h-full overflow-hidden',
      'max-sm:block max-sm:pb-4 max-sm:pt-12 max-sm:pl-2 max-sm:-mr-[10%]'
    ].join(' '),
    img: [
      'h-full object-contain object-left',
      'select-none pointer-events-none',
      'max-sm:object-contain max-sm:h-full max-sm:object-left-top',
    ].join(' '),
    descriptionContainer: [
      'w-full px-8 pt-8',
      'grid grid-cols-12 gap-8',
      'max-sm:px-2 max-sm:pt-12 max-sm:gap-4 max-sm:grid-cols-none',
    ].join(' '),
    description: [
      'col-span-4 col-start-9',
      'font-bold title-text text-white text-right',
      'max-sm:col-span-7 max-sm:text-right',
    ].join(' '),

    topContainer: [
      'absolute pl-8 pt-8',
      'max-sm:px-2 max-sm:pt-3',
    ].join(' '),
    copyright: [
      'font-medium leading-6 text-white body-text',
    ].join(' '),

    bottomContainer: [
      'grow flex flex-row justify-between items-end',
      'px-8 pb-8',
      'max-sm:absolute max-sm:bottom-0 max-sm:right-0 max-sm:px-2 max-sm:pb-4'
    ].join(' '),
    moreIndicator: [
      'flex flex-col',
      'max-sm:items-end'
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
      'max-sm:hidden'
    ].join(' '),
  }

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 })
    tl.to(arrowRef.current, { y: -10,  duration: 1.2, ease: "power2.in"})
    tl.to(arrowRef.current, { y: 0,  duration: 1.1, ease: "bounce.out"})
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

      <div className={styles.mobileImageWrapper}>
        <Image
          className={styles.img}
          src={titleMobileImgPath}
          width={650}
          height={2000}
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