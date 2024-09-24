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
    shippingId: string;
}


const OrderDetails: React.FC<Props> = ({ setIsOpen, shippingId }) => {
    const [fullDetail, setFullDetail] = React.useState<any>({})
    const getShippingAddressAndUser = async () => {
        const response = await getAddress(shippingId)
        setFullDetail(response?.data.address)

    }

    React.useEffect(() => {
        getShippingAddressAndUser()
    }, [])

    const printHandler=()=>{
        window.print()
    }
    const screenShotHandler=async()=>{
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

    return (
        <div className="absolute z-40 top-0 h-screen w-full bg-white/50 backdrop-blur-md flex justify-center items-center">
            <Card className="w-[550px]">
                <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                    <CardDescription>Address of user where we have to ship the order.</CardDescription>
                </CardHeader>
                <CardContent>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-6">
                            <p className="font-semibold">Address:</p>
                            <p>{fullDetail?.shippingDetails?.address || "Loading...."}</p>
                        </div>

                        <div className="flex gap-6">
                            <p className="font-semibold">State:</p>
                            <p>{fullDetail?.shippingDetails?.state || "Loading...."}</p>
                        </div>

                        <div className="flex gap-6">
                            <p className="font-semibold">City:</p>
                            <p>{fullDetail?.shippingDetails?.city || "Loading...."}</p>
                        </div>

                        <div className="flex gap-6">
                            <p className="font-semibold">Country:</p>
                            <p>{fullDetail?.shippingDetails?.country || "Loading...."}</p>
                        </div>

                        <div className="flex gap-6">
                            <p className="font-semibold">Pincode:</p>
                            <p>{fullDetail?.shippingDetails?.pinCode || "Loading...."}</p>
                        </div>

                        <div className="flex gap-6">
                            <p className="font-semibold">Phone:</p>
                            <p>{fullDetail?.shippingDetails?.phoneNo || "Loading...."}</p>
                        </div>

                        <div className="flex gap-6">
                            <p className="font-semibold">Client Name:</p>
                            <p>{fullDetail?.user?.name || "Loading...."}</p>
                        </div>

                        <div className="flex gap-6">
                            <p className="font-semibold">Email:</p>
                            <p>{fullDetail?.user?.email || "Loading...."}</p>
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