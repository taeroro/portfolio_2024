import { fetchHero, Hero } from "@/contentful/fetchHero";
import HeroUI from "./heroUI";

const getData = async () => {
  const res: Hero | null = await fetchHero();
  return res;
}

export default async function HeroLayout() {
  const heroData: Hero | null = await getData();

  if (heroData)
    return <HeroUI heroData={heroData} />
  
  return (
    <div>
      <p>Loading...</p>
    </div>
  )
}