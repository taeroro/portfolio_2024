'use client';

import { NavData, SocialData } from "@/contentful/fetchNav";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from "react"
/****************************************************/
/*                                                  */
/* Navigation Component                             */
/*                                                  */
/****************************************************/


export default function Navigation({navData} : {navData: NavData}) {

  /************** Defining variables ***************/
  const [footerPosition, setFooterPosition] = useState(-1)
  const [heroHeight, setHeroHeight] = useState(-1)
  const [hideNavOnHero, setHideNavOnHero] = useState(true)
  const [isOnDarkBg, setIsOnDarkBg] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const currentPath: string[] = [navData.name]
  const pathname = usePathname()
  // const activePath: string = "/"
  // const menuGlyph: string = navData.menuIcon
  const handImg: string = '/img/hand.png'
  const hoverHandImg: string = '/img/palm.png'

  const navRef = useRef<HTMLInputElement>(null)
  const handRef = useRef<HTMLImageElement>(null)
  
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
      'pt-2 mx-8 nav',
      'flex flex-row justify-between',
      'group transition duration-300',
      // 'cursor-pointer',
      'max-sm:mx-2 max-sm:pt-1',
      
      'border-b-[8px] border-secondary',
      'max-sm:border-b-[6px]',
    ].join(' '),
    hideNavBorder: [
      ' !border-0'
    ].join(' '),
    hideNavLogo: [
      ' opacity-0 pointer-events-none',
    ].join(' '),
    navigationContainerOpen: [
      ' !border-white'
    ].join(' '),

    pathingContainer: [
      'font-display font-bold text-secondary h1-display',
      'transition duration-300',
      'select-none',
    ].join(' '),
    pathContainerOpen: [
      ' !text-white !group-hover:text-white',
    ].join(' '),

    hoverOnDark: [
      ' group-hover:text-white hover:border-white',
    ].join(' '),
    hoverOnWhite: [
      ' group-hover:text-primary hover:border-primary',
    ].join(' '),

    menuButtonWrapper: [
      // 'font-bold text-secondary h1-text',
      // 'transition-none origin-[50%_55%]',
      // 'select-none transition-colors duration-300',
      // 'group-hover:transition-all group-hover:duration-300 group-hover:rotate-90',
      'flex flex-row items-center',
    ].join(' '),
    handImageContainer: [
      'relative group/hand',
      'w-12 h-12',
      'max-sm:w-8 max-sm:h-8',
    ].join(' '),
    handImage: [
      'block absolute opacity-100',
      'w-12 h-12',
      'select-none cursor-pointer',
      'max-sm:w-8 max-sm:h-8',
      'group-hover/hand:opacity-0',
    ].join(' '),
    palmImage: [
      'block absolute opacity-0',
      'w-12 h-12',
      'select-none cursor-pointer',
      'max-sm:w-8 max-sm:h-8',
      'group-hover/hand:opacity-100',
    ].join(' '),
  }

  /************** Check Element Renders ***************/
  const renderCheck = () => {
    const hero = document.getElementById("hpHero");
    const footer = document.getElementById("footerArea");
    const navElem = navRef.current
    const { scrollY } = window;    

    const navHeight = navElem!.clientHeight;
    setHeroHeight(hero ? hero.getBoundingClientRect().height : -1);
    setFooterPosition(footer ? pathname == "/" ?
        footer.getBoundingClientRect().y + scrollY - navHeight
        : footer.getBoundingClientRect().y + scrollY
      : -1
    );
    setHideNavOnHero(
      hero ? 
        scrollY < hero.getBoundingClientRect().height ? true : false
      : false
    )
  }

  /************** Scroll Handler ***************/
  const scrollHandler = () => {
    const { scrollY } = window;

    setIsOnDarkBg(
      scrollY < heroHeight ? true :
      scrollY >= heroHeight && scrollY < footerPosition ? false :
      scrollY >= footerPosition ? true : false
    )
  }

  /************** Resize Handler ***************/
  const resizeHandler = () => {
    renderCheck();
  }

  /************** Mouse Handler ***************/
  const mouseHandler = (e: MouseEvent) => {
    if (!handRef.current) return;

    var handRect = handRef.current.getBoundingClientRect();

    var dx = e.clientX - (handRect.x + handRect.width / 2);
    var dy = e.clientY - (handRect.y + handRect.height / 2);

    var theta = Math.atan2(dy, dx)
    var angle = theta * (180 / Math.PI) + 180;

    handRef.current.style.transform = `rotate(${angle}deg)`    
  }

  /************** Link onClick Handler ***************/
  const linkClickHandler = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  //   if (isMenuOpen) 
  //     menuHandler()
  }

  /************** useEffect Function ***************/
  useEffect(() => {
    if (pathname !== '/') setIsOnDarkBg(false)

    renderCheck();

    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', resizeHandler);
    window.addEventListener('mousemove', mouseHandler);

    return () => {
      window.removeEventListener('mousemove', mouseHandler);
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('scroll', scrollHandler);
    };
    
  }, [heroHeight, footerPosition, isOnDarkBg, isMenuOpen, hideNavOnHero])
    



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
        styles.navigationContainer
          .concat(
            isMenuOpen ? styles.navigationContainerOpen : ''
          ).concat(
            hideNavOnHero && !isMenuOpen ? styles.hideNavBorder : ''
          ).concat(
            isOnDarkBg ? styles.hoverOnDark : styles.hoverOnWhite
          )
        } 
        // onClick={menuHandler}
      >
        <div className={styles.pathingContainer
          .concat(
            isMenuOpen ? styles.pathContainerOpen : ''
          ).concat(
            hideNavOnHero && !isMenuOpen ? styles.hideNavLogo : ''
          ).concat(
            isOnDarkBg ? styles.hoverOnDark : styles.hoverOnWhite
          )
        }>
          <Link href="/" legacyBehavior>
            <a onClick={linkClickHandler}>
              {currentPath.toString()}
            </a>
          </Link>
        </div>
        
        <div className={styles.menuButtonWrapper}>
          <div className={styles.handImageContainer} ref={handRef}>
            <Image
              className={styles.handImage}
              src={handImg}
              width={128}
              height={128}
              priority
              alt={"god mode"}
            />
            <Image
              className={styles.palmImage}
              src={hoverHandImg}
              width={128}
              height={128}
              priority
              alt={"god mode"}
            />
          </div>
        </div>

      </div>

    </div>
  )
}


