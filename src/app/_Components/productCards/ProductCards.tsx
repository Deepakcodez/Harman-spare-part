import { FC } from "react";
import Card from "../Shared/Card/Card";
import { ProdDocument } from "@/types/product.types";



interface ProductCardsProb {
    products: ProdDocument[];
  }

const ProductCards:FC<ProductCardsProb> = ({products}) => {
    return ( 
        <>
         <div className="my-7 w-full md:px-[1rem] px-1 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-5 place-items-center  ">
          <Card products={products} />
        </div>
        
        </>
     );
}
 
export default ProductCards;