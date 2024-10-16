"use client";
import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import loadingAnimation from "@/../public/loadingballs.json";
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
import toast from "react-hot-toast";
import BlurIn from "@/components/magicui/blur-in";
import useShippingdetail from "@/hooks/shippingDetail/useShippingDetails";

const formSchema = z.object({
    city: z.string().min(2, {
        message: "Enter a valid city",
    }),
    state: z.string().min(2, {
        message: "Enter a valid state",
    }),
    country: z.string().min(2, {
        message: "Enter a valid country",
    }),
    address: z.string().min(2, {
        message: "Enter a valid address",
    }),
    pincode: z.coerce.number()
        .refine((val) => val.toString().length === 6, {
            message: "Enter a valid 6-digit pincode",
        }),
    phone: z.coerce.number()
        .refine((val) => val.toString().length >= 10 && val.toString().length <= 12, {
            message: "Enter a valid phone number (10-12 digits)",
        }), 
});



export const CheckOutForm: FC = () => {
    const [isLoaderShow, setIsLoaderShow] = useState<boolean>(false)
    const { data: shippingDetails } = useShippingdetail()
    const router = useRouter();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            city: "",
            address: "",
            state: " ",
            country: "INDIA",





        },
    });

    useEffect(() => {

        if (shippingDetails) {

            form.reset({
                address: shippingDetails?.address || "",
                state: shippingDetails?.state || "",
                city: shippingDetails?.city || "",
                pincode: shippingDetails?.pinCode || 0,
                phone: shippingDetails?.phoneNo || 0,


            });
        }
    }, [, form.reset, shippingDetails]);



    const onSubmit = async (data: z.infer<typeof formSchema>) => {

        const shippingInfo = {
            address: data.address,
            city: data.city,
            state: data.state,
            country: data.country,
            pinCode: Number(data.pincode), // Convert pincode to a number
            phoneNo: Number(data.phone),   // Convert phone number to a number
        };



        try {
            setIsLoaderShow(true)
            const response = await axios.put("https://harman-spare-parts-backend.vercel.app/api/v1/shipping/shippingInfo", shippingInfo,
                {
                    headers: {
                        Authorization: Cookies.get('HSPToken'),
                    }
                });

            if (response.data.success) {
                toast.success("shipping address submitted")
                router.back()
                setIsLoaderShow(false)
            }
        } catch (error) {
            console.error("Error in saving shipping Info:", error);
        }
    };

    return (
        <div className="md:px-12 px-6 py-5 h-auto text-black">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 lg:w-3/4 ">
                    <h1 className="text-center text-2xl font-bold text-black/75">
                        <BlurIn
                            word=" Fill Shipping Details"
                            className="text-4xl font-bold text-black dark:text-white"
                        />

                    </h1>
                    <div className=" w-full flex gap-2">

                        {/* city */}
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input
                                            autoComplete="off"
                                            {...field}
                                            className="text-black "
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
                                <FormItem className="w-full">
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input
                                            autoComplete="off"
                                            {...field}
                                            className="text-black"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

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
                                        className="h-24 min-h-24 max-h-24"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex gap-2">
                        {/* country */}
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Country</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={"INDIA"}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue />
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
                        {/* pincode */}
                        <FormField
                            control={form.control}
                            name="pincode"
                            render={({ field }) => (
                                <FormItem className="w-full">
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
                    </div>

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
                    <div className="pt-7">
                        <Button
                            className="relative overflow-hidden "
                            variant={"hspButton"}
                            type="submit">
                            {
                                isLoaderShow ? <div className=" w-full h-full absolute bottom-8 "> <Lottie className="h-[6rem] w-auto overflow-hidden " animationData={loadingAnimation} loop={true} /></div>
                                    :
                                    <h1>Submit</h1>
                            }

                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
