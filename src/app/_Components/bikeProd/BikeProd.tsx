"use client";
import { MoveRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { ShoppingCart } from "lucide-react";
import Card from "../Shared/Card/Card";
import { useAllProducts } from '@/hooks/products/Product';
import { ProdDocument } from "@/types/product.types";
import { CardSkelton } from "../Shared/Card/Skelton"
import { BIkeSkelton } from "../Shared/bikesectionSkelton/BIkeSkelton";

const BikeProd = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { data, error, isLoading } = useAllProducts(1, "", "bike");
  const products: ProdDocument[] = data?.products ?? [];

  if (!products) return <CardSkelton />;

  return (
    <>
      <div className="relative z-20 w-full px-4 py-5 mt-5">
        <div className="flex justify-between flex-wrap gap-2">
          <div className="w-full flex flex-wrap flex-row justify-between">
            <h1 className="md:text-3xl text-2xl text-black/75">Bike Products</h1>

            {/* button  */}
            <Link
              href={"/products"}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`hover:-translate-y-2 bg-[#efff01] hover:bg-[#f9ffa7] transition ease-linear duration-300 flex gap-2 w-fit justify-center items-center shadow-md text-black rounded-full p-2 px-3`}
            >
              <h1>View All</h1>
              <MoveRight
                className={
                  isHovered
                    ? "rotate-180 transition ease-linear duration-300"
                    : ""
                }
                size={22}
                strokeWidth={3}
              />
            </Link>
          </div>
        </div>

        <div className="flex gap-5 overflow-x-scroll custom-scrollbar py-4">
          {/* CARDS */}
          {isLoading ? (
            <BIkeSkelton />
          ) : (
            products.map((product, index) => (
              <Link
                key={index}
                href={`/products/${product._id}`}
                className="h-auto pb-6 max-w-full w-[12rem] sm:w-[15rem] backdrop-blur-md rounded-md hover:-translate-y-2 transition ease-linear duration-300 hover:bg-violet-5 p-2 hover:shadow-sm flex-none"
              >
                <div className="h-[15rem] w-full flex items-center justify-center rounded-sm hover:rounded-md transition ease-linear duration-300 hover:bg-transparent py-1 border-b-2 shadow-md bg-violet-100/25">
                  <Image
                    className="overflow-hidden transition ease-linear duration-300 h-auto w-auto"
                    alt="product image"
                    src={"/rocket.png"}
                    width={500}
                    height={500}
                  />
                </div>
                {/* DETAIL */}
                <div className="mt-1 flex flex-col">
                  <h1 className="text-md truncate text-black w-[90%]">
                    {product.name}
                  </h1>

                  {/* Price */}
                  <h1 className="text-lg font-serif text-black leading-4 pb-1">
                    ₹{product.price}
                  </h1>
                  {
                    product.ratings > 0.0 &&
                  <div className="flex gap-1 items-center justify-start">
                    <div className="bg-violet-400 border border-violet-500 w-fit px-2 text-black rounded-full flex gap-1 items-center justify-start">
                      <h1 className="text-md">{product.ratings.toFixed(1)}</h1>
                      <Star size={20} />
                    </div>
                    <h1 className="text-sm text-black/75">
                      ({product.reviews.length} Reviews)
                    </h1>
                  </div>
                    }

                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default BikeProd;
