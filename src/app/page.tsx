import Image from "next/image";
import Hero from "./_Components/herosection/Hero/page";
import Navbar from "./_Components/herosection/Navbar/page";
import Stats from "./_Components/stats/page";
import VioletBloom from "./_Components/smallcomponents/light/Light";
import YellowBloom from "./_Components/smallcomponents/light/Light2";
import Best_Selling from "./_Components/bestSelling/BestSelling";
import Our_products from "./_Components/ourProducts/Ourprod";
import OurWork from "./_Components/ourWork/Our_work";
import BikeProd from "./_Components/bikeProd/BikeProd";

const Home: React.FC= ()=> {



  return (
    <>
      <div className=" relative h-full w-full bg-black overflow-hidden">
        <YellowBloom/>
        <Hero />
        <VioletBloom/>
        <Our_products/>
       <Best_Selling/>
       <BikeProd/>
       <Image
          className="absolute md:-bottom-[8rem] bottom-[8rem]  md:left-[10rem] opacity-45 "
          alt="light"
          src={"/pinklight.svg"}
          width={1000}
          height={1000}
          />
          <OurWork/>
          <Stats/>
          
      </div>
    </>
  );
}

export default Home;
