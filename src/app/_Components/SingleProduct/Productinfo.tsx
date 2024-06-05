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
            isShown && <MakeReview/>
        }
       
            <div className="grid md:grid-cols-2 w-full min-h-screen md:h-screen bg-white">
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
