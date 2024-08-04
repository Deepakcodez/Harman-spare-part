import { CheckOutForm } from "@/app/_Components/checkoutComp/CheckOutForm";
import Image from "next/image";
import React from "react";


const CheckOut:React.FC = () => {
  return (
    <>
    <div className="w-full min-h-screen max-screen grid  order-2 md:grid-cols-2 pb-20">
    <div className="grid-cols-6 md:pt-[4.2rem]  ">
      <CheckOutForm/>
    </div>


    <div className="grid-cols-6 pt-[4.2rem]  order-first md:order-last  flex justify-center">
      <Image
      className=" md:h-auto md:w-auto h-32 w-32"
      src={'/shippingImage.png'}
      alt="shipping Image"
      height={500}
      width={500}
      />
    </div>
     
    </div>
    </>
  )
}
export default CheckOut