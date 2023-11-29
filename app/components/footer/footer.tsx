'use client';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Image from "next/image"

/************** Temp - TO BE DELETED ***************/
interface socialData {
  type: string,
  displayContent: string,
  url: string,
}
/************** Temp - TO BE DELETED ***************/

/****************************************************/
/*                                                  */
/* Footer Component                                 */
/*                                                  */
/****************************************************/


export default function Footer() {

  /************** Defining variables ***************/
  const copyright: string = "© Ryan Fan" + " " + new Date().getFullYear()
  const socialData: socialData[] = [
    {
      type: "e",
      displayContent: "hello@ryan.fan",
      url: "mailto:hello@ryan.fan"
    },
    {
      type: "in",
      displayContent: "ryanzfan",
      url: "https://www.linkedin.com/in/ryanzfan/"
    },
    {
      type: "cv",
      displayContent: "ryan.fan",
      url: "https://read.cv/ryan.fan"
    },
    {
      type: "ig",
      displayContent: "@ryanfandesign",
      url: "https://www.instagram.com/ryanfandesign/"
    },
  ]
  const titleImgPath: string = '/img/rf_white.svg'

  const titleImgRef = useRef(null)
  const animOverlayRef = useRef(null)

  /************** Style classNames ***************/
  const styles = {
    footerContainer: [
      'w-full h-screen min-h-[600px] bg-primary',
      'fixed bottom-0 z-0',
      'flex flex-col justify-end overflow-hidden',
    ].join(' '),
    footerTextContainer: [
      'w-full px-8',
      'grid grid-cols-12 gap-2',
      'max-sm:px-2',
    ].join(' '),
    copyright: [
      'row-start-1 col-span-6',
      'font-medium leading-6 text-white body-text',
    ].join(' '),
    socialWrapper: [
      'row-start-2 col-span-6',
      'flex flex-row flex-wrap gap-x-4 gap-y-2'
    ].join(' '),
    socialSingle: [
      'font-bold title-text text-white',
    ].join(' '),
    link: [
      'no-underline border-solid border-white border-b-4',
      'transition duration-300',
      'hover:border-highlight hover:bg-highlight font-white',
      'max-sm:border-b-2',
    ].join(' '),
    imgWrapper: [
      'w-full px-8 -mb-[6.9vw]',
      'relative overflow-hidden origin-bottom',
      'max-sm:px-2',
    ].join(' '),
    img: [
      'w-full h-full object-contain object-left',
      'select-none pointer-events-none',
    ].join(' '),
    animOverlay: [
      'w-full h-full absolute bg-black opacity-0',
      'select-none pointer-events-none',
    ].join(' '),
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#footerArea",
        start: "-=75%",
        end: "+=50%",
        scrub: 0.3,
      }
    })

    tl
      .fromTo(titleImgRef.current, { y: '15%', scale: '.98' }, { y: '0', scale: '1', ease: "sine.inOut" })
      .fromTo(animOverlayRef.current, { opacity: '.60' }, { opacity: '0', ease: "sine.inOut" })
  }, [])


  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerTextContainer}>
        <span className={styles.copyright}>
          {copyright}
        </span>

        <div className={styles.socialWrapper}>
          {
            socialData.map((e, i) => 
              <div className={styles.socialSingle} key={i}>
                <span>
                  { e.type.concat(": ") }
                </span>
                <a
                  className={styles.link}
                  href={e.url} target="_blank" rel="noopener noreferrer"
                >
                  { e.displayContent }
                </a>
              </div>
            )
          }
        </div>
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

      <div className={styles.animOverlay} ref={animOverlayRef} />

    </div>
  )
}