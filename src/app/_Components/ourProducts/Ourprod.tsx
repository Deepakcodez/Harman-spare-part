import Image from "next/image";
import Link from "next/link";

const Our_products = () => {
  return (
    <>
      <div className="mt-[3rem]">
        <h1 className="text-3xl font-semibold px-4">Our Products</h1>
        <div className="py-[1rem] mt-9 sm:px-[3rem] w-full bg-black grid md:grid-cols-3 grid-cols-1  sm:gap-4 gap-2 items-center place-items-center 	">
          <Link href={'#'} className=" w-full  h-[10rem] md:border-r text-center  md:border-r-yellow-200 flex flex-col items-center justify-center">
            <div className="flex justify-center flex-col items-center">
              <Image
                className="opacity-30 hover:opacity-50  transition ease-linear duration-300 "
                src={"/bike.png"}
                width={100}
                height={100}
                alt="bike"
              />
              <h1 className="text-white font-thin">Bike Accessories</h1>
            </div>
          </Link>

          <Link href={'#'} className=" w-full h-[10rem] md:border-r text-center  md:border-r-yellow-200 flex flex-col items-center justify-center">
            <div className=" flex justify-center flex-col items-center">
              <Image
                className="opacity-30 hover:opacity-50  transition ease-linear duration-300"
                src={"/car.png"}
                width={100}
                height={100}
                alt="car"
              />{" "}
              <h1 className="text-white font-thin">Car Accessories</h1>
            </div>
          </Link>

          <Link href={'#'} className=" w-full  h-[10rem]  text-center  flex flex-col items-center justify-center">
            <div className=" flex justify-center flex-col items-center">
              <Image
                className="opacity-30 hover:opacity-50  transition ease-linear duration-300"
                src={"/lighticon.png"}
                width={100}
                height={100}
                alt="car"
              />
              <h1 className="text-white font-thin">Light Accessories</h1>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Our_products;
