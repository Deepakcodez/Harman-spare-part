import { FC } from "react";
import Card from "../Shared/Card/Card";
import { ProdDocument } from "@/types/product.types";
import { CardSkelton } from "../Shared/Card/Skelton";


interface ProductCardsProb {
    products: ProdDocument[];
    data : any;
    error? : any;
    isLoading? : boolean;
  }

const ProductCards:FC<ProductCardsProb> = ({products, data, error, isLoading}) => {

    
  if (error) return <div className=" w-full h-full text-black flex justify-center items-center">Failed to load</div>;
  
    return ( 
        <>
         <div className="my-7 w-full md:px-[1rem] px-1 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center  ">
          {
            isLoading? <CardSkelton/> :   <Card products={products} />
          }
        
        </div>
        
        </>
     );
}
 
export default ProductCards;