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
import getAddress from "@/services/shipping/shippingAddress";
import html2canvas from 'html2canvas';

interface Props {
    setIsOpen: (status: boolean) => void;
    shippingDetail : any;
    message : string;
    isCOD : boolean;
}


const OrderDetails: React.FC<Props> = ({ setIsOpen, shippingDetail , message, isCOD}) => {

    const printHandler = () => {
        window.print()
    }
    const screenShotHandler = async () => {
        const canvas = await html2canvas(document.body);

        // Convert the canvas to a data URL
        const dataUrl = canvas.toDataURL('image/png');

        // Create a link element to download the image
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'shippingDetail.png';

        // Programmatically trigger the download
        link.click();
    }
    React.useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    },[])

    return (
        <div className="absolute z-40 top-0 bottom-0 left-0 right-0 w-full bg-white/50 backdrop-blur-md flex py-[5rem] justify-center ">
            <Card className="w-[550px] h-fit">
                <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                    <CardDescription>Address of user where we have to ship the order.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-6">
                            <p className="font-semibold">Address:</p>
                            <p>{shippingDetail?.shippingInfo?.address || "Loading...."}</p>
                        </div>

                        <div className="flex gap-6">
                            <p className="font-semibold">State:</p>
                            <p>{shippingDetail?.shippingInfo?.state || "Loading...."}</p>
                        </div>

                        <div className="flex gap-6">
                            <p className="font-semibold">City:</p>
                            <p>{shippingDetail?.shippingInfo?.city || "Loading...."}</p>
                        </div>

                        <div className="flex gap-6">
                            <p className="font-semibold">Country:</p>
                            <p>{shippingDetail?.shippingInfo?.country || "Loading...."}</p>
                        </div>

                        <div className="flex gap-6">
                            <p className="font-semibold">Pincode:</p>
                            <p>{shippingDetail?.shippingInfo?.pinCode || "Loading...."}</p>
                        </div>

                        <div className="flex gap-6">
                            <p className="font-semibold">Phone:</p>
                            <p>{shippingDetail?.shippingInfo?.phoneNo || "Loading...."}</p>
                        </div>

                        <div className="flex gap-6">
                            <p className="font-semibold">Client Name:</p>
                            <p>{shippingDetail?.user?.name || "Loading...."}</p>
                        </div>

                        <div className="flex gap-6">
                            <p className="font-semibold">Payment Method:</p>
                            <p>{isCOD ? "Cash-On-Delivery" : "Online Payment"}</p>
                        </div>

                        <div className="flex gap-6">
                            <p className="font-semibold">Email:</p>
                            <p>{shippingDetail?.user?.email || "Loading...."}</p>
                        </div>

                        <div className="flex gap-6">
                            <p className="font-semibold">Message:</p>
                            <p>{message || "No Message"}</p>
                        </div>

                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button onClick={printHandler}>Print</Button>
                    <Button onClick={screenShotHandler}>ScreenShot</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
export default OrderDetails