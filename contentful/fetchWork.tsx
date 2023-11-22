import { TypeWorkListSkeleton } from './types'
import { Entry } from 'contentful'
import contentfulClient from './contentfulClient'
import { parseImage, ImageData } from './parseImage'

type WorkListEntry = Entry<TypeWorkListSkeleton, undefined, string>

export interface WorkListData {
	sectionTitle: string,
	workData: WorkData[]
}

export interface WorkData {
  slug: string,
  title: string,
  overview: string,
  thumbnail: ImageData
}

export function parseContentfulWorkList(workListEntry?: WorkListEntry): WorkListData | null {
	if (!workListEntry) {
		return null
	}
  
  const resWorkData = workListEntry.fields.workData;
  const parsedListData: WorkData[] = resWorkData.map((item: any) => {
    return ({
      slug: item.fields.slug,
      title: item.fields.title,
      overview: item.fields.overview,
      thumbnail: parseImage(item.fields.thumbnail.fields.file),
    })
  })

	return {
		sectionTitle: workListEntry.fields.sectionTitle,
		workData: parsedListData,
	}
}

export async function fetchWorkList(): Promise<WorkListData | null> {
	const contentful = contentfulClient({ preview: false })

	const archiveListResult = await contentful.getEntries<TypeWorkListSkeleton>({
		content_type: 'workList',
		include: 2,
	})

	return parseContentfulWorkList(archiveListResult.items[0])
}