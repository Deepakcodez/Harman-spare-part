"use client"
import Loader from "@/app/_Components/Shared/Loader/Loader";
import ProductInfo from "@/app/_Components/SingleProduct/Productinfo";
import { useSingleProduct } from "@/hooks/products/useSingleProduct";
import { ProdDocument } from "@/types/product.types";
import { FC } from "react";
import useSWR from "swr";
interface ProductProps {
    params: {
        product: string;
    };
}

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

const  Product:FC<ProductProps>= ({params}) => {

    // const { data, error } = useSWR(`https://harman-spare-parts-backend.vercel.app/api/v1/product/product/${params.product}`, fetcher);
    const { data, error, isLoading } = useSingleProduct(params.product);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div><Loader /></div>;

    console.log(data)

    const product: ProdDocument = data.product;

    return ( 
        <>
        <div className="w-full min-h-[101vh] h-max max-h-auto backgroundColor">
          <ProductInfo product={product}/>            
        </div>
        </>
     );
}
 
export default Product;