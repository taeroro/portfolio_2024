import { TypeWorkSkeleton, TypeWorkDetailSkeleton, TypeWorkDetailContentSkeleton, TypeWorkDetailContentMediaSkeleton, TypeContentPwdSkeleton } from './types'
import { Entry } from 'contentful'
import contentfulClient from './contentfulClient'
import { parseImage, ImageData } from './parseImage'


/************** Defining Entry ***************/

type FullWorkEntry = Entry<TypeWorkSkeleton, undefined, string>
type WorkDetailEntry = Entry<TypeWorkDetailSkeleton, undefined, string>
type WorkDetailContentEntry = Entry<TypeWorkDetailContentSkeleton, undefined, string>
type WorkDetailContentMediaEntry = Entry<TypeWorkDetailContentMediaSkeleton, undefined, string>


/************** Defining Content Interface ***************/

export interface WorkDetailContentMediaData {
  mediaType: string,
  size: string,
  image?: ImageData,
  secondImage?: ImageData,
  videoLink: string,
  showOutline: boolean
}

export interface WorkDetailContent {
  title?: string,
  subtitle?: string,
  body?: string,
  bottomMargin: boolean,
  workMedia: WorkDetailContentMediaData
}

export interface WorkDetailData {
  fullDescription: string,
  role: string,
  category: string,
  agency?: string,
  collaborator?: string,
  deliverable: string,
  projectLink: string,
  workDetailContent: WorkDetailContent[]
}

export interface FullWorkData {
  slug: string,
  isPasswordProtected: boolean,
  title: string,
  overview: string,
  thumbnail: ImageData,
  workDetailData: WorkDetailData
}

export interface PwdData {
	pwd: string
}


/************** Parse Content ***************/

export function parseContentfulWorkDetailContentMedia(workDetailContentMediaEntry?: WorkDetailContentMediaEntry): WorkDetailContentMediaData {
  const res: any = workDetailContentMediaEntry!.fields  

  return ({
    mediaType: res.mediaType,
    size: res.size,
    image: res.image && parseImage(res.image.fields.file),
    secondImage: res.secondImage && parseImage(res.secondImage.fields.file),
    videoLink: res.videoLink,
    showOutline: res.showOutline
  })
}

export function parseContentfulWorkDetailContent(workDetailContentEntry?: WorkDetailContentEntry[]): WorkDetailContent[] {
  const parsedListData: WorkDetailContent[] = workDetailContentEntry!.map((item: any) => {
    return ({
      title: item.fields.title,
      subtitle: item.fields.subtitle,
      body: item.fields.body,
      bottomMargin: item.fields.bottomMargin,
      workMedia: item.fields.workMedia && parseContentfulWorkDetailContentMedia(item.fields.workMedia)
    })
  })
  
  return parsedListData;
}

export function parseContentfulWorkDetail(workDetailEntry?: WorkDetailEntry): WorkDetailData {
  const res: any = workDetailEntry!.fields
  return ({
    fullDescription: res.fullDescription,
    role: res.role.join('\n'),
    category: res.category.join('\n'),
    agency: res.agency && res.agency.join('\n'),
    collaborator: res.collaborator && res.collaborator.join('\n'),
    deliverable: res.deliverable.join('\n'),
    projectLink: res.projectLink,
    workDetailContent: parseContentfulWorkDetailContent(res.workDetailContent)
  })
}

export function parseContentfulFullWork(fullWorkEntry?: FullWorkEntry): FullWorkData | null {
	if (!fullWorkEntry) {
		return null
	}
  
  const res: any = fullWorkEntry.fields
  return ({
    slug: res.slug,
    isPasswordProtected: res.isPasswordProtected,
    title: res.title,
    overview: res.overview,
    thumbnail: parseImage(res.thumbnail.fields.file),
    workDetailData: parseContentfulWorkDetail(res.workDetailData)
  })
}


/************** Fetch Content from CMS ***************/

export async function fetchWorkDetail({slug}: {slug: string}): Promise<FullWorkData | null> {
	const contentful = contentfulClient({ preview: false })

	const res = await contentful.getEntries<TypeWorkSkeleton>({
		content_type: 'work',
    'fields.slug': slug,
		include: 3,
	})  


	return parseContentfulFullWork(res.items[0])
}


/************** Fetch PWD ***************/

export async function fetchPwd(): Promise<PwdData | null> {
  const contentful = contentfulClient({ preview: false })

	const res = await contentful.getEntries<TypeContentPwdSkeleton>({
		content_type: 'contentPwd',
		include: 2,
	})

	return res.items[0].fields
}