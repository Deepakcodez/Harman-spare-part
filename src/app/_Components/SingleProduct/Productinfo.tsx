import { ProdDocument } from "@/types/product.types";
import { FC } from "react";
import ProdImage from "./ProdImage/Prodimage";
import ProdDetails from "./proddetails/Productdetails";
import { useAppSelector } from "@/lib/store/hooks";
import { selectIsShown } from "@/lib/features/review/reviewSlice";
import MakeReview from "./MakeReview/MakeReview";

interface ProdProps {
    product: ProdDocument;
}

const ProductInfo: FC<ProdProps> = ({ product }) => {

    const isShown = useAppSelector(selectIsShown);


    return (
        <>
        {
            isShown && <MakeReview productId={product._id.toString()} />
        }
       
            <div id="prodDetails" className="grid md:grid-cols-2 w-full h-screen bg-white no-scrollbar   ">
                {/* Product image */}
                <div className=" h-fit  ">
                    <ProdImage images={product.images} />
                </div>

                {/* Product details */}
                <div className=" px-4 h-auto md:overflow-y-auto">
                    <ProdDetails product={product} />
                </div>
            </div>
        </>
    );
}

export default ProductInfo;
