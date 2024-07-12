"use client"
// import useCartStore from "@/Store/CartCount/useCartCount";
import { ShoppingCart } from "lucide-react";
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
        <Link href={'/cart'} className="relative bg-[#efff01] hover:bg-white   shadow-md p-3 rounded-full ">
          {
            cartCount>0&&
          <h1 className=" absolute text-white bg-violet-500 text-[.6rem] md:h-5 md:w-5 h-3 w-3 rounded-full shadow-md font-semibold left-[1.9rem] text-center flex justify-center items-center top-1 " >{cartCount}</h1>
        }
          <ShoppingCart color="black"  />
        </Link>
        </>
     );
}
 
export default Cart;