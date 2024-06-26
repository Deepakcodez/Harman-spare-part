"use state"
import { ProdDocument } from "@/types/product.types";
import { Pencil, Star } from "lucide-react";
import { FC, Fragment, useState } from "react";
import MakeReview from "../MakeReview/MakeReview";
import { useAppDispatch, } from "@/lib/store/hooks";
import { toggleIsShown } from "@/lib/features/review/reviewSlice";


interface ProdProps {
    product: ProdDocument;
}
const ProdDetails: FC<ProdProps> = ({ product }) => {

    const dispatch = useAppDispatch();


    const ReviewHandler = () => {
        dispatch(toggleIsShown())

    }





    return (
        <>

            <div className="md:my-[7rem] my-[2rem] h-fit w-full bg-white  flex flex-col gap-3  ">


                {/* Product Name */}

                <div className="flex flex-col gap-3 border-[.2px] border-black/25 rounded-md p-4  py-5">
                    <h1 className="text-xl text-black/75 ">{product.name}</h1>
                    <h1 className="text-2xl text-black "> ₹{product.price}/-</h1>
                    {
                        product.isFreeDelivery ?
                            <div className="bg-violet-600/25 text-violet-800  border-2 border-violet-600/25 hover:bg-violet-800/50 w-fit  p-2 rounded-full px-4 transition ease-linear duration-300 cursor-pointer text-sm">Free Delivery</div>
                            :
                            <div className="bg-violet-600/25 text-violet-800  border-2 border-violet-600/25 hover:bg-violet-800/50 w-fit  p-2 rounded-full px-4 transition ease-linear duration-300 cursor-pointer text-sm">Delivery Charges Apply</div>

                    }

                </div>


                {/* Product Details */}

                <div className="flex flex-col gap-3 border-[.2px] border-black/25 rounded-md p-4  py-5">
                    <h1 className="text-md text-black">Product Detail</h1>
                    <h1 className="text-sm text-black/75 ">{product.description}</h1>
                    <div className="text-black flex items-center gap-1" >
                        <div
                            className="text-lg text-black/75 w-fit px-2 flex gap-2 items-center justify-center rounded-full  text-violet-800 font-bold border-2 border-violet-600 ">
                            {product.ratings}
                            <Star />
                        </div>
                        <div className="text-black flex items-center gap-1">
                            <h1 className="text-3xl text-black/50">/</h1>
                            <h1 className="text-violet-900">{product.reviews.length}{" "} Reviews</h1>
                        </div>
                    </div>
                    <div className="text-black flex items-center gap-1">
                        <h1>Status : </h1>
                        <h1 className="text-green-700">
                            {
                                product.stock > 0 ? "In-Stock" : "Out Of Stock"
                            }

                        </h1>
                    </div>

                </div>


                {/* Reviews section */}


                <div className="flex flex-col gap-3 border-[.2px] border-black/25 rounded-md p-4  py-5">


                    <div className="flex justify-between">
                        <h1 className="text-md text-black">Product Reviews</h1>
                        <div
                            onClick={ReviewHandler}
                            className="bg-violet-50 hover:bg-violet-200 rounded-full  flex justify-center items-center p-2 transition ease-linear duration-300 border">
                            <Pencil color="#4d4d4d" size={20} />
                        </div>
                    </div>
                    {product?.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((rev, index) => (
                            <Fragment key={index}>
                                <div className="border-t py-3">
                                    <h1 className="text-black/75 text-md">{rev.name}</h1>
                                    <h1 className="text-black/75 text-sm">{rev.comment}</h1>
                                </div>
                            </Fragment>
                        ))
                    ) : (
                        <p className="text-black/50 text-sm">No Reviews to Show...</p>
                    )}

                </div>





            </div>
        </>
    );
}

export default ProdDetails;