import { FC } from "react";
import Card from "../Shared/Card/Card";
import { ProdDocument } from "@/types/product.types";
import { CardSkelton } from "../Shared/Card/Skelton";
import { BIkeSkelton } from "../Shared/bikesectionSkelton/BIkeSkelton";


interface ProductCardsProb {
    products: ProdDocument[];
    data : any;
    error? : any;
    isLoading? : boolean;
  }

const ProductCards:FC<ProductCardsProb> = ({products, data, error, isLoading}) => {

    
  if (error) return <div className=" w-full h-screen text-black/75 text-2xl flex justify-center items-center">Failed To Load🤖</div>;
  
    return ( 
        <>
         <div className="my-7 px-5 sm:px-1 w-full md:px-[1rem]  grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-2 place-items-center  ">
          {
            isLoading? <BIkeSkelton/> :   <Card products={products} />
          }
        
        </div>
        
        </>
     );
}
 
export default ProductCards;