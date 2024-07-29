"use client";
import { FC, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import useCartdetail from "@/hooks/cart/cartDetail";
import { Button } from "@/components/ui/button";
import useRazorpay from "react-razorpay";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Cookies from "js-cookie";

const formSchema = z.object({
    city: z.string().min(2, {
        message: "Enter valid city",
    }),
    state: z.string().min(2, {
        message: "Enter valid state",
    }),
    country: z.string().min(2, {
        message: "Enter valid country",
    }),
    address: z.string().min(2, {
        message: "Enter valid address",
    }),
    pincode: z.string().regex(/^\d{6}$/, {
        message: "Enter valid 6-digit pincode",
    }),
    phone: z.string().regex(/^\d{10,12}$/, {
        message: "Enter valid phone number (10-12 digits)",
    }),
});

export const CheckOutForm: FC = () => {
    const router = useRouter();
    const [Razorpay] = useRazorpay();
    const { isLoading, error, data: cartProducts } = useCartdetail();

    useEffect(() => {
        if (cartProducts) {
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        }
    }, [cartProducts, isLoading, error]);

    useEffect(() => {
        return () => {
            localStorage.removeItem("cartProducts");
        };
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            city: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        if (!cartProducts) return;

        const shippingInfo = {
            address: data.address,
            city: data.city,
            state: data.state,
            country: data.country,
            pinCode: parseInt(data.pincode),
            phoneNo: parseInt(data.phone),
        };

        const orderData = {
            shippingInfo,
            orderItems: cartProducts.products.map((product: any) => ({
                name: product.product.productId.name ,  // Add a default value if necessary
                price: product.product.productId.price,
                quantity: product.product.prodQuantity,
                image:  "default-image.jpg",  // Add a default value if necessary
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
        
            if (response.data.success) {
                console.log(`>>>>>>>>>>>payment success`,response.data.order.totalPrice)
                // Initialize Razorpay payment
                const options = {
                    key: "rzp_test_980PnjWWdgqLfA",
                    amount: 100,   // response.data.order.totalPrice
                    currency: "INR",
                    name: "Harman Spare Parts",
                    description: "Test Transaction",
                    image: "https://example.com/your_logo",
                    order_id: response.data.order.id, // Order ID from your order creation response
                    handler: function (response: any) {
                        alert(response.razorpay_payment_id);
                        alert(response.razorpay_order_id);
                        alert(response.razorpay_signature);
                        // Optionally, you can redirect the user to the success page
                        // router.push(`/order/success/${response.data.order._id}`);
                    },
                    prefill: {
                        name: "Gaurav Kumar",
                        email: "gaurav.kumar@example.com",
                        contact: "9000090000",
                    },
                    notes: {
                        address: "Razorpay Corporate Office",
                    },
                    theme: {
                        color: "#3399cc",
                    },
                };
                const rzp1 = new Razorpay(options);
                rzp1.open();
            }
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    return (
        <div className="px-12 py-5 h-auto text-black">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-3/4">
                    {/* city */}
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="off"
                                        placeholder="Enter your city"
                                        {...field}
                                        className="text-black"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* state */}
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="off"
                                        placeholder="Enter your state"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* country */}
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your country" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="India">India</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* address */}
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter Your Address"
                                        id="message"
                                        {...field}
                                        className="max-h-24 min-h-8"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* pincode */}
                    <FormField
                        control={form.control}
                        name="pincode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pincode</FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="off"
                                        placeholder="Enter your pincode"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* phone */}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="off"
                                        placeholder="Enter your phone number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};
