"use client";
import Image from "next/image";
import { FC, Fragment, useEffect, useState } from "react";
import { Image as ImageType } from "@/types/product.types";
import axios from "axios";
import toast from "react-hot-toast";
import mongoose from "mongoose";
import Cookies from "js-cookie";
import { CartDocument } from "@/types/cart.types";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/hooks/user/currentuser";

interface ProdImageProps {
    images: ImageType[];
    productId: mongoose.Types.ObjectId;
}

export interface AddProductToCartResponse {
    success: boolean;
    cart: CartDocument;
}

export interface AddProductToCartData {
    productId: mongoose.Types.ObjectId;
}

const ProdImage: FC<ProdImageProps> = ({ images, productId }) => {
    const token = Cookies.get("HSPToken");
    const prodimages = [1, 1, 1, , 1, 1]; // Placeholder for product images
    const [isProductExistInCart, setIsProductExistInCart] = useState<boolean>(false);
    const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
    const { data: currentUser, isLoading, isError, error } = useCurrentUser();
    const router = useRouter()

    const fetchCart = async () => {

       
        
        if (currentUser) {
            try {
                const resp = await axios.get(
                    `https://harman-spare-parts-backend.vercel.app/api/v1/cart/details`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                const cart = resp.data.cart;

                const productExists = cart.products.some(
                    (p: any) => p.productId._id.toString() === productId.toString()
                );

                setIsProductExistInCart(productExists);

            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        }
    };

    useEffect(() => {
        fetchCart();
    }, [productId, currentUser, isLoading, isError, error]);

    const debouncedHandleAddToCart = async () => {
        if (!isAddingToCart) {
            setIsAddingToCart(true);
            const data: AddProductToCartData = { productId };

            if(!currentUser){
                 router.push("/auth/login")
            }

            try {
                const response = await axios.post<AddProductToCartResponse>(
                    "https://harman-spare-parts-backend.vercel.app/api/v1/cart/add",
                    data,
                    {
                        headers: { Authorization: token },
                    }
                );
                fetchCart()

            } catch (error) {
                setIsAddingToCart(false);
                toast.error("Something Went Wrong");

            } 
        }
    };

    const HandleAddToCart = () => {
        setIsProductExistInCart(!isProductExistInCart);
        debouncedHandleAddToCart();
    };

    return (
        <>
            <div className="mt-[7rem]">
                {/* main image */}
                <div className="h-fit w-full flex justify-center">
                    <div className="h-auto px-3">
                        <Image
                            className="h-auto md:w-[40vw] w-[100vw] rounded-sm hover:scale-105 transition ease-linear duration-300"
                            src={"/bike4.jpg"}
                            width={500}
                            height={200}
                            alt="Prod image"
                        />
                    </div>
                </div>

                {/* option images */}
                <div>
                    <div className="flex justify-center py-3 gap-2 flex-wrap px-2">
                        {prodimages.map((image, index) => (
                            <Fragment key={index}>
                                <Image
                                    className="border cursor-pointer rounded-md"
                                    src={"/bike4.jpg"}
                                    width={50}
                                    height={50}
                                    alt="Prod image"
                                />
                            </Fragment>
                        ))}
                    </div>

                    {/* buttons */}
                    <div className="w-full flex gap-9 justify-center mt-2">
                        <button
                            onClick={HandleAddToCart}
                            className={`border-2 p-2 rounded-md transition ease-linear duration-300 ${!isProductExistInCart
                                    ? "bg-violet-900 border-violet-700 text-white"
                                    : "bg-gray-400 text-white/75"
                                }`}
                        >
                            {isProductExistInCart ? "Remove from cart" : "Add to Cart"}
                        </button>
                        <button className="border-2 border-violet-800 hover:bg-violet-900 hover:text-white p-2 rounded-md dark:text-black transition ease-linear duration-300 px-5">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProdImage;
