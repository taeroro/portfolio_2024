import { FullWorkData, PwdData, fetchWorkDetail, fetchPwd } from "@/contentful/fetchWorkDetail";
import WorkDetail from "./workDetail";
import { WorkListData, fetchWorkList } from "@/contentful/fetchWork";
import { redirect } from "next/navigation";

const getWorkData = async (slug: string) => {
  const res: FullWorkData | null = await fetchWorkDetail({slug: slug});
  return res;
}

const getPwdData = async () => {
  const res: PwdData | null = await fetchPwd();
  return res;
}

const getWorkList = async () => {
  const res: WorkListData | null = await fetchWorkList();
  return res && workListToSlug(res)
}

/************** Slug list ***************/
function workListToSlug(data: WorkListData): string[] {
  let res: string[] = []
  data.workData.forEach((e) => {
    res.push(e.slug)
  })
  return res
}

export default async function WorkDetailLayout({slug}: {slug: string}) {
  const workList: string[] | null = await getWorkList()

  /************** Render Work Detail ***************/
  if (workList && workList.includes(slug)) {
    const fullWorkData: FullWorkData | null = await getWorkData(slug)

    const slugIndex = workList.indexOf(slug) + 1
    const nextSlug: string = workList[slugIndex] || workList[0]

    return <WorkDetail fullWorkData={fullWorkData} nextSlug={nextSlug} />
  }

  /************** Capture 404 ***************/
  if (workList && !workList.includes(slug)) {
    redirect('/404')
  }

  /************** When Data is null ***************/
  return (
    <div>
      <p>Loading...</p>
    </div>
  )
}