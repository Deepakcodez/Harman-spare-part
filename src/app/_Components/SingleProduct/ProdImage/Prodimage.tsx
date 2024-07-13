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
import { useCartDetailStore } from "@/Store/CartCount/useCartDetail";

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
    const router = useRouter();

    const { increaseCartCount, decreaseCartCount } = useCartDetailStore();

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
                console.log("cart detail", resp.data);
                const cart = resp.data.cart;
                const productExists = cart.products.some(
                    (p: any) => p.product.productId._id.toString() === productId.toString()
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

    const HandleAddToCart = async () => {

        const data: AddProductToCartData = { productId };

        if (!currentUser) {
            router.push("/auth/login");
        }

        try {
            setIsProductExistInCart(true)
            increaseCartCount();
            const response = await axios.post<AddProductToCartResponse>(
                "https://harman-spare-parts-backend.vercel.app/api/v1/cart/add",
                data,
                {
                    headers: { Authorization: token },
                }
            );
            if (response.status !== 200) {

                setIsProductExistInCart(false)
                decreaseCartCount()
            } else {
                fetchCart();

            }

            toast.success("Product added to cart");
        } catch (error) {
            setIsAddingToCart(false);
            toast.error("Something Went Wrong");
        }

    };

    const handleRemoveFromCart = async () => {
        try {
            setIsProductExistInCart(false)
            decreaseCartCount();
            const resp = await axios.post(
                "https://harman-spare-parts-backend.vercel.app/api/v1/cart/remove",
                { productId },
                {
                    headers: { Authorization: token },
                }
            );
            if (resp.status !== 200) {

                setIsProductExistInCart(true)
                increaseCartCount()
            } else {

                fetchCart();
            }

            toast.success("Product removed from cart");
        } catch (error) {
            toast.error("Something Went Wrong");
        }
    };

    const handleClick = () => {
        if (isProductExistInCart) {
            handleRemoveFromCart();
        } else {
            HandleAddToCart();
        }

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
                            onClick={handleClick}
                            className={`border-2 p-2 rounded-md transition ease-linear duration-300 ${!isProductExistInCart
                                ? "bg-violet-900 border-violet-700 text-white hover:bg-violet-800"
                                : "bg-gray-400 hover:bg-gray-500 text-white/75"
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
