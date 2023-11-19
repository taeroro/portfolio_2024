'use client';

/****************************************************/
/*                                                  */
/* Navigation Component                             */
/*                                                  */
/****************************************************/

import { useEffect, useRef, useState } from "react"

export default function Navigation() {

  /************** Defining variables ***************/
  const [footerPosition, setFooterPosition] = useState(-1)
  const [isOnDarkBg, setIsOnDarkBg] = useState(false)
  
  const currentPath: string[] = ["ryan.fan"]
  const activePath: string = "/"
  const menuGlyph: string = "+"

  const navRef = useRef(null)
  
  /************** Style classNames ***************/
  const styles = {
    navigationOuterContainer: [
      'fixed top-0 left-0 z-50',
      'w-full',
    ].join(' '),
    navigationContainer: [
      'pt-4 mx-8',
      'flex flex-row justify-between',
      'nav',
      'max-sm:mx-2 max-sm:pt-1',
    ].join(' '),
    pathingContainer: [
      'font-display font-bold text-secondary h1-display',
    ].join(' '),
    menuButtonWrapper: [
      'font-bold text-secondary h1-text',
    ].join(' '),
  }

  function scrollHandler() {
    let y: number = window.scrollY;

    if (footerPosition >= 0 && y >= footerPosition)
      setIsOnDarkBg(true)
    else 
      setIsOnDarkBg(false)

    // console.log("y: " + y + ", fP: " + footerPosition + ", isBgDark: " + isOnDarkBg);
  }

  function resizeHandler() {
    const elem = document.getElementById("footerArea");
    if (elem) {
      const fY = elem.getBoundingClientRect().y
      setFooterPosition(fY);
      scrollHandler();
    }

  }

  useEffect(() => {
    const elem = document.getElementById("footerArea");
    const navElem = navRef.current

    if (elem && navElem && footerPosition == -1) {
      const fY = elem.getBoundingClientRect().y
      const navH = navElem.clientHeight;
      setFooterPosition(fY - navH);
    }

    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', resizeHandler);

    return () => {
        window.removeEventListener('resize', scrollHandler);
        window.removeEventListener('scroll', scrollHandler);
    };
    
  }, [footerPosition, isOnDarkBg])
    
  return (
    <div className={styles.navigationOuterContainer.concat(
        isOnDarkBg 
        ? ' bg-transparent'
        : ' bg-white'
    )} ref={navRef}>
      <div className={styles.navigationContainer}>
        <div className={styles.pathingContainer}>
          {currentPath.toString()}
        </div>
        
        <div className={styles.menuButtonWrapper}>
          <h1>{menuGlyph}</h1>
        </div>
      </div>
    </div>
  )
}