"use client"
import React from "react"
import { useRouter } from "next/navigation";
import useShippingdetail from "@/hooks/shippingDetail/useShippingDetails";
import useCartProductStore from "@/Store/CartCount/usecartProducts";
import { PuffLoader } from "react-spinners";
import PlaceCartOrder from "./PlaceCartOrder";
import { ChevronDown } from "lucide-react";

const OrderSummary: React.FC = () => {
    const router = useRouter();
    const { setCart, cart: cartProducts, isLoadingInStore, isErrorInStore } = useCartProductStore();
    const { data: shippingDetails } = useShippingdetail()
    const [isShowPopUp, setIsShowPopUp] = React.useState<boolean>(false)
    const [paymentMethod, setPaymentMethod] = React.useState<"cod" | "online">("online")

    const addShippingInfo = () => {
        router.push('/cart/shippingDetail')
    }




    return (
        <div className="bg-white h-auto w-full mt-[5rem] shadow-md rounded-md px-4 py-4 ">
            {
                isShowPopUp &&
                <PlaceCartOrder
                    setIsOpen={setIsShowPopUp}
                    cartProducts={cartProducts} 
                    paymentMethod={paymentMethod}
                    shippingDetails = {shippingDetails}/>
            }
            <h1 className="text-2xl">Order Summary</h1>
            <h1 className="text-black/75 flex ">
                Total Amount : {isLoadingInStore ?
                    <div className="bg-violet-100 rounded-md ms-1 w-4/12 animate-pulse"></div>
                    :
                    <div>₹ {cartProducts?.totalPrice}</div>}
            </h1>

            <div data-theme="light" className="dropdown">
              <summary tabIndex={0} role="button" className=" py-2 flex gap-3 bg-violet-100 px-4 rounded-lg m-1 text-black/75">
                <h1>{paymentMethod === "online" ? "Online Payment" : "Cash On Delivery"}</h1>
                <ChevronDown />
              </summary>
              <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li
                  onClick={() => setPaymentMethod("online")}
                  className="hover:bg-violet-100 cursor-pointer mb-2 px-2 rounded-lg">Online Payment</li>
                <li onClick={() => setPaymentMethod("cod")}
                  className="hover:bg-violet-100 cursor-pointer px-2 rounded-lg">
                  Cash On Delivery
                </li>
              </ul>
            </div>

            {
                cartProducts ?
                    <div className="w-full flex flex-col  ">
                        {
                            !shippingDetails &&
                            <button
                                onClick={addShippingInfo}
                                className=" min-w-1/2  w-full border border-violet-600  rounded-md text-black hover:text-white text-sm hover:bg-violet-600 py-2 mt-4 ">
                                Add Address
                            </button>
                        }
                        <button
                            disabled={cartProducts && cartProducts?.products?.length >= 1 ? false : true}
                            onClick={() => setIsShowPopUp(true)}
                            className=" min-w-1/2 max-w-1/2 w-full bg-violet-600 ring-2 ring-violet-500 rounded-md text-white text-sm hover:bg-violet-500 py-1 mt-4 ">
                            Checkout
                        </button>
                    </div>
                    :
                    <div className="w-full flex justify-center">
                        <PuffLoader size={40} color="#a78bfa" />
                    </div>
            }

            {
                shippingDetails &&
                <p className="text-black/50 text-sm text-center mt-4 hover:underline">
                    <span onClick={addShippingInfo} className="text-blue-600 cursor-pointer">
                        edit {" "}
                    </span>
                    shipping address
                </p>

            }


        </div>
    )
}
export default OrderSummary