import { fetchWorkList, WorkListData } from "@/contentful/fetchWork";
import { MetadataRoute } from "next";

const getWorkList = async () => {
  const res: WorkListData | null = await fetchWorkList();
  return res && workListToSlug(res)
}

function workListToSlug(data: WorkListData): string[] {
  let res: string[] = []
  data.workData.forEach((e) => {
    res.push(e.slug)
  })
  return res
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultPages = [
    {
      url: `https://${process.env.VERCEL_URL}`,
      lastModified: new Date(),
      priority: 1
    },
  ];

  const workSlugs: string[] = await getWorkList() || []
 
  const sitemap = [
    ...defaultPages,
    ...workSlugs.map((e: any) => ({
      url: `https://${process.env.VERCEL_URL}/work/${e}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    }))
  ];

  return sitemap;
}