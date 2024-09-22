"use client"
import React from "react"
import { useRouter } from "next/navigation";
import useShippingdetail from "@/hooks/shippingDetail/useShippingDetails";
import useCartProductStore from "@/Store/CartCount/usecartProducts";
import toast from "react-hot-toast";
import { OrderDataType } from "@/types/shipping.types";
import {  PuffLoader } from "react-spinners";
import placeOder from "@/services/order/PlaceOrder";
import { useQueryClient } from "@tanstack/react-query";

const OrderSummary: React.FC = () => {
    const router = useRouter();
    const { setCart, cart: cartProducts, isLoadingInStore, isErrorInStore } = useCartProductStore();
    const { data: shippingDetails } = useShippingdetail()
    const queryClient = useQueryClient()

    const addShippingInfo = () => {
        router.push('/cart/shippingDetail')
    }

    React.useEffect(() => {
        console.log('>>>>>>>>>>>cartProducts?.products', cartProducts?.products)
    })

    const checkOutHandler = async () => {
        const orderData: OrderDataType = {
            shippingInfo: shippingDetails?._id,
            orderItems: cartProducts?.products.map((product: any) => ({
                name: product.product.productId.name,
                price: product.product.productId.price,
                quantity: product.product.prodQuantity,
                image:  product.product.productId.images[0].url,
                product: product.product.productId._id,
            })),
            paymentInfo: {
                id: "Cash On Delivery",
                status: "pending",
            },
            itemsPrice: cartProducts?.totalPrice,
            taxPrice: 0,
            shippingPrice: 0,
            totalPrice: cartProducts?.totalPrice,
        }
        const response = await placeOder(orderData)
        queryClient.invalidateQueries({ queryKey: ['cartDetails'] })
        if (response?.data.success) {
            toast.success("Order Placed Successfully")
            router.push("/products")
        }
        // try {
        //     const response = await axios.post("http://localhost:8000/api/v1/order/create", orderData,
        //         {
        //             headers: {
        //                 Authorization: Cookies.get('HSPToken'),
        //             }
        //         });
        //     if (response.data.success) {
        //         toast.success("Order Placed Successfully")
        //         router.push("/products")
        //     }

        // } catch (error) {
        //     toast.error("something went wrong")
        // }
    }

    return (
        <div className="bg-white h-auto w-full mt-[5rem] shadow-md rounded-md px-4 py-4 ">
            <h1 className="text-2xl">Order Summary</h1>
            <h1 className="text-black/75 flex ">
                Total Amount : {isLoadingInStore ?
                    <div className="bg-violet-100 rounded-md ms-1 w-4/12 animate-pulse"></div>
                    :
                    <div>₹ {cartProducts?.totalPrice}</div>}
            </h1>
            <h1 className="text-violet-800 text-xs md:text-sm">
                <span className="text-xl text-black ">*</span>Cash On Delivery</h1>
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
                            onClick={checkOutHandler}
                            className=" min-w-1/2 max-w-1/2 w-full bg-violet-600 ring-2 ring-violet-500 rounded-md text-white text-sm hover:bg-violet-500 py-1 mt-4 ">
                            Place Order
                        </button>
                    </div>
                    :
                    <div className="w-full flex justify-center">
                        <PuffLoader size={40}  color="#a78bfa" />
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