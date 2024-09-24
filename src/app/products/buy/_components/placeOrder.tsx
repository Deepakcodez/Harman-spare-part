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
import { useSingleProduct } from "@/hooks/products/useSingleProduct";
import useShippingdetail from "@/hooks/shippingDetail/useShippingDetails";
import placeOder from "@/services/order/PlaceOrder";
import toast from "react-hot-toast";
import { OrderDataType } from "@/types/shipping.types";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";


interface Props {
    setIsOpen: (value: boolean) => void;
    productId: string
}

const PlaceOrder: React.FC<Props> = ({ setIsOpen, productId }) => {
    const { data, error } = useSingleProduct(productId);
    const { data: shippingDetails } = useShippingdetail()
    const [message, setMessage] = React.useState<string>("No message")
    const router = useRouter();


    const placeOrderHandler = async () => {
        const orderData: OrderDataType = {
            shippingInfo: shippingDetails?._id ? shippingDetails._id.toString() : "",
            orderItems: [{
                name: data?.product.name ?? "",
                price: data?.product.price ?? 0,
                quantity: 1,
                image: data?.product.images[0].url ?? "",
                product: data?.product._id ? data.product._id.toString() : "",
            }],
            paymentInfo: {
                id: "Cash On Delivery",
                status: "pending",
            },
            itemsPrice: data?.product.price,
            taxPrice: 0,
            shippingPrice: 0,
            totalPrice: data?.product.price,
            userMessage: message,
        }
        const response = await placeOder(orderData)
        if (response?.data.success) {
            toast.success("Order Placed Successfully")
            router.push("/products")
        }

    }

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])



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
                    <Button variant="outline" onClick={() => setIsOpen(false)} >Cancel</Button>
                    <Button variant={"hspButton2"} onClick={placeOrderHandler}>Place Order</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
export default PlaceOrder