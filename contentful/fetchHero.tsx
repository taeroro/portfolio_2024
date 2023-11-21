import { TypeHeroSkeleton } from './types'
import { Entry } from 'contentful'
import contentfulClient from './contentfulClient'

type HeroEntry = Entry<TypeHeroSkeleton, undefined, string>

export interface HeroData {
	name: string
	description: string
}

export function parseContentfulHero(heroEntry?: HeroEntry): HeroData | null {
	if (!heroEntry) {
		return null
	}

	return {
		name: heroEntry.fields.name,
		description: heroEntry.fields.description,
	}
}

export async function fetchHero(): Promise<HeroData | null> {
	const contentful = contentfulClient({ preview: false })

	const heroResult = await contentful.getEntries<TypeHeroSkeleton>({
		content_type: 'hero',
		include: 2,
	})

	return parseContentfulHero(heroResult.items[0])
}