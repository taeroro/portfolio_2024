import { FullWorkData, PwdData, fetchWorkDetail, fetchPwd } from "@/contentful/fetchWorkDetail";
import Password from "@/app/components/password/password";
import WorkDetail from "./workDetail";
import { WorkListData, fetchWorkList } from "@/contentful/fetchWork";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers'


const getWorkData = async (slug: string) => {
  const res: FullWorkData | null = await fetchWorkDetail({slug: slug});
  return res;
}

const getPwdData = async () => {
  const res: PwdData | null = await fetchPwd();
  return res && res.pwd;
}

const getWorkList = async () => {
  const res: WorkListData | null = await fetchWorkList();
  return res && workListToSlug(res)
}

const getTitleList = async () => {
  const res: WorkListData | null = await fetchWorkList();
  return res && workListToTitle(res)
}

/************** Slug list ***************/
function workListToSlug(data: WorkListData): string[] {
  let res: string[] = []
  data.workData.forEach((e) => {
    res.push(e.slug)
  })
  return res
}

/************** Title list ***************/
function workListToTitle(data: WorkListData): string[] {
  let res: string[] = []
  data.workData.forEach((e) => {
    res.push(e.title)
  })
  return res
}



export default async function WorkDetailLayout({slug}: {slug: string}) {
  const workList: string[] | null = await getWorkList()
  const titleList: string[] | null = await getTitleList()
  const pwdData: string | null = await getPwdData()

  const cookiesStore = cookies();
  const loginCookies = cookiesStore.get(process.env.PASSWORD_COOKIE_NAME!);
  const isLoggedIn = !!loginCookies?.value;

  /************** Render Work Detail ***************/
  if (workList && workList.includes(slug)) {
    const fullWorkData: FullWorkData | null = await getWorkData(slug)

    const slugIndex = workList.indexOf(slug) + 1
    const nextSlug: string = workList[slugIndex] || workList[0]
    const nextTitle: string = titleList ? (titleList[slugIndex] || titleList[0]) : nextSlug
    
    if (fullWorkData) {
      /************** Check Pwd Credentials ***************/
      if (fullWorkData.isPasswordProtected && pwdData && !isLoggedIn) {
        // return <Password pwdData={pwdData} />
        return <Password />
      }

      return <WorkDetail fullWorkData={fullWorkData} nextSlug={nextSlug} nextTitle={nextTitle} />
    }
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