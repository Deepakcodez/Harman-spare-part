"use client";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";

const Best_Selling = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="relative z-20 w-full px-4 py-5 ">
        <div className="  flex justify-between flex-wrap gap-2">
          <h1 className="text-3xl font-semibold ">Best Selling Products</h1>

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

        <div className="my-7 w-full md:px-[1rem] px-1  grid grid-cols-1  md:grid-cols-4 sm:grid-cols-2  lg:grid-cols-4 md:gap-8 gap-5 place-items-center">
          {/* CARDS */}
          <div className="h-[18rem] w-full  px-3 bg-slate-900/25 backdrop-blur-md rounded-md  border-[1px] border-gray-800 hover:border-gray-700 border-b-gray-600 hover:border-b-gray-500  hover:-translate-y-2 transition ease-linear duration-300 ">
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
                <h1 className="text-lg font-semibold">Product Name</h1>
                <button className="flex bg-violet-400 hover:bg-violet-200 rounded-full px-2 py-1 overflow-hidden">
                  <h1 className="text-black">Add</h1>
                  <ShoppingCart  color="black"/>
                </button>
              </div>
              {/* Price */}
              <h1 className="text-sm font-serif text-blue-100">₹500</h1>
            </div>
          </div>


          <div className="h-[18rem] w-full  px-3 bg-slate-900/25 backdrop-blur-md rounded-md  border-[1px] border-gray-800 hover:border-gray-700 border-b-gray-600 hover:border-b-gray-500  hover:-translate-y-2 transition ease-linear duration-300 ">
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
                <h1 className="text-lg font-semibold">Product Name</h1>
                <button className="flex bg-violet-400 hover:bg-violet-200 rounded-full px-2 py-1 overflow-hidden">
                  <h1 className="text-black">Add</h1>
                  <ShoppingCart  color="black"/>
                </button>
              </div>
              {/* Price */}
              <h1 className="text-sm font-serif text-blue-100">₹500</h1>
            </div>
          </div>


          <div className="h-[18rem] w-full  px-3 bg-slate-900/25 backdrop-blur-md rounded-md  border-[1px] border-gray-800 hover:border-gray-700 border-b-gray-600 hover:border-b-gray-500  hover:-translate-y-2 transition ease-linear duration-300 ">
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
                <h1 className="text-lg font-semibold">Product Name</h1>
                <button className="flex bg-violet-400 hover:bg-violet-200 rounded-full px-2 py-1 overflow-hidden">
                  <h1 className="text-black">Add</h1>
                  <ShoppingCart  color="black"/>
                </button>
              </div>
              {/* Price */}
              <h1 className="text-sm font-serif text-blue-100">₹500</h1>
            </div>
          </div>




          <div className="h-[18rem] w-full  px-3 bg-slate-900/25 backdrop-blur-md rounded-md  border-[1px] border-gray-800 hover:border-gray-700 border-b-gray-600 hover:border-b-gray-500  hover:-translate-y-2 transition ease-linear duration-300 ">
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
                <h1 className="text-lg font-semibold">Product Name</h1>
                <button className="flex bg-violet-400 hover:bg-violet-200 rounded-full px-2 py-1 overflow-hidden">
                  <h1 className="text-black">Add</h1>
                  <ShoppingCart  color="black"/>
                </button>
              </div>
              {/* Price */}
              <h1 className="text-sm font-serif text-blue-100">₹500</h1>
            </div>
          </div>

        
        </div>
      </div>
    </>
  );
};

export default Best_Selling;
