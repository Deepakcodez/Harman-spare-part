"use client"
import useCartProductStore from "@/Store/CartCount/usecartProducts";
import React from "react"

const YourOrder:React.FC = () => {
  const { setCart, cart:cartProducts, setIsLoadingInStore, isLoadingInStore, setIsErrorInStore, isErrorInStore } = useCartProductStore();

  React.useEffect(() => {
   
      console.log('>>>>>>>>>>>', cartProducts)
    
  })

  return (
    <div className="bg-white h-auto w-full mt-[1rem] shadow-md rounded-md px-4 py-4 ">
    <h1 className="text-2xl">Your Orders</h1>
    <div className="w-full flex flex-col  ">

    </div>
   
  </div>
  )
}
export default YourOrder