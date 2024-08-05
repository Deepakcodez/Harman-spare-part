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
    id: string;
    status: string;
  }

export interface OrderDataType {
    shippingInfo: string;
    orderItems: OrderItemType[];
    paymentInfo: PaymentInfoType;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
  }