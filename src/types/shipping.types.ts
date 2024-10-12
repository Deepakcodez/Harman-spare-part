export interface shippingDetailsTypes {
        address : string;
        state : string;
        city : string;
        country : string;
        pinCode : number;
        phoneNo : number;
}

interface OrderItemType {
    name: string;
    price: number;
    quantity: number;
    image: string;
    product: string;
  }
  interface PaymentInfoType {
    method: string;
    status: string;
  }

export interface OrderDataType {
    shippingInfo: string  | undefined;
    orderItems: OrderItemType[]  | undefined;
    paymentInfo: PaymentInfoType  | undefined;
    itemsPrice: number | undefined;
    taxPrice: number  | undefined;
    shippingPrice: number  | undefined;
    totalPrice: number  | undefined;
    userMessage?: string;
    orderStatus?: "Processing" | "Out-For-Delivery" | "Delivered" | "Returned"
  }