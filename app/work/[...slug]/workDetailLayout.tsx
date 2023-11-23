import { FullWorkData, fetchWorkDetail } from "@/contentful/fetchWorkDetail";

const getData = async (slug: string) => {
  const res: FullWorkData | null = await fetchWorkDetail({slug: slug});
  return res;
}

export default async function WorkDetailLayout({slug}: {slug: string}) {
  const fullWorkData: FullWorkData | null = await getData(slug);
  console.dir(fullWorkData, {depth: null});
  
  return (
    <div>
      {slug}
    </div>
  )
}
