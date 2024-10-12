"use client"
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useCartCountStore } from "@/Store/CartCount/useCartCountStore"; // Import the Zustand store
import Link from "next/link";
import useCartdetail from "@/hooks/cart/cartDetail";

const Cart = () => {
  const token = Cookies.get("HSPToken"); 
  const {data: cart, isLoading, error  } = useCartdetail();
  const { cartCount, setCartCount } = useCartCountStore(); 
  
  useEffect(() => {
    if (cart) {
      setCartCount(cart.products?.length || 0);
    }
  }, [cart, isLoading, error, setCartCount]);

  return ( 
    <>
      <Link href={'/cart'} className="relative">
        {cartCount > 0 && (
          <h1 className="absolute text-white bg-violet-500 text-[.6rem] h-3 w-3 max-h-5  rounded-full shadow-md font-semibold left-[1rem] text-center flex justify-center items-center top-0 p-2">
            {cartCount}
          </h1>
        )}
        <PiShoppingCartSimpleThin size={25} color="black" />
      </Link>
    </>
  );
}

export default Cart;
