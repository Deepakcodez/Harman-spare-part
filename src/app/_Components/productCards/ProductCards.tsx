import { FC } from "react";
import Card from "../Shared/Card/Card";
import { ProdDocument } from "@/types/product.types";
import Loader from "../Shared/Loader/Loader";



interface ProductCardsProb {
    products: ProdDocument[];
    data : any;
    error? : any;
  }

const ProductCards:FC<ProductCardsProb> = ({products, data, error}) => {

    
  if (error) return <div className=" w-full h-full text-black flex justify-center items-center">Failed to load</div>;
  if (!data) return <div className="w-full h-screen text-black flex justify-center items-center"><h1>Loading...</h1></div>;
  if (!data.products || data.products.length === 0) return <div className='h-screen w-full flex justify-center items-center'>Nothing to show</div>;
    return ( 
        <>
         <div className="my-7 w-full md:px-[1rem] px-1 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center  ">
          <Card products={products} />
        </div>
        
        </>
     );
}
 
export default ProductCards;