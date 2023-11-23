import { TypeWorkSkeleton, TypeWorkDetailSkeleton, TypeWorkDetailContentSkeleton } from './types'
import { Entry } from 'contentful'
import contentfulClient from './contentfulClient'
import { parseImage, ImageData } from './parseImage'


/************** Defining Entry ***************/

type FullWorkEntry = Entry<TypeWorkSkeleton, undefined, string>
type WorkDetailEntry = Entry<TypeWorkDetailSkeleton, undefined, string>
type WorkDetailContentEntry = Entry<TypeWorkDetailContentSkeleton, undefined, string>


/************** Defining Content Interface ***************/

export interface WorkDetailContent {
  title?: string,
  subtitle?: string,
  body?: string,
  bottomMargin: boolean,
  // workMedia: WorkMedia
}

export interface WorkDetailData {
  fullDescription: string,
  role: string[],
  category: string[],
  agency?: string[],
  collaborator?: string[],
  deliverable: string[],
  projectLink: string,
  // workDetailContent: WorkDetailContent
}

export interface FullWorkData {
  slug: string,
  isPasswordProtected: boolean,
  title: string,
  overview: string,
  thumbnail: ImageData,
  workDetailData: WorkDetailData
}


/************** Parse Content ***************/

export function parseContentfulWorkDetail(workDetailEntry?: WorkDetailEntry): WorkDetailData {
  const res: any = workDetailEntry!.fields
  return ({
    fullDescription: res.fullDescription,
    role: res.role.join(', '),
    category: res.category.join(', '),
    agency: res.agency ? res.agency.join(', ') : res.agency,
    collaborator: res.collaborator ? res.collaborator.join(', ') : res.collaborator,
    deliverable: res.deliverable.join(', '),
    projectLink: res.projectLink,
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