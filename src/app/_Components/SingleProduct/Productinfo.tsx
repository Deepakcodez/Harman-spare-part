import { ProdDocument } from "@/types/product.types";
import { FC } from "react";
import ProdImage from "./ProdImage/Prodimage";
import ProdDetails from "./proddetails/Productdetails";
import MakeReview from "./MakeReview/MakeReview";
import useReviewStore from "@/Store/review/useReviewStore";

interface ProdProps {
    product: ProdDocument;
}

const ProductInfo: FC<ProdProps> = ({ product }) => {

    const isShown = useReviewStore((state) => state.isShown);



    return (
        <>
        {
            isShown && <MakeReview productId={product._id.toString()} />
        }
       
            <div id="prodDetails" className="grid md:grid-cols-2 w-full min-h-screen h-auto  no-scrollbar backgroundColor  ">
                {/* Product image */}
                <div className=" h-fit  ">
                    <ProdImage images={product.images} productId={product._id} />
                </div>

                {/* Product details */}
                <div className="px-4 h-[100vh] md:overflow-y-auto backgroundColor custom-scrollbar ">
                    <ProdDetails product={product} />
                </div>
            </div>
        </>
    );
}

export default ProductInfo;
