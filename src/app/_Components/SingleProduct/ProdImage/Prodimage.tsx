"use client";
import Image from "next/image";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { Image as ImageType } from "@/types/product.types";
import axios from "axios";
import toast from "react-hot-toast";
import mongoose from "mongoose";
import Cookies from "js-cookie";
import { CartDocument } from "@/types/cart.types";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useCartCountStore } from "@/Store/CartCount/useCartCountStore";
import useCurrentUserStore from "@/Store/userStore/currentUser";
import { Alert } from "../../Shared/Alert";
import { json } from "stream/consumers";


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
  const [currentImage, setCurrentImage] = useState<string>(images?.[0]?.url);
  const [isProductExistInCart, setIsProductExistInCart] = useState<boolean>(false);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [isALlowToFetch, setIsAllowTOFetch] = useState<boolean>(true)
  const { currentUser } = useCurrentUserStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { increaseCartCount, decreaseCartCount, setCartCount } = useCartCountStore();
  const [isShowAlert, setShowAlert] = useState<boolean>(false);

  const handleImageClick = (url: string) => {
    setCurrentImage(url);
  };

  const fetchCart = useCallback(async () => {
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
          (p: any) => p.product.productId._id.toString() === productId.toString()
        );

        setIsProductExistInCart(productExists);
        setCartCount(cart.products.length); // Set the cart count
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }
  }, [currentUser, productId, setCartCount, token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Reset currentImage when images prop changes
  useEffect(() => {
    if (images && images.length > 0) {
      setCurrentImage(images[0]?.url);
    }
  }, [images]);

  const handleBuyButton = () => {
    if(!currentUser) {
      setShowAlert(true)
      return;
    }
    router.replace(`/products/buy/${productId}  `)
  }


  const HandleAddToCart = async () => {
    const data: AddProductToCartData = { productId };

    if (!currentUser) {
      setShowAlert(true)
      return;
    }

    try {
      // Optimistically update the UI
      setIsProductExistInCart(true);
      increaseCartCount();
      setIsAddingToCart(true);

      if (isALlowToFetch) {
        const response = await axios.post<AddProductToCartResponse>(
          "https://harman-spare-parts-backend.vercel.app/api/v1/cart/add",
          data,
          {
            headers: { Authorization: token },
          }
        );

        if (response.status !== 200) {
          setIsProductExistInCart(false);
          decreaseCartCount();
          toast.error("Something went wrong");
        } else {
          fetchCart();
          queryClient.invalidateQueries({ queryKey: ['cartDetails'] });
          toast.success("Product added to cart");
        }
      }

      setIsAllowTOFetch(false)
      setTimeout(() => {
        setIsAllowTOFetch(true)
      }, 1000);

    } catch (error) {
      setIsProductExistInCart(false);
      decreaseCartCount();
      toast.error("Something Went Wrong");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      // Optimistically update the UI
      setIsProductExistInCart(false);
      decreaseCartCount();

      const resp = await axios.post(
        "https://harman-spare-parts-backend.vercel.app/api/v1/cart/remove",
        { productId },
        {
          headers: { Authorization: token },
        }
      );

      if (resp.status !== 200) {
        setIsProductExistInCart(true);
        increaseCartCount();
        toast.error("Something went wrong");
      } else {
        queryClient.invalidateQueries({ queryKey: ['cartDetails'] });
        fetchCart();
        toast.success("Product removed from cart");
      }
    } catch (error) {
      setIsProductExistInCart(true);
      increaseCartCount();
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
      <div className="">
        {
          isShowAlert &&
          <Alert
            headerMessage="Need to Login"
            message="Need Login to add product in cart"
            buttonText="Login"
            buttonLink='/auth/login'
            isShow={isShowAlert}
            setShow={setShowAlert} />
        }

        <div className="mt-[7rem]">

          {/* main image */}
          <div className="h-fit w-full flex justify-center">
            <div className="h-auto px-3">
              <Image
                className="h-auto md:w-[20vw] w-[50vw] rounded-sm hover:scale-105  transition ease-linear duration-300"
                src={currentImage}
                width={500}
                height={500}
                alt="Prod image"
                loading="lazy"
              />
            </div>
          </div>

          {/* option images */}
          <div className="mt-3">

            <div className="flex justify-center py-3 gap-2 flex-wrap px-2">
              {images.map((image, index) => (
                <Fragment key={index}>
                  <Image
                    className={`border cursor-pointer rounded-md transition ease-linear duration-300  ${currentImage == image.url ? "border-b-violet-500 border-2 shadow-md scale-110 hover:scale-110" : " hover:shadow-md  hover:scale-105 "}`}
                    src={image.url}
                    width={50}
                    height={50}
                    alt={`Prod image ${index + 1}`}
                    onClick={() => handleImageClick(image.url)}
                  />
                </Fragment>
              ))}
            </div>

            {/* buttons */}
            <div className="w-full flex gap-3 justify-center mt-2">



              <button

                onClick={handleClick}
                className={`border-2 p-2 rounded-md transition ease-linear duration-300 ${!isProductExistInCart
                  ? "bg-violet-900 border-violet-700 text-white hover:bg-violet-800"
                  : "bg-gray-400 hover:bg-gray-500 text-white/75"
                  }`}
                disabled={isAddingToCart}
              >
                {isProductExistInCart ? "Remove from cart" : "Add to Cart"}
              </button>


              <button
                onClick={handleBuyButton}
                className="border-2 border-violet-800 hover:bg-violet-900 hover:text-white p-2 rounded-md dark:text-black transition ease-linear duration-300 px-5">
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProdImage;
