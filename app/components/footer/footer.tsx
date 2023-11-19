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
  const title: string = "ryan.fan"
  const copyright: string = "© Ryan Fan " + new Date().getFullYear()
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
    h1: [
      'font-display font-bold text-white display-name',
      'select-none pointer-events-none',
    ].join(' '),
  }

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

      <h1 className={styles.h1}>
        {title}
      </h1>
    </div>
  )
}