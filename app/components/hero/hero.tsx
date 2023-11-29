'use client';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const titleImgPath: string = '/img/rf_black.svg'

  const heroContainerRef = useRef(null)
  const titleImgRef = useRef(null)

  /************** Style classNames ***************/
  const styles = {
    heroContainer: [
      'w-full h-svh-screen min-h-[600px]',
      'flex flex-col justify-end',
    ].join(' '),
    descriptionContainer: [
      'w-full px-8',
      'grid grid-cols-12 gap-8',
      'max-sm:px-2 max-sm:gap-4',
    ].join(' '),
    description: [
      'col-span-6',
      'font-bold title-text',
      'max-sm:col-span-7',
    ].join(' '),
    imgWrapper: [
      'w-full px-8 -mb-[7vw]',
      'relative overflow-hidden',
      'max-sm:px-2',
    ].join(' '),
    img: [
      'w-full h-full object-contain object-left',
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
        .to(titleImgRef.current, { height: cdt ? '2.25rem' : '3.5rem' })

    })
  }, [])

  return (
    <div className={styles.heroContainer} ref={heroContainerRef}>
      <div className={styles.descriptionContainer}>
        <span className={styles.description}>
          {description}
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

    </div>  
  )
}