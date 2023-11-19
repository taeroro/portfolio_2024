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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const currentPath: string[] = ["ryan.fan"]
  const activePath: string = "/"
  const menuGlyph: string = "+"

  const navRef = useRef<HTMLInputElement>(null)
  
  /************** Style classNames ***************/
  const styles = {
    navigationOuterContainer: [
      'fixed top-0 left-0 z-50',
      'w-full flex flex-col',
    ].join(' '),
    navigationOuterContainerOpen: [
      ' !bg-primary h-svh-screen',
    ].join(' '),
    navigationContainer: [
      'pt-4 mx-8 nav border-b-[10px] border-secondary',
      'flex flex-row justify-between',
      'cursor-pointer group transition duration-300 hover:border-primary',
      'max-sm:mx-2 max-sm:pt-1 max-sm:border-b-[6px]',
    ].join(' '),
    navigationContainerOpen: [
      ' !border-white'
    ].join(' '),
    pathingContainer: [
      'font-display font-bold text-secondary h1-display',
      'transition duration-300',
      'select-none',
      'group-hover:text-primary',
    ].join(' '),
    pathContainerOpen: [
      ' !text-white !group-hover:text-white',
    ].join(' '),
    menuButtonWrapper: [
      'font-bold text-secondary h1-text',
      'transition duration-300 origin-[50%_55%]',
      'select-none',
      'group-hover:text-primary group-hover:rotate-90',
    ].join(' '),
    menuButtonWrapperOpen: [
      ' !text-white !group-hover:text-white',
      '!rotate-45 !group-hover:rotate-135',
    ].join(' '),
    menuContainer: [
      'w-full h-0 invisible',
      'transition duration-300',
    ].join(' '),
    menuContainerOpen: [
      ' !h-full !visible',
    ].join(' '),
  }

  /************** Scroll Handler ***************/
  function scrollHandler() {
    let y: number = window.scrollY;

    if (footerPosition >= 0 && y >= footerPosition)
      setIsOnDarkBg(true)
    else 
      setIsOnDarkBg(false)

    console.log("y: " + y + ", fP: " + footerPosition + ", isBgDark: " + isOnDarkBg);
  }

  /************** Resize Handler ***************/
  function resizeHandler() {
    const elem = document.getElementById("footerArea");
    if (elem) {
      const fY = elem.getBoundingClientRect().y
      setFooterPosition(fY);
      scrollHandler();
    }
  }

  /************** Menu Handler ***************/
  function menuHandler() {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      document.body.style.overflow = 'hidden';
    }
    else {
      setIsMenuOpen(false);
      document.body.style.overflow = 'unset';
    }

    console.log(isMenuOpen);
    
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
    
  }, [footerPosition, isOnDarkBg, isMenuOpen])
    
  return (
    <div className={styles.navigationOuterContainer.concat(
        (isOnDarkBg
        ? ' bg-transparent'
        : ' bg-white').concat(
          isMenuOpen
          ? styles.navigationOuterContainerOpen
          : ''
        )
    )} ref={navRef}>
      <div className={
        styles.navigationContainer.concat(isMenuOpen ? styles.navigationContainerOpen : '')} 
        onClick={menuHandler}
      >
        <div className={styles.pathingContainer.concat(isMenuOpen ? styles.pathContainerOpen : '')}>
          {currentPath.toString()}
        </div>
        
        <div className={styles.menuButtonWrapper.concat(isMenuOpen ? styles.menuButtonWrapperOpen : '')}>
          <h1>{menuGlyph}</h1>
        </div>
      </div>

      <div className={styles.menuContainer.concat(isMenuOpen ? styles.menuContainerOpen : '')}>

      </div>

    </div>
  )
}