import Image from "next/image";
import Hero from "./_Components/herosection/Hero/page";
import Navbar from "./_Components/herosection/Navbar/page";
import Stats from "./_Components/stats/page";
import VioletBloom from "./_Components/smallcomponents/light/Light";
import YellowBloom from "./_Components/smallcomponents/light/Light2";

export default function Home() {
  return (
    <>
      <div className=" relative h-full w-full bg-black overflow-hidden">
        <YellowBloom/>
        <Hero />
        <VioletBloom/>
       <Stats/>
        
      </div>
    </>
  );
}
