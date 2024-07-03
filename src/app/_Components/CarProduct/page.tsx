"use client";
import { MoveRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useAppDispatch } from "@/lib/store/hooks";
import { add } from "@/lib/features/cart/cartslice";
import Card from "../Shared/Card/Card";
import { ProdDocument } from "@/types/product.types";
import { useAllProducts } from "@/hooks/products/Product";
import { CardSkelton } from "../Shared/Card/Skelton";

const CarProd = () => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const { data, error , isLoading } = useAllProducts(1, "", "car");
  const products: ProdDocument[] = data?.products ?? [];

  const FourProd : ProdDocument[] = products.slice(0,4)

  const handleAddToCart = (productId: string) => {
    dispatch(add(productId));
  };

   
  return (
    <>
      <div className="relative z-20 w-full px-4 py-5 mt-10 ">
        <div className="  flex justify-between flex-wrap gap-2">
          <div className="w-full flex flex-row flex-wrap justify-between">
            <h1 className="  md:text-3xl text-2xl  text-black/75 ">Car Products</h1>

            {/* button  */}
            <Link
              href={"/products"}
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
        isLoading?<CardSkelton/> : <Card products={FourProd}/>
       }
        
         


        </div>
      </div>
    </>
  );
};

export default CarProd;
