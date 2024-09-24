"use client"
import React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import getProduct from "@/services/product/singleProduct"
import { X } from "lucide-react"
import addProduct from "@/services/product/addproduct"
import updateProduct from "@/services/product/updateProduct.ts"
import { useQueryClient } from "@tanstack/react-query"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Product name must be at least 2 characters.",
    }),
    price: z.number().min(0, {
        message: "Price must be a positive number.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    stock: z.number().int().min(0, {
        message: "Stock must be a non-negative integer.",
    }),
    refPrice: z.number().min(0, {
        message: "Reference price must be a positive number.",
    }),
    isFreeDelivery: z.boolean(),
    deliveryCharges: z.number().min(0, {
        message: "Delivery charges must be a positive number.",
    }),
    category: z.string({
        required_error: "Please select a category.",
    }),
})

interface Props {
    setIsOpen: (status: boolean) => void;
    productId: string;
}
const EditProductDetails: React.FC<Props> = ({ setIsOpen, productId }) => {
    const [isSaving, setIsSaving] = useState(false)
    const [isFreeDelivery, setIsFreeDelivery] = useState(false);
    const queryClient = useQueryClient()

    const getProductData = async () => {
        const response: any = await getProduct(productId)
        setIsFreeDelivery(response?.data.product?.isFreeDelivery || false); // Set isFreeDelivery state
        const productData = response?.data.product
        form.reset({
            name: productData?.name || "",
            price: productData?.price || 0,
            description: productData?.description || "",
            stock: productData?.stock || 0,
            refPrice: productData?.refPrice || 0,
            isFreeDelivery: productData?.isFreeDelivery || false,
            deliveryCharges: productData?.deliveryCharges || 0,
            category: productData?.category || "",
        })
    }

    React.useEffect(() => {
        getProductData()
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            price: 0,
            description: "",
            stock: 0,
            refPrice: 0,
            isFreeDelivery: false,
            deliveryCharges: 0,
            category: "",
        },
    })

    const updateHandler = async(values:any) => {
        const response = await updateProduct(productId, values)
        if (response?.status === 200) {
            queryClient.invalidateQueries({ queryKey: ['allProductsAdmin'] })
            setIsOpen(false)

        }
    }
    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSaving(true)
        updateHandler(values)

    }
    return (
        <>
            <div className="absolute top-0 z-40 h-screen  w-full bg-white flex flex-col items-center justify-center">
                <div className=" w-full flex justify-end px-12" onClick={() => setIsOpen(false)}><X/></div>
                <div className=" ">
                    <h1 className="text-2xl font-bold">Edit Product Details</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter product name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter product description"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-4">
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="Enter price"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="refPrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Reference Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="Enter reference price"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="stock"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Stock</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Enter stock quantity"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex gap-4">
                                <FormField
                                    control={form.control}
                                    name="isFreeDelivery"
                                    render={({ field }) => (
                                        <FormItem className=" w-full flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(value) => {
                                                        field.onChange(value);
                                                        setIsFreeDelivery(!!value);
                                                      }}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>Free Delivery</FormLabel>

                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="deliveryCharges"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Delivery Charges</FormLabel>
                                            <FormControl >
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="Enter delivery charges"
                                                    {...field}
                                                    disabled={form.watch("isFreeDelivery")}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent >
                                                    <SelectItem value="bike">bike</SelectItem>
                                                    <SelectItem value="car">car</SelectItem>
                                                    <SelectItem value="light">light</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button variant={"hspButton2"} type="submit" disabled={isSaving}>
                                {isSaving ? "Saving..." : "Save Changes"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    )
}
export default EditProductDetails