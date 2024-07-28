'use client';

import { NavData, SocialData } from "@/contentful/fetchNav";
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
  const menuGlyph: string = navData.menuIcon

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
      'pt-2 mx-8 nav',
      'flex flex-row justify-between',
      'cursor-pointer group transition duration-300',
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
      'font-bold text-secondary h1-text',
      'transition-none origin-[50%_55%]',
      'select-none transition-colors duration-300',
      'group-hover:transition-all group-hover:duration-300 group-hover:rotate-90',
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

  /************** Menu Handler ***************/
  const menuHandler = () => {
    // if (!isMenuOpen) {
    //   setIsMenuOpen(true);
    //   document.body.style.overflow = 'hidden';
    // }
    // else {
    //   setIsMenuOpen(false);
    //   document.body.style.overflow = 'unset';
    // }
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

    return () => {
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
        onClick={menuHandler}
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
        
        <div className={styles.menuButtonWrapper
          .concat(
            isOnDarkBg ? styles.hoverOnDark : styles.hoverOnWhite
          ).concat(
            isMenuOpen ? styles.menuButtonWrapperOpen : ''
          )
        }>
          <h1>{menuGlyph}</h1>
        </div>
      </div>

      <div className={styles.menuContainer.concat(isMenuOpen ? styles.menuContainerOpen : '')}>
        <Menu menuLinks={navData.navigationLinks} socialLinks={navData.socialData} />
      </div>

    </div>
  )
}




/****************************************************/
/*                                                  */
/* Nav Menu Component                               */
/*                                                  */
/****************************************************/

function Menu({menuLinks, socialLinks}: {menuLinks: string[], socialLinks: SocialData[] | null }) {

  /************** Defining variables ***************/

  
  /************** Style classNames ***************/
  const styles = {
    outerContainer: [
      'h-full',
      'grid grid-cols-12 gap-8',
      'py-8 mx-8',
      'max-sm:mx-2 max-sm:pt-1',
    ].join(' '),
    menuLinksContainer: [
      'col-span-6',
      'flex flex-col justify-end items-start gap-4',
    ].join(' '),
    menuItem: [
      'font-display font-bold display-menu text-white',
      'transition duration-300 select-none',
      'hover:bg-highlight',
    ].join(' '),
    socialLinksContainer: [
      'col-span-6',
      'flex flex-row justify-end content-end flex-wrap gap-x-4 gap-y-2',
    ].join(' '),
    socialItem: [
      'font-bold title-text text-white',
    ].join(' '),
    link: [
      'no-underline border-solid border-white border-b-4',
      'transition duration-300',
      'hover:border-highlight hover:bg-highlight color-white',
      'max-sm:border-b-2',
    ].join(' '),
  }


  return (
    <div className={styles.outerContainer}>
      <div className={styles.menuLinksContainer}>
        {
          menuLinks &&
          menuLinks.map((e, i) => {
            return (
              <Link className={styles.menuItem} key={i} href={'/#'.concat(e.slice(1))}>
                {e.concat(' →')}
              </Link>
            )
          })
        }
      </div>

      <div className={styles.socialLinksContainer}>
        {
          socialLinks &&
          socialLinks.map((e, i) => {
            return (
              <div className={styles.socialItem} key={i}>
                <span>
                  { e.type.concat(": ") }
                </span>
                <a
                  className={styles.link}
                  href={e.link} target="_blank" rel="noopener noreferrer"
                >
                  { e.displayContent }
                </a>
            </div>
            )
          })
        }
      </div>
    </div>
  )

}