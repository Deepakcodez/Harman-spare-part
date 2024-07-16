"use client"
import { useCartDetailStore } from "@/Store/CartCount/useCartDetail";
import Image from "next/image"
import React, { Fragment, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { RxCross1 } from "react-icons/rx";
import mongoose from "mongoose";
import toast from "react-hot-toast";
import axios from "axios";
import { AddProductToCartData, AddProductToCartResponse } from "../_Components/SingleProduct/ProdImage/Prodimage";
import useCartdetail from "@/hooks/cart/cartDetail";
import { ProductDetailCard } from "../_Components/cartPage/ProductDetailCard";



const CartDetail = () => {
  // const { isLoading, error, checkProductInCart, cartCount, setCartCount } = useCartDetailStore();


  
  const [cartProduct, setCartProduct] = useState<any>(null)
  const token = Cookies.get("HSPToken")
  const { isLoading, error, data: cartProducts } = useCartdetail();
 

  

  return (
    <>
      <div className="grid grid-cols-12 min-h-[100vh] max-h-auto pb-12">
        {/* product detail */}
        <div className="md:col-span-8 col-span-12  lg:px-12  px-3 ">
          <div className="bg-white     h-auto w-full mt-[5rem] shadow-md rounded-md p-2 py-4">
            <h1 className="text-black text-2xl ">Cart</h1>




           <ProductDetailCard/>



          </div>
        </div>

        {/*sidebar  price card */}
        <div className="md:col-span-4 col-span-12 lg:pe-12   px-3 ">
          <div className="bg-white h-auto w-full mt-[5rem] shadow-md rounded-md p-2 py-4 ">
            <h1 className="text-2xl">Order Summary</h1>
            <h1 className="text-black/75 flex">
            Total Amount : {isLoading ?
             <div>....</div>
              :
               <div>{cartProducts?.totalPrice}</div>}
            </h1>
            <div className="w-full px-4">
            <button className=" w-full bg-violet-600 ring-2 ring-violet-500 rounded-md text-white hover:bg-violet-500 py-1 mt-4 ">
              Checkout
            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartDetail