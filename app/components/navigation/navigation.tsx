/****************************************************/
/*                                                  */
/* Navigation Component                             */
/*                                                  */
/****************************************************/

export default function Navigation() {

  /************** Defining variables ***************/
  const currentPath: string[] = ["ryan.fan"]
  const activePath: string = "/work"
  const menuGlyph: string = "+"
  
  /************** Style classNames ***************/
  const styles = {
    navigationOuterContainer: [
      'fixed top-0 left-0 z-50',
      'w-full bg-white',
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
    
  return (
    <div className={styles.navigationOuterContainer}>
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