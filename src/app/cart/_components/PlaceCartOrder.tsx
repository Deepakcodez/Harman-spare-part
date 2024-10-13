"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import useShippingdetail from "@/hooks/shippingDetail/useShippingDetails";
import placeOder from "@/services/order/PlaceOrder";
import toast from "react-hot-toast";
import { OrderDataType } from "@/types/shipping.types";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { CartDocument } from "@/types/cart.types";


interface Props {
    setIsOpen: (value: boolean) => void;
    cartProducts: CartDocument | null;
}

const PlaceCartOrder: React.FC<Props> = ({ setIsOpen, cartProducts }) => {

    const { data: shippingDetails } = useShippingdetail()
    const [message, setMessage] = React.useState<string>("No message")
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const router = useRouter();
    const queryClient = useQueryClient()

    
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (!cartProducts) {
        toast.error("No products in the cart to place the order");
        return;
    }
   



    const placeOrderHandler = async () => {
        setIsLoading(true)
        const orderData: OrderDataType = {
            shippingInfo: shippingDetails?._id,
            orderItems: cartProducts?.products.map((product: any) => ({
                name: product.product.productId.name,
                price: product.product.productId.price,
                quantity: product.product.prodQuantity,
                image: product.product.productId.images[0].url,
                product: product.product.productId._id,
            })),
            paymentInfo: {
                method: "Cash-On-Delivery",
                status: "pending",
            },
            itemsPrice: cartProducts?.totalPrice,
            taxPrice: 0,
            shippingPrice: 0,
            totalPrice: cartProducts?.totalPrice,
            userMessage: message,
        }
        const response = await placeOder(orderData)
        queryClient.invalidateQueries({ queryKey: ['cartDetails'] })
        setIsLoading(false)
        if (response?.data.success) {
            toast.success("Order Placed Successfully")
            router.push("/products")
        }
    }





    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/30 backdrop-blur-md z-50 ">
            <Card className="md:w-auto w-10/12  absolute top-[20vh] md:top-[35vh]">
                <CardHeader>
                    <CardTitle>Confirmation</CardTitle>
                    <CardDescription>Are you want to place order on existing address or
                        <Link href={'/cart/shippingDetail'}> <span className="text-violet-700 cursor-pointer">Update the address</span> </Link>.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <h1>Write any message you want to reach us (optional)</h1>
                    <p className="text-xs text-gray-500">Abusive or offensive messages are prohibited.It will not be tolerated.</p>
                    <Textarea
                        className="max-h-24 mt-2"
                        placeholder="Type your message here."
                        onChange={(e) => setMessage(e.target.value)} />
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)} >
                        Cancel
                    </Button>
                    <Button
                        variant={"hspButton2"}
                        onClick={placeOrderHandler}>
                        {isLoading ? "Processing..." : "Place Order"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
export default PlaceCartOrder