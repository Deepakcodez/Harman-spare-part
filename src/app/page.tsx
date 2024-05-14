import Image from "next/image";
import Hero from "./_Components/herosection/Hero/page";
import Navbar from "./_Components/herosection/Navbar/page";
import Stats from "./_Components/stats/page";
import VioletBloom from "./_Components/smallcomponents/light/Light";
import YellowBloom from "./_Components/smallcomponents/light/Light2";
import Best_Selling from "./_Components/bestSelling/BestSelling";

export default function Home() {
  return (
    <>
      <div className=" relative h-full w-full bg-black overflow-hidden">
        <YellowBloom/>
        <Hero />
        <VioletBloom/>
       <Stats/>
       <Best_Selling/>
       <Image
          className="absolute md:-bottom-[8rem] bottom-[8rem]  md:left-[10rem] opacity-45 "
            alt="light"
            src={"/pinklight.svg"}
            width={1000}
            height={1000}
          />
        
      </div>
    </>
  );
}
