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

function workListToSlug(data: WorkListData): string[] {
  let res: string[] = []
  
  data.workData.forEach((e) => {
    res.push(e.slug)
  })

  return res
}

export default async function WorkDetailLayout({slug}: {slug: string}) {
  const workList: string[] | null = await getWorkList()

  if (workList && workList.includes(slug)) {
    const fullWorkData: FullWorkData | null = await getWorkData(slug)
    const isPasswordProtected: boolean = fullWorkData?.isPasswordProtected!
    // let checksum: PwdData | null = null;
  
    // if (isPasswordProtected) {
    //   checksum = await getPwdData()
    //   // console.log(checksum?.pwd);
    // }
  
    if (fullWorkData)
      return <WorkDetail fullWorkData={fullWorkData} />
  }

  if (workList && !workList.includes(slug)) {
    redirect('/404')
  }

  return (
    <div>
      <p>Loading...</p>
    </div>
  )
}