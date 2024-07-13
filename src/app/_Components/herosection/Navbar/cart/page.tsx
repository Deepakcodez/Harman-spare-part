"use client"
import { PiShoppingCartSimpleThin } from "react-icons/pi";


import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useCartDetailStore } from "@/Store/CartCount/useCartDetail";
import { log } from "console";
import Link from "next/link";
const Cart = () => {
  const { isLoading, error, checkProductInCart,cartCount,setCartCount  } = useCartDetailStore();
  const token = Cookies.get("HSPToken"); 


  useEffect(() => {
    const fetchCartDetails = async () => {
      if (token) { // Ensure token is defined
        try {
          const cart = await checkProductInCart(token);
          setCartCount(cart.products.length)
        } catch (error) {
          console.error('Error fetching cart details:', error);
        }
      } else {
        console.error('Token is not defined');
      }
    };
  
    fetchCartDetails();
  }, [checkProductInCart, token]);


  
    return ( 
        <>
        <Link href={'/cart'} className="relative  ">
          {
            cartCount>0&&
          <h1 className=" absolute text-white bg-violet-500 text-[.6rem]  h-3 w-3 max-h-5 max-h-5 rounded-full shadow-md font-semibold left-[1rem] text-center flex justify-center items-center top-0 p-2 " >{cartCount}</h1>
        }
          <PiShoppingCartSimpleThin size={25} color="black"  />
        </Link>
        </>
     );
}
 
export default Cart;