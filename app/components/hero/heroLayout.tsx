import { fetchHero, HeroData } from "@/contentful/fetchHero";
import Hero from "./hero";

const getData = async () => {
  const res: HeroData | null = await fetchHero();
  return res;
}

export default async function HeroLayout() {
  const heroData: HeroData | null = await getData();

  if (heroData)
    return <Hero heroData={heroData} />
  
  return (
    <div>
      <p>Loading...</p>
    </div>
  )
}