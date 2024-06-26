import { useAppSelector } from "@/lib/store/hooks";
import { ShoppingCart } from "lucide-react";

const Cart = () => {
  const items = useAppSelector(state=> state.cart.items)
    return ( 
        <>
        <div className="relative bg-[#efff01] hover:bg-white  px-5 shadow-md p-3 rounded-full ">
          <h1 className=" absolute text-white bg-violet-500 text-[.6rem] h-5 w-5 rounded-full shadow-md font-semibold left-[1.9rem] text-center flex justify-center items-center top-1 " >{items.length}</h1>
          <ShoppingCart color="black"  />
        </div>
        </>
     );
}
 
export default Cart;