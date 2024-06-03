"use client";
import { MoveRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useAppDispatch } from "@/lib/store/hooks";
import { add } from "@/lib/features/cart/cartslice";
import Card from "../Card/Card";

const CarProd = () => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const dummyElement = [1, 2, 3, 4];

  const handleAddToCart = (productId: string) => {
    dispatch(add(productId));
  };

  return (
    <>
      <div className="relative z-20 w-full px-4 py-5 mt-10 ">
        <div className="  flex justify-between flex-wrap gap-2">
          <div className="w-full flex flex-col md:flex-row  justify-between">
            <h1 className="text-3xl font-thin ">Car Products</h1>

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
         

          <div  className="h-[24rem] max-w-full w-[18rem]  bg-slate-900/25 backdrop-blur-md rounded-md   border-[1px] border-gray-800 hover:border-gray-700 border-b-gray-600 hover:border-b-gray-500  hover:-translate-y-2 transition ease-linear duration-300 ">
            <div className="bg-slate-200 h-[15rem] flex items-center justify-center rounded-b-3xl">
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
            <div className="mt-3 px-5 flex flex-col gap-2">
                <h1 className="text-md truncate  w-[90%]">prod name</h1>
                
              {/* Price */}
              <h1 className="text-lg  font-serif text-blue-100">₹price</h1>
              <div className="flex gap-1 items-center justify-start">
              <div className="bg-violet-400 w-fit px-2 text-black rounded-full flex gap-1 items-center justify-start">
                <h1 className="text-md">4.4</h1>
                <Star size={20}/>
              </div>
              <h1 className="text-sm text-white/75">(321 Reviews)</h1>
              </div>
            </div>
          </div>



        </div>
      </div>
    </>
  );
};

export default CarProd;
