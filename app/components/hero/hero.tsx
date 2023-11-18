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
      'w-full h-screen min-h-[600px]',
      'flex flex-col justify-end',
    ].join(' '),

    descriptionContainer: [
      'w-full px-8',
      'grid grid-cols-12 gap-8',
    ].join(' '),
    
    description: [
      'col-span-6',
      'font-bold title-text',
    ].join(' '),
    
    h1: [
      'font-display font-bold display-name',
      'select-none pointer-events-none',
    ].join(' '),
  }

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroContainerRef.current,
        start: "top",
        end: "+=100%",
        scrub: 0.3,
      }
    })

    tl
      .to(h1DisplayRef.current, { x: 32, fontSize: '3.5rem' })

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