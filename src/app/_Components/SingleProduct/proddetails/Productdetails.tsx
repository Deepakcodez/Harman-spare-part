import { ProdDocument } from "@/types/product.types";
import { Star } from "lucide-react";
import { FC, Fragment } from "react";


interface ProdProps {
    product: ProdDocument;
}
const ProdDetails: FC<ProdProps> = ({ product }) => {
    console.log('>>>>>>>>>>>', product)

    return (
        <>
            <div className="md:my-[7rem] my-[2rem]     h-fit w-full bg-white   flex flex-col gap-3  ">

                <div className="flex flex-col gap-3 border-[.2px] border-black/25 rounded-md p-4  py-5">
                    <h1 className="text-2xl text-black/75 ">{product.name}</h1>
                    <h1 className="text-4xl text-black "> ₹{product.price}/-</h1>
                    <div className="bg-violet-600/25 text-violet-800 font-bold border-2 border-violet-600 hover:bg-violet-800/50 w-fit  p-2 rounded-full px-4 transition ease-linear duration-300 cursor-pointer">Free Delivery</div>
                </div>


                <div className="flex flex-col gap-3 border-[.2px] border-black/25 rounded-md p-4  py-5">
                    <h1 className="text-2xl text-black">Product Detail</h1>
                    <h1 className="text-md text-black/75 ">{product.description}</h1>
                    <div className="text-black flex items-center gap-1" >
                        <div
                            className="text-lg text-black/75 w-fit px-2 flex gap-2 items-center justify-center rounded-full  text-violet-800 font-bold border-2 border-violet-600 ">
                            {product.ratings}
                            <Star />
                        </div>
                        <h1 className="text-3xl">/</h1>
                        <h1 className="text-violet-900">{product.reviews.length}{" "} Reviews</h1>
                    </div>

                </div>


                <div className="flex flex-col gap-3 border-[.2px] border-black/25 rounded-md p-4  py-5">
                    <h1 className="text-2xl text-black">Product Reviews</h1>
                    {
                        product.reviews.map((rev, index) =>
                            <Fragment key={index}>
                                <div className="border-t py-3">
                                    <h1 className="text-black/75 text-md font-bold">{rev.name}</h1>
                                    <h1 className="text-black text-md">{rev.comment}</h1>
                                </div>
                            </Fragment>
                        )
                    }

                </div>



            </div>
        </>
    );
}

export default ProdDetails;