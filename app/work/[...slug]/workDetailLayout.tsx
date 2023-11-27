import { FullWorkData, PwdData, fetchWorkDetail, fetchPwd } from "@/contentful/fetchWorkDetail";
import WorkDetail from "./workDetail";

const getWorkData = async (slug: string) => {
  const res: FullWorkData | null = await fetchWorkDetail({slug: slug});
  return res;
}

const getPwdData = async () => {
  const res: PwdData | null = await fetchPwd();
  return res;
}


export default async function WorkDetailLayout({slug}: {slug: string}) {
  const fullWorkData: FullWorkData | null = await getWorkData(slug)
  const isPasswordProtected: boolean = fullWorkData?.isPasswordProtected!
  let checksum: PwdData | null = null;

  if (isPasswordProtected) {
    checksum = await getPwdData()
    // console.log(checksum?.pwd);
  }
  
  // console.dir(fullWorkData, {depth: null});

  // if (isPasswordProtected) {
  //   return (
  //     <div>
  //       PASSWORD PROTECTED
  //     </div>
  //   )
  // }

  if (fullWorkData)
    return <WorkDetail fullWorkData={fullWorkData} />

  return (
    <div>
      <p>Loading...</p>
    </div>
  )
}