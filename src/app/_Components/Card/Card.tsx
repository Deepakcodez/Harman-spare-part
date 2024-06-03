import { ProdDocument } from "@/types/product.types";
import { Star } from "lucide-react";
import Image from "next/image";
import { FC, Fragment } from "react";

interface CardProps {
  products: ProdDocument[];
}
const Card:FC<CardProps> = ({ products }) => {
    const dummyElement = [1, 2, 3, 4,5,1, 2, 3, 4,5];
    console.log('>>>>>>>>>>> from card', products)

    return (
        <>
        {
            products?.map((elem,index)=>
            <Fragment key={index}>
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
                <h1 className="text-md truncate  w-[90%]">{elem.name}</h1>
                
              {/* Price */}
              <h1 className="text-lg  font-serif text-blue-100">₹{elem.price}</h1>
              <div className="flex gap-1 items-center justify-start">
              <div className="bg-violet-400 w-fit px-2 text-black rounded-full flex gap-1 items-center justify-start">
                <h1 className="text-md">{elem.ratings}</h1>
                <Star size={20}/>
              </div>
              <h1 className="text-sm text-white/75">({elem.reviews.length} Reviews)</h1>
              </div>
            </div>
          </div>

            </Fragment>)
          }
          
        </>
      );
}
 
export default Card;