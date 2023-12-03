import { TypeNavigationSkeleton, TypeSocialSkeleton } from './types'
import { Entry } from 'contentful'
import contentfulClient from './contentfulClient'

/************** Defining Entry ***************/
type NavEntry = Entry<TypeNavigationSkeleton, undefined, string>
type SocialEntry = Entry<TypeSocialSkeleton, undefined, string>


/************** Defining Content Interface ***************/
export interface SocialData {
  type: string,
  displayContent: string,
  link: string
}

export interface NavData {
  name: string,
  menuIcon: string,
  navigationLinks: string[],
  socialData: SocialData[] | null
}


/************** Parse Content ***************/
export function parseContentfulSocialData(socialEntry?: SocialEntry[]) {
  if (!socialEntry) {
		return null
	}

  const parsedData: SocialData[] = socialEntry.map((item: any) => {
    return {
      type: item.fields.type,
      displayContent: item.fields.displayContent,
      link: item.fields.link,
    }
  })

  return parsedData;
}


export function parseContentfulNavData(navEntry?: NavEntry) {
  if (!navEntry) {
		return null
	}
  
  const resFiled = navEntry.fields

  return {
    name: resFiled.name,
    menuIcon: resFiled.menuIcon,
    navigationLinks: resFiled.navigationLinks,
    socialData: resFiled.socialData && parseContentfulSocialData(resFiled.socialData as SocialEntry[])
  }
}


/************** Fetch Content from CMS ***************/

export async function fetchNav(): Promise<NavData | null> {
	const contentful = contentfulClient({ preview: false })

	const res = await contentful.getEntries<TypeNavigationSkeleton>({
		content_type: 'navigation',
		include: 2,
	})

  // console.log(res.items[0]);
  

	return parseContentfulNavData(res.items[0])
}