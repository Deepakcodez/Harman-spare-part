import Image from "next/image";
import Link from "next/link";
import { Rajdhani } from "next/font/google";

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400',"500","600","700"]
});
const Our_products = () => {
  return (
    <>
      <div className="mt-[4rem] text-black">
        <h1 className={`${rajdhani.className} font-[500]  text-4xl  px-4 text-black/75`}>Our Products</h1>
        <div className="py-[1rem] mt-9 sm:px-[3rem] w-full  grid md:grid-cols-3 grid-cols-1  sm:gap-4 gap-2 items-center place-items-center 	">
          <Link data-scroll data-scroll-speed="0.3" href={'/products'} className=" w-full  h-[10rem] md:border-r text-center  md:border-r-yellow-200/25 flex flex-col items-center justify-center">
            <div className="flex justify-center flex-col gap-2 items-center">
              <Image
                className="opacity-70 hover:opacity-90  transition ease-linear duration-300 "
                src={"/bike.png"}
                width={100}
                height={100}
                alt="bike"
              />
              <h1 className={`${rajdhani.className} text-black `}>Bike Accessories</h1>
            </div>
          </Link>

          <Link href={'/products'} className=" w-full h-[10rem] md:border-r text-center  md:border-r-yellow-200/25 flex flex-col items-center justify-center">
            <div className=" flex justify-center flex-col gap-2 items-center">
              <Image
                className="opacity-70 hover:opacity-90  transition ease-linear duration-300"
                src={"/car.png"}
                width={100}
                height={100}
                alt="car"
              />{" "}
              <h1 className={`${rajdhani.className} text-black `}>Car Accessories</h1>
            </div>
          </Link>

          <Link href={'/products'} className=" w-full  h-[10rem]  text-center  flex flex-col items-center justify-center">
            <div className=" flex justify-center flex-col gap-2 items-center">
              <Image
                className="opacity-70 hover:opacity-90  transition ease-linear duration-300"
                src={"/lighticon.png"}
                width={100}
                height={100}
                alt="car"
              />
              <h1 className={`${rajdhani.className} text-black `}>Light Accessories</h1>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Our_products;
