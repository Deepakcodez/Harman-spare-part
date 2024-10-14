"use client"
import { ProgressiveImage } from "@/app/_Components/progressiveImage/ProgressiveImage";
import { useSingleProduct } from "@/hooks/products/useSingleProduct";
import { PuffLoader } from 'react-spinners'
import React from "react"
import useShippingdetail from "@/hooks/shippingDetail/useShippingDetails";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import placeOder from "@/services/order/PlaceOrder";
import { OrderDataType } from "@/types/shipping.types";
import PlaceOrder from "../_components/placeOrder";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";
interface ProductProps {
  params: {
    productid: string;
  };
}


const SingleProdBuy: React.FC<ProductProps> = ({ params }) => {
  const { data, error } = useSingleProduct(params.productid);
  const { data: shippingDetails } = useShippingdetail()
  const [isShowPopUp, setIsShowPopUp] = React.useState<boolean>(false)
  const [paymentMethod, setPaymentMethod] = React.useState<"cod" | "online">("online")

  const router = useRouter();
  React.useEffect(() => {
    if (error) {
      console.log(error);
    }
    console.log('>>>>>>>>>>>', paymentMethod)
  }, [data, paymentMethod])

  const addShippingInfo = () => {
    router.push('/cart/shippingDetail')
  }

  const checkOutHandler = () => {
    setIsShowPopUp(true)
  }

  // const placeOrderHandler = async () => {
  //   const orderData: OrderDataType = {
  //     shippingInfo: shippingDetails?._id ? shippingDetails._id.toString() : "",
  //     orderItems: [{
  //       name: data?.product.name ?? "",
  //       price: data?.product.price ?? 0,
  //       quantity: 1,
  //       image: data?.product.images[0].url ?? "",
  //       product: data?.product._id ? data.product._id.toString() : "",
  //     }],
  //     paymentInfo: {
  //       id: "Cash On Delivery",
  //       status: "pending",
  //     },
  //     itemsPrice: data?.product.price,
  //     taxPrice: 0,
  //     shippingPrice: 0,
  //     totalPrice: data?.product.price,
  //   }
  //   const response = await placeOder(orderData)
  //   if (response?.data.success) {
  //     toast.success("Order Placed Successfully")
  //     router.push("/products")
  //   }

  // }

  return (
    <>
      <div className="relative grid grid-cols-12 min-h-screen h-auto pb-12 ">

        {
          isShowPopUp && <PlaceOrder setIsOpen={setIsShowPopUp} productId={params.productid} paymentMethod={paymentMethod} />
        }

        {/* product detail */}
        <div className="md:col-span-8 col-span-12  lg:px-12  px-3  ">
          <div className="bg-white     h-auto w-full mt-[5rem] shadow-md r ounded-md p-2 py-4">
            <h1 className="text-black text-2xl ">Product Details</h1>

            <div className="relative w-full flex flex-col items-center  justify-center">

              <div className=" w-2/4 md:w-1/4 aspect-square ">
                <ProgressiveImage src={data?.product?.images} />
              </div>
              {data?.product ?
                <div className="flex flex-col gap-3 items-center md:w-2/4 px-2 md:px-0">
                  <h1 className="text-xl font-semibold  ">{data?.product.name}</h1>
                  <h1 className="text-xs text-slate-500  text-left w-full">
                    {data?.product.description}
                  </h1>
                  <div className={`absolute top-4 right-4 px-4 rounded-full text-xs ${data?.product?.stock && data.product.stock > 0 ? "bg-green-400/50 border-2 border-green-300" : "bg-red-400 "}`}>{data?.product?.stock && data.product.stock > 0 ? "Available" : "Out of Stock"}
                  </div>
                  <div className="flex items-center justify-start gap-2 ">
                    <h1 className="text-2xl w-full text-left ">₹{data?.product.price}</h1>
                    {
                      (data?.product?.refPrice ?? 0) > 0 && (
                        <h1 className="text-md text-red-600/50  line-through"> ₹{data.product.refPrice}/-</h1>)
                    }
                  </div>
                </div>
                :
                <div className="my-4">
                  <PuffLoader size={40} color="#a78bfa" />

                </div>
              }
            </div>

          </div>
        </div>

        {/*sidebar  price card */}
        <div className="md:col-span-4 col-span-12 lg:pe-12   px-3 ">
          <div className="bg-white h-auto w-full mt-[5rem] shadow-md rounded-md p-2 py-4 ">
            <h1 className="text-2xl">Order Summary</h1>
            <h1 className="text-black/75 flex">
              Total Amount : {data?.product ?
                <div>{data?.product.price}</div>
                :
                <div> Loading.....</div>
              }
            </h1>

            {/* dropdown */}
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


            <div className="w-full flex flex-col  px-4">

              {
                !shippingDetails &&
                <button
                  onClick={addShippingInfo}
                  className=" min-w-1/2  w-full border border-violet-600  rounded-md text-black hover:text-white text-sm hover:bg-violet-600 py-2 mt-4 ">
                  Add Address
                </button>
              }
              <button
                onClick={checkOutHandler}
                className=" min-w-1/2 max-w-1/2 w-full bg-violet-600 ring-2 ring-violet-500 rounded-md text-white text-sm hover:bg-violet-500 py-1 mt-4 ">
                Checkout
              </button>
            </div>
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
        </div>
      </div>
    </>
  )
}

export default SingleProdBuy