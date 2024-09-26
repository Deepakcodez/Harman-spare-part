"use client"
import { SingleProductPageSkelton } from "@/app/_Components/Shared/SingleProdSkelton";
import ProductInfo from "@/app/_Components/SingleProduct/Productinfo";
import { useSingleProduct } from "@/hooks/products/useSingleProduct";
import { ProdDocument } from "@/types/product.types";
import { FC } from "react";
interface ProductProps {
    params: {
        product: string;
    };
}


const  Product:FC<ProductProps>= ({params}) => {

    const { data, error} = useSingleProduct(params.product);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div className="h-auto "><SingleProductPageSkelton /></div>;
    
    console.log(data)

    const product : ProdDocument | undefined = data?.product;

    return ( 
        <>
        <div className="w-full min-h-[101vh]  h-auto backgroundColor">
          <ProductInfo product={product}/>            
        </div>
        </>
     );
}
 
export default Product;