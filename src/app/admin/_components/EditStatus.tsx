"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import updateOrderStatus from "@/services/order/updateOrder";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  setIsOpen: (status: boolean) => void;
  orderId: string;
}

const EditStatus: React.FC<Props> = ({ setIsOpen, orderId }) => {
  const [orderStatus, setOrderStatus] = React.useState<string>("Processing");
  const [paymentStatus, setPaymentStatus] = React.useState<string>("Pending");
  const queryClient = useQueryClient()
  const updateHandler = async () => {
    try {
      const response = await updateOrderStatus(orderId, orderStatus, paymentStatus);
      setIsOpen(false)
      queryClient.invalidateQueries({ queryKey: ['AllOrders'] })
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100);
  }, [])

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-40  bg-white/75 backdrop-blur-md flex flex-col items-center justify-start py-[5rem]">
      <Card x-chunk="dashboard-07-chunk-3">
        <div
          onClick={() => setIsOpen(false)}
          className="p-2 float-end bg-red-200 rounded-bl-2xl shadow-md hover:bg-red-300 cursor-pointer"
        >
          <X />
        </div>
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 w-[25rem]">
            <div className="grid gap-3">
              <Label htmlFor="payment-status">Payment Status 💲</Label>
              <Select onValueChange={(value) => setPaymentStatus(value)} value={paymentStatus}>
                <SelectTrigger id="payment-status" aria-label="Select payment status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending 💲❌</SelectItem>
                  <SelectItem value="Success">Success 💲✅</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>

        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="delivery-status">Delivery Status 🚚</Label>
              <Select onValueChange={(value) => setOrderStatus(value)} value={orderStatus}>
                <SelectTrigger id="delivery-status" aria-label="Select delivery status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Out-For-Delivery">Out-For-Delivery</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Returned">Returned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>

        <CardContent>
          <Button
            onClick={updateHandler}
            variant={"hspButton"}
          >
            Update
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditStatus;
