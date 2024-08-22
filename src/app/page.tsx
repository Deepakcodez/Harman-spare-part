
import {  lazy, Suspense} from 'react'
import { BIkeSkelton } from "./_Components/Shared/bikesectionSkelton/BIkeSkelton";
import Hero from './_Components/herosection/Hero/page';
const Our_products = lazy(()=> import ("./_Components/ourProducts/Ourprod"))
const BikeProd = lazy(()=> import ("./_Components/bikeProd/BikeProd"))
const CarProd = lazy(()=> import ("./_Components/CarProduct/page"))
const Map = lazy(()=> import ("./_Components/map/Map"))
const Stats = lazy(()=> import ("./_Components/stats/page"))


const Home: React.FC = () => {



  return (
    <>
    <Suspense fallback={<><h1>Loading</h1></>}>

    
      <div className=" relative h-full w-full  overflow-hidden backgroundColor  ">
      
        <Hero />
       

        <Suspense fallback={<BIkeSkelton/>}>
        <Our_products />
        </Suspense>

        <Suspense fallback={<BIkeSkelton/>}>
        <BikeProd />
        </Suspense>

        <Suspense fallback={<BIkeSkelton/>}>
        <CarProd />
        </Suspense>

        

        <Suspense fallback={null}>
        <Stats />
        </Suspense>

        <Suspense fallback={null}>
        <Map/>
        </Suspense>

      </div>
      </Suspense>
    </>
  );
}

export default Home;
