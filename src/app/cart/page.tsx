"use client"
import React, { useEffect } from "react";
import useCartdetail from "@/hooks/cart/cartDetail";
import { ProductDetailCard } from "../_Components/cartPage/ProductDetailCard";
import { useRouter } from "next/navigation";
import useCartProductStore from "@/Store/CartCount/usecartProducts";
import useShippingdetail from "@/hooks/shippingDetail/useShippingDetails";
import useRazorpay from "react-razorpay";
import { shippingDetailsTypes } from "@/types/shipping.types";
import axios from "axios";
import Cookies from "js-cookie";


const CartDetail = () => {

  const [Razorpay] = useRazorpay();
  const router = useRouter();
  const { isLoading, error, data: cartProducts } = useCartdetail();
  const { data:shippingDetails} = useShippingdetail()
  const { setCart, cart, setIsLoadingInStore, isLoadingInStore, setIsErrorInStore , isErrorInStore} = useCartProductStore();




  useEffect(() => {
    if (!isLoading && cartProducts) {
      setCart(cartProducts);
      setIsLoadingInStore(isLoading)
      setIsErrorInStore(error)
    }
  }, [isLoading, error, cartProducts, cart, setCart, setIsLoadingInStore, isErrorInStore,setIsErrorInStore])


  const addShippingInfo = () => {
    router.push('/cart/shippingDetail')
  }


   const  shippingAddress: shippingDetailsTypes = {
                          address : shippingDetails?.address,
                          city : shippingDetails?.city,
                          state : shippingDetails?.state,
                          country : shippingDetails?.country,
                          pinCode : shippingDetails?.pinCode,
                          phoneNo : shippingDetails?.phoneNo,
                }



  const CheckOutClickHandler = async () => {
   const orderData = {
            shippingInfo : shippingAddress,
            orderItems: cartProducts.products.map((product: any) => ({
                name: product.product.productId.name ,  
                price: product.product.productId.price,
                quantity: product.product.prodQuantity,
                image:  "default-image.jpg",  
                product: product.product.productId._id,
            })),
            paymentInfo: {
                id: "sample id",
                status: "pending",
            },
            itemsPrice: cartProducts.totalPrice,
            taxPrice: 0,
            shippingPrice: 0,
            totalPrice: cartProducts.totalPrice,
        };

        try {
         
          const response = await axios.post("http://localhost:8000/api/v1/order/create", orderData,
              {
                  headers: {
                      Authorization: Cookies.get('HSPToken'),
                  }
              });

              console.log("user name",response.data, "price",response.data.order.totalPrice,"order id", response.data.razorpayOrder?.id)
      
          if (response.data.success) {
             
              console.log(`>>>>>>>>>>>payment success`,response.data, response.data.razorpayOrder?.id)
              // Initialize Razorpay payment
              var options = {
                  "key": "rzp_test_980PnjWWdgqLfA", 
                  "amount" : response.data.order.totalPrice || 10000,
                  "currency": "INR",
                  "name": "Harman Spare Parts", 
                  "description": "Test Transaction",
                  "image": "https://github.com/Deepakcodez/Harman-spare-part/blob/main/public/logo.png?raw=true",
                  "order_id":response.data.razorpayOrder?.id, 
                  "callback_url": "http://localhost:8000/api/v1/order/paymentVerify",
                  "prefill": {
                      "name": response.data.order.user.name , 
                      "email": response.data.order.user.email ,
                      "contact": response.data.order.shippingInfo.phoneNo 
                  },
                  "notes": {
                      "address": "Rama Mandi Jalandhar"
                  },
                  "theme": {
                      "color": "#a78bfa"
                  }
              };
              const rzp1 = new Razorpay(options);
              rzp1.open();
          }
      } catch (error) {
          console.error("Error creating order:", error);
      }


  }


  return (
    <>
      <div className="grid grid-cols-12 min-h-[100vh] max-h-auto pb-12">
        {/* product detail */}
        <div className="md:col-span-8 col-span-12  lg:px-12  px-3 ">
          <div className="bg-white     h-auto w-full mt-[5rem] shadow-md rounded-md p-2 py-4">
            <h1 className="text-black text-2xl ">Cart</h1>
            <ProductDetailCard />
          </div>
        </div>

        {/*sidebar  price card */}
        <div className="md:col-span-4 col-span-12 lg:pe-12   px-3 ">
          <div className="bg-white h-auto w-full mt-[5rem] shadow-md rounded-md p-2 py-4 ">
            <h1 className="text-2xl">Order Summary</h1>
            <h1 className="text-black/75 flex">
              Total Amount : {isLoading ?
                <div> Loading.....</div>
                :
                <div>{cartProducts?.totalPrice}</div>}
            </h1>
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
              disabled= {cartProducts?.products?.length >=1 ? false : true}
                onClick={CheckOutClickHandler}
                className=" min-w-1/2 max-w-1/2 w-full bg-violet-600 ring-2 ring-violet-500 rounded-md text-white text-sm hover:bg-violet-500 py-1 mt-4 ">
                Checkout
              </button>
            </div>
            {
              shippingDetails &&
              <p className="text-black/75 text-sm text-center mt-4 hover:underline"> <span onClick={addShippingInfo} className="text-blue-600 cursor-pointer">edit</span> shipping address</p>}
          </div>
        </div>
      </div>
    </>
  )
}

export default CartDetail