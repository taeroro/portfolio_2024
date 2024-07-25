// import { fetchArchiveList, ArchiveListData } from "@/contentful/fetchArchive";
import Who from "./who";

// const getData = async () => {
//   const res: WhoData | null = await fetchArchiveList();
//   return res;
// }

export default async function WhoLayout() {
  // const WhoData: WhoData | null = await getData();

  // if (whoData)
    return <Who />
  
  return (
    <div>
      <p>Loading...</p>
    </div>
  )
}