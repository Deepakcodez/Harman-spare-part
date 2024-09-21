"use client"
import React from "react";
import useCartdetail from "@/hooks/cart/cartDetail";
import { ProductDetailCard } from "../_Components/cartPage/ProductDetailCard";
import { useRouter } from "next/navigation";
import useCartProductStore from "@/Store/CartCount/usecartProducts";
// import useRazorpay from "react-razorpay";
import YourOrder from "./_components/YourOrder";
import OrderSummary from "./_components/OrderSummary";


const CartDetail = () => {

  // const [Razorpay] = useRazorpay();
  const router = useRouter();
  const { isLoading, error, data: cartProducts } = useCartdetail();
  const { setCart, cart, setIsLoadingInStore, isLoadingInStore, setIsErrorInStore, isErrorInStore } = useCartProductStore();

 React.useEffect(() => {
    if (!isLoading && cartProducts) {
      setCart(cartProducts);
      setIsLoadingInStore(isLoading)
      setIsErrorInStore(error)
    }
    console.log('>>>>>>>>>>>', process.env.NEXT_PUBLIC_API_URL)
  }, [isLoading, error, cartProducts, cart, setCart, setIsLoadingInStore, isErrorInStore, setIsErrorInStore,])

  // const CheckOutClickHandler = async () => {

  //   if (!shippingDetails) {
  //     toast.error("Add Shipping Address")
  //     return
  //   }
  //   if (cartProducts?.products?.length < 1) {
  //     toast.error("Add Products in cart")
  //     return
  //   }
  //   const orderData: OrderDataType = {
  //     shippingInfo: shippingDetails?._id,
  //     orderItems: cartProducts.products.map((product: any) => ({
  //       name: product.product.productId.name,
  //       price: product.product.productId.price,
  //       quantity: product.product.prodQuantity,
  //       image: "default-image.jpg",
  //       product: product.product.productId._id,
  //     })),
  //     paymentInfo: {
  //       id: "sample id",
  //       status: "pending",
  //     },
  //     itemsPrice: cartProducts.totalPrice,
  //     taxPrice: 0,
  //     shippingPrice: 0,
  //     totalPrice: cartProducts.totalPrice,
  //   };




  //   try {
  //     const response = await axios.post("http://localhost:8000/api/v1/order/create", orderData,
  //       {
  //         headers: {
  //           Authorization: Cookies.get('HSPToken'),
  //         }
  //       });

  //     console.log("user name", response.data, "price", response.data.order.totalPrice, "order id", response.data.razorpayOrder?.id)

  //     if (response.data.success) {

  //       console.log(`>>>>>>>>>>>payment success`, response.data, response.data.razorpayOrder?.id)
  //       // Initialize Razorpay payment
  //       var options = {
  //         "key": "rzp_test_gNPLsBsw66mZ7m",
  //         "amount": response.data.order.totalPrice || 10000,
  //         "currency": "INR",
  //         "name": "Harman Spare Parts",
  //         "description": "Test Transaction",
  //         "image": "https://github.com/Deepakcodez/Harman-spare-part/blob/main/public/logo.png?raw=true",
  //         "order_id": response.data.razorpayOrder?.id,
  //         "callback_url": "http://localhost:8000/api/v1/order/paymentVerify",
  //         "prefill": {
  //           "name": response.data.order.user.name,
  //           "email": response.data.order.user.email,
  //           "contact": response.data.order.shippingInfo.phoneNo
  //         },
  //         "notes": {
  //           "address": "Rama Mandi Jalandhar"
  //         },
  //         "theme": {
  //           "color": "#a78bfa"
  //         }
  //       };
  //       const rzp1 = new Razorpay(options);
  //       rzp1.open();
  //     }
  //   } catch (error) {
  //     toast.error("something went wrong")
  //     console.error("Error creating order:", error);
  //   }


  // }

 

  return (
    <>
      <div className="grid grid-cols-12 min-h-[100vh] max-h-auto pb-12">
        {/* product detail */}
        <div className="md:col-span-8 col-span-12  lg:px-12  px-3 ">
          <div className="bg-white h-auto w-full mt-[5rem] shadow-md rounded-md p-2 py-4">
            <h1 className="text-black text-2xl ">Cart</h1>
            <ProductDetailCard />
          </div>
        </div>
        {/*sidebar  price card */}
        <div className="md:col-span-4 col-span-12 lg:pe-12  px-3 ">
          {/* order summary card */}
          <OrderSummary/>
          {/* your orders card*/}
          <YourOrder/>
        </div>
      </div>
    </>
  )
}

export default CartDetail