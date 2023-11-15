/****************************************************/
/*                                                  */
/* Hero Component                                   */
/*                                                  */
/****************************************************/

'use client';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

export default function Hero() {
  /************** Defining variables ***************/
  const title: String = "ryan.fan"
  const description: String = "is a Product Designer and Technologist helping humans understand machines better based in New York City."
  
  const heroContainerRef = useRef(null)
  const h1DisplayRef = useRef(null)

  /************** Style classNames ***************/
  const styles = {
    heroContainer: [
      'w-full h-screen',
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