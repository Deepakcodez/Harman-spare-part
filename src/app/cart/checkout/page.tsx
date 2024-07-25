import { CheckOutForm } from "@/app/_Components/checkoutComp/CheckOutForm";
import React from "react";


const CheckOut:React.FC = () => {
  return (
    <>
    <div className="w-full min-h-screen max-screen grid grid-cols-2">
    <div className="grid-cols-6 pt-[4.2rem] ">
      <CheckOutForm/>
    </div>
    <div className="grid-cols-6 pt-[4.2rem] ">prod detaail</div>
     
    </div>
    </>
  )
}
export default CheckOut