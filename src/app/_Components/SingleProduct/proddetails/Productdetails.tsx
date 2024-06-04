import { ProdDocument } from "@/types/product.types";
import { FC, Fragment } from "react";


interface ProdProps {
    product: ProdDocument;
}
const ProdDetails: FC<ProdProps> = ({product}) => {
             console.log('>>>>>>>>>>>', product)
    return (
        <>
            <div className="mt-[7rem] border-[.2px] border-black/25 rounded-md  h-fit w-full bg-white  p-4    ">

              <div className="flex flex-col gap-3">
                <h1 className="text-2xl text-black/75 ">{product.name}</h1>
                <h1 className="text-4xl text-black "> ₹{product.price}/-</h1>
                <div className="bg-violet-900/25 text-violet-800 font-bold border-2 border-violet-600 w-fit  p-2 rounded-full px-4">Free Delivery</div>
              </div>

            </div>
        </>
    );
}

export default ProdDetails;