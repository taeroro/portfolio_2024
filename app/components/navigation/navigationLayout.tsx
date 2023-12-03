import { fetchNav, NavData, SocialData } from "@/contentful/fetchNav";
import Navigation from "./navigation";

const getData = async () => {
  const res: NavData | null = await fetchNav();
  return res;
}

export default async function NavigationLayout() {
  const navData: NavData | null = await getData();

  if (navData)
    return <Navigation navData={navData} />
  
  return (
    <div>
      <p>Loading...</p>
    </div>
  )
}