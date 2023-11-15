/****************************************************/
/*                                                  */
/* Hero Component                                   */
/*                                                  */
/****************************************************/

'use client';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

export default function Archive() {
  /************** Defining variables ***************/
  const title: String = "/archive"
  
  const archiveContainerRef = useRef(null)
  const h1DisplayRef = useRef(null)

  /************** Style classNames ***************/
  const styles = {
    archiveContainer: [
      'w-full h-screen',
      'flex flex-col justify-end',
    ].join(' '),
    
    h1: [
      'font-display font-bold display-archive',
    ].join(' '),
  }

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: archiveContainerRef.current,
        start: "top",
        end: "+=100%",
        scrub: 0.3,
      }
    })

    tl
      .to(h1DisplayRef.current, { x: 32, fontSize: '3.5rem' })
      
  }, [])

  return (
    <div className={styles.archiveContainer} ref={archiveContainerRef}>

      <h1 className={styles.h1} ref={h1DisplayRef}>
        {title}
      </h1>
    </div>  
  )
}