import Image from "next/image";
import Hero from "./_Components/herosection/Hero/page";
import Stats from "./_Components/stats/page";
import Our_products from "./_Components/ourProducts/Ourprod";
import OurWork from "./_Components/ourWork/Our_work";
import BikeProd from "./_Components/bikeProd/BikeProd";
import CarProd from "./_Components/CarProduct/page";
import Map from "./_Components/map/Map";
import { Footer } from "./_Components/footer/Footer";

const Home: React.FC = () => {



  return (
    <>
      <div className=" relative h-full w-full  overflow-hidden">
        <Hero />
        <Our_products />
        <Image
          className="absolute md:-bottom-[8rem] bottom-[8rem]  md:left-[10rem] opacity-45 "
          alt="light"
          src={"/pinklight.svg"}
          width={1000}
          height={1000}
        />
        <BikeProd />
       
        <CarProd />
        <OurWork />
        <Stats />
        <Map/>
      </div>
    </>
  );
}

export default Home;
