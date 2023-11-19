'use client';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";


/****************************************************/
/*                                                  */
/* Hero Component                                   */
/*                                                  */
/****************************************************/

export default function Hero() {

  /************** Defining variables ***************/
  const title: string = "ryan.fan"
  const description: string = "is a New York City based Product Designer and Technologist helping humans understand machines better."
  
  const heroContainerRef = useRef(null)
  const h1DisplayRef = useRef(null)

  /************** Style classNames ***************/
  const styles = {
    heroContainer: [
      'w-full h-svh-screen min-h-[600px]',
      'flex flex-col justify-end',
    ].join(' '),
    descriptionContainer: [
      'w-full px-8',
      'grid grid-cols-12 gap-8',
      'max-sm:px-2',
    ].join(' '),
    description: [
      'col-span-6',
      'font-bold title-text',
      'max-sm:col-span-7',
    ].join(' '),
    h1: [
      'font-display font-bold display-name',
      'select-none pointer-events-none',
    ].join(' '),
  }

  useLayoutEffect(() => {
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
      <div className={styles.descriptionContainer}>
        <span className={styles.description}>
          {description}
        </span>
      </div>

      <h1 className={styles.h1} ref={h1DisplayRef}>
        {title}
      </h1>
    </div>  
  )
}