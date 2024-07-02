"use client";
import { MoveRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { ShoppingCart } from "lucide-react";
import Card from "../Shared/Card/Card";
import { useAllProducts } from '@/hooks/products/Product';

const BikeProd = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { data, error } = useAllProducts(1, "", "bike");
  console.log('>>>>>>>>>>>', data)

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

          



        </div>
      </div>
    </>
  );
};

export default BikeProd;
