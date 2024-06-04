"use client"
import Loader from "@/app/_Components/Shared/Loader/Loader";
import Router from "next/router";
import { FC } from "react";
import useSWR from "swr";
interface ProductProps {
    params: {
        product: string;
    };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const  Product:FC<ProductProps>= ({params}) => {

    const { data, error } = useSWR(`https://harman-spare-parts-backend.vercel.app/api/v1/product/product/${params.product}`, fetcher);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div><Loader /></div>;
    console.log('>>>>>>>>>>>', data.product)

    return ( 
        <>
        <div>
            single prod {data.product.name}
        </div>
        </>
     );
}
 
export default Product;