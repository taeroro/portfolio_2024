import { fetchWorkList, WorkListData } from "@/contentful/fetchWork";
import WorkOverview from "./workOverview";

const getData = async () => {
  const res: WorkListData | null = await fetchWorkList();
  return res;
}

export default async function WorkOverviewLayout() {
  const workListData: WorkListData | null = await getData();

  if (workListData)
    return <WorkOverview workListData={workListData} />
  
  return (
    <div>
      <p>Loading...</p>
    </div>
  )
}