import { fetchArchiveList, ArchiveListData } from "@/contentful/fetchArchive";
import Archive from "./archive";

const getData = async () => {
  const res: ArchiveListData | null = await fetchArchiveList();
  return res;
}

export default async function ArchiveLayout() {
  const archiveListData: ArchiveListData | null = await getData();

  if (archiveListData)
    return <Archive archiveListData={archiveListData} />
  
  return (
    <div>
      <p>Loading...</p>
    </div>
  )
}