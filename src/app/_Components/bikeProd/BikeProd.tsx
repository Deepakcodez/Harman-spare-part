"use client";
import { ChevronsLeft, ChevronsRight, MoveRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {  useRef, useState } from "react";
import { useAllProducts } from '@/hooks/products/Product';
import { ProdDocument } from "@/types/product.types";
import { CardSkelton } from "../Shared/Card/Skelton";
import { BIkeSkelton } from "../Shared/bikesectionSkelton/BIkeSkelton";

const BikeProd = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { data, error, isLoading } = useAllProducts(1, "", "bike");
  const products: ProdDocument[] = data?.products ?? [];
  const parentOfProdRef = useRef<HTMLDivElement>(null);

  const prevButton = () => {
    if (parentOfProdRef.current) {
      let width = parentOfProdRef.current.clientWidth;
      parentOfProdRef.current.scrollTo({
        left: parentOfProdRef.current.scrollLeft - width,
        behavior: "smooth",
      });
    }
  };

  const nextButton = () => {
    if (parentOfProdRef.current) {
      let width = parentOfProdRef.current.clientWidth;
      parentOfProdRef.current.scrollTo({
        left: parentOfProdRef.current.scrollLeft + width,
        behavior: "smooth",
      });
    }
  };
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

        <div ref={parentOfProdRef} className="parentOfProd flex bg-red-5 gap-5 overflow-x-scroll py-4 no-scrollbar">
          <button
            onClick={prevButton}
            className="absolute z-50 top-1/2 left-2 bg-violet-200 hover:bg-violet-300 scale-110 shadow-md transition ease-linear duration-300 "
          >
            <ChevronsLeft />
          </button>
          <button
            onClick={nextButton}
            className="absolute z-50 top-1/2 right-2 scale-110 bg-violet-200 hover:bg-violet-300 shadow-md transition ease-linear duration-300 "
          >
            <ChevronsRight />
          </button>
          {/* CARDS */}
          {isLoading ? (
            <BIkeSkelton />
          ) : (
            products.map((product, index) => (
              <Link
                key={index}
                href={`/products/${product._id}`}
                className="h-auto pb-6 max-w-full w-[15rem] sm:w-[15rem] backdrop-blur-md rounded-md hover:-translate-y-2 transition ease-linear duration-300 hover:bg-violet-5 p-2 hover:shadow-sm flex-none"
                >
               <div className="relative  h-[15rem] w-full flex items-center justify-center rounded-sm hover:rounded-md transition ease-linear duration-300 hover:bg-transparent  shadow-md bg-violet-100/25 ">
                  <Image
                    className=" absolute h-full w-full overflow-hidden transition ease-linear duration-300   hover:scale-105 object-cover shadow-md"
                    alt="product image"
                    src={product.images[0].url}
                    width={200}
                    height={200}
                    loading="lazy"
                    onContextMenu={(e) => e.preventDefault()}
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
                  {product.ratings > 0.0 && (
                    <div className="flex gap-1 items-center justify-start">
                      <div className="bg-violet-400 border border-violet-500 w-fit px-2 text-black rounded-full flex gap-1 items-center justify-start">
                        <h1 className="text-md">{product.ratings.toFixed(1)}</h1>
                        <Star size={20} />
                      </div>
                      <h1 className="text-sm text-black/75">
                        ({product.reviews.length} Reviews)
                      </h1>
                    </div>
                  )}
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
