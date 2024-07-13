"use client"
import useCartdetail from "@/hooks/cart/cartDetail";
import { addProductToCart } from "@/services/cart/increaseProdQuantity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Fragment, useEffect } from "react";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";

export const ProductDetailCard = () => {

    const { isLoading, error, data: cartProduct } = useCartdetail();

    const queryClient = useQueryClient()

    const quantityAdder =(productId:string)=>{

        if(!productId) return toast.error("product ID missing");

        mutation.mutate(productId)
    }


    const mutation = useMutation({
        mutationFn: (productId : string) => addProductToCart(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cartDetails'] })
            // dispatch(toggleIsShown())
           
            toast.success("quantity Added");
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    })

   


  if(isLoading) return <div className="text-black">Loading</div>
  if(error) return <div className="text-black">Error</div>
    return (
        <>
            {

                    cartProduct.products?.map((item: any, index: number) =>
                        <Fragment key={index}>
                            <div className=" py-2">
                                <div className="border-t-2 flex justify-end p-1">
                                    <RxCross1 />
                                </div>
                                {/* detail div */}
                                <div className=" flex md:gap-4 gap-1">
                                    <Image className="bg-violet-50 p-2 rounded-lg shadow-md h-[8rem]  w-[8rem] md:h-[10rem] md:w-[10rem]" src={"/rocket.png"} width={150} height={150} alt="ProductImage" />
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-lg md:text-2xl  ">
                                            {item.product.productId.name}
                                        </h1>
                                        <div className="text-black">{JSON.stringify(item.product.productId._id)}</div>
                                        <h1 className="text-sm">
                                            {
                                                item.product.productId.stock > 0 ?
                                                    <div className="text-green-600">In Stock</div>
                                                    :
                                                    <div className="text-red-600">Out Of Stock</div>}
                                        </h1>
                                        <div className="border-2 rounded-lg justify-between flex w-[8rem]">
                                            <button className="hover:bg-violet-100 w-12 rounded-s-lg">-</button>
                                            <div>{item.product.prodQuantity}</div>
                                            <button
                                            onClick={()=>quantityAdder(item.product.productId._id)}
                                                className="hover:bg-violet-100 w-12 rounded-e-lg">
                                                +
                                            </button>
                                        </div>
                                            
                                    </div>
                                </div>
                            </div>
                        </Fragment>)
            }
        </>
    )
}