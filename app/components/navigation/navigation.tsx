/****************************************************/
/*                                                  */
/* Navigation Component                             */
/*                                                  */
/****************************************************/

export default function Navigation() {
  /************** Defining variables ***************/
  const currentPath: String[] = ["ryan.fan"]
  const activePath: String = "/work"
  const menuGlyph: String = "+"
  
  /************** Style classNames ***************/
  const styles = {
    navigationContainer: [
      'fixed top-0 left-0 z-50',
      'pt-4 mx-8',
      'flex flex-row justify-between',
      'bg-white nav',
    ].join(' '),
    pathingContainer: [
      'font-display font-bold text-secondary h1-display',
    ].join(' '),
    menuButtonWrapper: [
      'font-bold text-secondary h1-text',
    ].join(' '),
  }
    
  return (
    <div className={styles.navigationContainer}>
      <div className={styles.pathingContainer}>
        {currentPath.toString()}
      </div>
      
      <div className={styles.menuButtonWrapper}>
        <h1>{menuGlyph}</h1>
      </div>
    </div>
  )
}