import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useSingleProduct } from "@/hooks/products/useSingleProduct";
import useShippingdetail from "@/hooks/shippingDetail/useShippingDetails";
import placeOrder from "@/services/order/PlaceOrder";
import { toast } from "react-hot-toast";
import { OrderDataType } from "@/types/shipping.types";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import useCurrentUserStore from "@/Store/userStore/currentUser";
import Cookies from "js-cookie";


interface Props {
  setIsOpen: (value: boolean) => void;
  productId: string;
  paymentMethod: "cod" | "online";
}

export default function PlaceOrder({ setIsOpen, productId, paymentMethod }: Props) {
  const { data } = useSingleProduct(productId);
  const { data: shippingDetails } = useShippingdetail();
  const [message, setMessage] = useState<string>("");
  const {currentUser}=useCurrentUserStore()
  const router = useRouter();
  const token = Cookies.get("HSPToken")



  const createOrderData = (): OrderDataType => ({
    shippingInfo: shippingDetails?._id?.toString() ?? "",
    orderItems: [
      {
        name: data?.product.name ?? "",
        price: data?.product.price ?? 0,
        quantity: 1,
        image: data?.product.images[0]?.url ?? "",
        product: data?.product._id?.toString() ?? "",
      },
    ],
    paymentInfo: {
      method: paymentMethod,
      status: paymentMethod === "cod" ? "Pending" : "Success",
    },
    itemsPrice: data?.product.price ?? 0,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: data?.product.price ?? 0,
    userMessage: message,
  });

  const placeOrderHandler = async () => {
    try {
    let paymentData = createOrderData();
      const response = await placeOrder(paymentData);
      if (response?.data.success) {
        toast.success("Order Placed Successfully");
        router.push("/products");
      } else {
        toast.error("Failed to place the order. Please try again.");
      }
    } catch (error) {
      console.error("Error in placing order:", error);
      toast.error("Error in placing order.");
    }
  };

  const initiateRazorpayPayment = async () => {
    try {
      const createOrderResponse = await axios.post('http://localhost:8000/api/v1/order/razorpayorder', {
        productId: productId,
        shippingInfo : shippingDetails?._id?.toString() ?? "",
        userId :  currentUser._id,
        userMessage: message 
      }, {
        headers: { Authorization: token },
      });

      const { id, amount } = createOrderResponse.data.razorpayOrder;
      console.log('Razorpay Order ID:', id);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
        order_id: id,
        amount: amount,
        currency: "INR",
        name: data?.product.name || "No product name",
        description: "Order Payment",
        handler: async (response: any) => {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
          console.log('Payment response:', razorpay_order_id, razorpay_payment_id, razorpay_signature);

          try {
            const verificationResponse = await axios.post(
              "http://localhost:8000/api/v1/order/paymentVerify",
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
              },{
                headers: { Authorization: token },
              }
            );
            if(verificationResponse?.data.success){
                router.push("/products");
                toast.success("Payment Verified and order created Successfully");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          name: "John Doe",
          email: "email@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      toast.error("Failed to initiate payment.");
    }
  };

  const handlePlaceOrder = async () => {
    if (paymentMethod === "cod") {
      await placeOrderHandler();
    } else {
      await initiateRazorpayPayment();
    }
  };    

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle>Confirmation</CardTitle>
          <CardDescription>
            Do you want to place an order on the existing address or{" "}
            <Link href="/cart/shippingDetail" className="text-primary hover:underline">
              Update the address
            </Link>
            ?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Additional Message</h2>
          <p className="text-sm text-gray-500 mb-2">
            Write any message you want to send us (optional). Abusive or offensive messages are prohibited.
          </p>
          <Textarea
            className="w-full"
            placeholder="Type your message here."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}