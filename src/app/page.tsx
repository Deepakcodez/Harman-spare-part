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
import { FooterSection } from "./_Components/footer/Footer";
import CarProd from "./_Components/CarProduct/page";

const Home: React.FC = () => {



  return (
    <>
      <div className=" relative h-full w-full bg-white overflow-hidden">
        <Hero />
        {/* <VioletBloom /> */}
        <Our_products />
        <Best_Selling />
        <Image
          className="absolute md:-bottom-[8rem] bottom-[8rem]  md:left-[10rem] opacity-45 "
          alt="light"
          src={"/pinklight.svg"}
          width={1000}
          height={1000}
        />
        <BikeProd />
        {/* <Image
          className="absolute md:-bottom-[8rem] bottom-[8rem]  md:left-[10rem] opacity-45 "
          alt="light"
          src={"/pinklight.svg"}
          width={1000}
          height={1000}
        /> */}
        <CarProd />
        <OurWork />
        <Stats />
        <FooterSection />

      </div>
    </>
  );
}

export default Home;
