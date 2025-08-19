import 'server-only'
import { createClient } from 'contentful'

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN
const CONTENTFUL_PREVIEW_ACCESS_TOKEN = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN

function assertEnv(name: string, value: string | undefined): string {
	if (!value) {
		throw new Error(`Missing required env var: ${name}`)
	}
	return value
}

// This is the standard Contentful client. It fetches
// content that has been published.
const client = createClient({
	space: assertEnv('CONTENTFUL_SPACE_ID', CONTENTFUL_SPACE_ID),
	accessToken: assertEnv('CONTENTFUL_ACCESS_TOKEN', CONTENTFUL_ACCESS_TOKEN),
})

// This is a Contentful client that's been configured
// to fetch drafts and unpublished content.
const previewClient = createClient({
	space: assertEnv('CONTENTFUL_SPACE_ID', CONTENTFUL_SPACE_ID),
	accessToken: assertEnv('CONTENTFUL_PREVIEW_ACCESS_TOKEN', CONTENTFUL_PREVIEW_ACCESS_TOKEN),
	host: 'preview.contentful.com',
})

// This little helper will let us switch between the two
// clients easily:
export default function contentfulClient({ preview = false }) {
	if (preview) {
		return previewClient
	}

	return client
}
