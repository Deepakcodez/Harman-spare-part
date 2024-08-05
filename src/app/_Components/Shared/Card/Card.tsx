import { ProdDocument } from "@/types/product.types";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC, Fragment } from "react";

interface CardProps {
  products: ProdDocument[];
}
const Card: FC<CardProps> = ({ products }) => {


  return (
    <>
      {
        products?.map((elem, index) =>
          <Fragment key={index}>
            <Link href={`/products/${elem?._id}`} className="h-auto pb-6 max-w-full w-full sm:w-[15rem]    backdrop-blur-md rounded-md  hover:-translate-y-2 transition ease-linear duration-300 hover:bg-violet-5 p-2 hover:shadow-sm ">
             
                <Image
                  className="overflow-hidden transition ease-linear duration-300  h-auto w-auto  hover:scale-105 object-fill border-b-2 shadow-md"
                  alt="product image"
                  src={elem.images?.[0]?.url}
                  
                  width={200}
                  height={200}

                />

             
              {/* DETAIL */}
              <div className="mt-1 flex flex-col ">
                <h1 className="text-md truncate text-black  w-[90%]">{elem.name}</h1>

                {/* Price */}
                <h1 className="text-lg  font-serif text-black leading-4 pb-1">₹{elem.price}</h1>

                {
                  elem.ratings > 0.0  &&
                  <div className="flex gap-1 items-center justify-start">
                  <div className="bg-violet-400 border border-violet-500 w-fit px-2 text-black rounded-full flex gap-1 items-center justify-start">
                    <h1 className="text-md">{elem.ratings.toFixed(1)}</h1>
                    <Star size={20} />
                  </div>
                  <h1 className="text-sm text-black/75">({elem.reviews.length} Reviews)</h1>
                </div>
                }

              </div>
            </Link>

          </Fragment>)
      }

    </>
  );
}

export default Card;