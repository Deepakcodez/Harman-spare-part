"use client";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { ShoppingCart } from "lucide-react";


const BikeProd = () => {
    const [isHovered, setIsHovered] = useState(false);
    const dummyElement = [1,2,3,4]
    return ( 
        <>
           <div className="relative z-20 w-full px-4 py-5 mt-5 ">
        <div className="  flex justify-between flex-wrap gap-2">
          <div className="w-full flex flex-col md:flex-row  justify-between">

          <h1 className="text-3xl font-thin ">Bike Products </h1>

          {/* button  */}
          <Link
            href={"/#"}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={` hover:-translate-y-2 bg-[#efff01] hover:bg-[#f9ffa7] transition ease-linear duration-300 flex gap-2 w-fit justify-center items-center shadow-md  text-black rounded-full p-2 px-3`}
          >
            <h1>View All</h1>
            <MoveRight
              className={
                isHovered
                  ? "rotate-180  transition ease-linear duration-300"
                  : ""
              }
              size={22}
              strokeWidth={3}
            />
          </Link>
          </div>

        </div>

        <div className="my-7 w-full md:px-[1rem] px-1  grid grid-cols-1  md:grid-cols-2 sm:grid-cols-2  lg:grid-cols-4 md:gap-8 gap-5 place-items-center">
          {/* CARDS */}

          {
            dummyElement.map((elem,index)=>
            <Fragment key={index}>
                <div  className="h-[18rem] w-full  px-3 bg-slate-900/25 backdrop-blur-md rounded-md   border-[1px] border-gray-800 hover:border-gray-700 border-b-gray-600 hover:border-b-gray-500  hover:-translate-y-2 transition ease-linear duration-300 ">
            <div className="bg-slate-200 h-[12rem] flex items-center justify-center rounded-b-3xl">
              <Image
                className="hover:scale-110 overflow-hidden transition ease-linear duration-300 "
                alt="product image"
                src={
                  "https://e-commerce-pied-xi.vercel.app/_next/image?url=%2Fimages%2Fproducts%2Fgamepad-red.webp&w=256&q=75"
                }
                width={100}
                height={100}
              />
            </div>
            {/* DETAIL */}
            <div className="mt-3">
              <div className="w-full flex justify-between items-center ">
                <h1 className="text-md truncate  w-[80%]">Product Nameffdfdfdf rer re   re  rer name a=name</h1>
                {/* BUTTON */}
                <button className=" w-[10%] flex items-center justify-center gap-1 bg-violet-40  bg-violet-500/25  hover:bg-violet-500 hover:border-transparent transition ease-linear duration-300 text-white   rounded-full p-2   overflow-hidden">
                  <ShoppingCart size={17} />
                </button>
              </div>
              {/* Price */}
              <h1 className="text-sm font-serif text-blue-100">₹500</h1>
            </div>
          </div>

            </Fragment>)
          }
          





        
        </div>
      </div>
        </>
     );
}
 
export default BikeProd;