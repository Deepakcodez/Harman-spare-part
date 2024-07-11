"use client"
// import useCartStore from "@/Store/CartCount/useCartCount";
import { ShoppingCart } from "lucide-react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useCartDetailStore } from "@/Store/CartCount/useCartDetail";
import { log } from "console";
const Cart = () => {
  const { isLoading, error, checkProductInCart,cartCount  } = useCartDetailStore();
  const [cartDetails, setCartDetails] = useState<any>(null); 
  const token = Cookies.get("HSPToken"); // Replace with actual token or fetch from your authentication context


  useEffect(() => {
    const fetchCartDetails = async () => {
      if (token) { // Ensure token is defined
        try {
          const cart = await checkProductInCart(token);
          setCartDetails(cart); // Update state with cart details
          console.log('>>>>>>>>>>>', cart)
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
        <div className="relative bg-[#efff01] hover:bg-white   shadow-md p-3 rounded-full ">
          <h1 className=" absolute text-white bg-violet-500 text-[.6rem] md:h-5 md:w-5 h-3 w-3 rounded-full shadow-md font-semibold left-[1.9rem] text-center flex justify-center items-center top-1 " >{cartCount}</h1>
          <ShoppingCart color="black"  />
        </div>
        </>
     );
}
 
export default Cart;