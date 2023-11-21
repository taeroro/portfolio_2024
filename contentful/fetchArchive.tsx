import { TypeArchiveListSkeleton } from './types'
import { Entry } from 'contentful'
import contentfulClient from './contentfulClient'

type ArchiveListEntry = Entry<TypeArchiveListSkeleton, undefined, string>

export interface ArchiveListData {
	sectionTitle: string,
	archiveData: ArchiveData[]
}

export interface ArchiveData {
  client: string,
  project: string,
  category: string[],
  isComingSoon: boolean
}

export function parseContentfulArchiveList(archiveListEntry?: ArchiveListEntry): ArchiveListData | null {
	if (!archiveListEntry) {
		return null
	}

  const resArchiveData = archiveListEntry.fields.archiveData;
  const parsedListData: ArchiveData[] = resArchiveData.map((item: any) => {
    return ({
      client: item.fields.client,
      project: item.fields.project,
      category: item.fields.category,
      isComingSoon: item.fields.isComingSoon,
    })
  })

	return {
		sectionTitle: archiveListEntry.fields.sectionTitle,
		archiveData: parsedListData,
	}
}

export async function fetchArchiveList(): Promise<ArchiveListData | null> {
	const contentful = contentfulClient({ preview: false })

	const archiveListResult = await contentful.getEntries<TypeArchiveListSkeleton>({
		content_type: 'archiveList',
		include: 2,
	})

	return parseContentfulArchiveList(archiveListResult.items[0])
}