"use client"
import useCartdetail from "@/hooks/cart/cartDetail";
import { decreaseProdQuantity } from "@/services/cart/decreaseProdCartQuantity";
import { addProductToCart } from "@/services/cart/increaseProdQuantity";
import { handleRemoveFromCart } from "@/services/cart/removeFromCart";
import { useCartCountStore } from "@/Store/CartCount/useCartCountStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import { ProductDetailCartSkelton } from "./ProductDetailCartSkelton";
import { NoProduct } from "../Shared/no_product/NoProduct";
import { ErrorPage } from "../Shared/error/ErrorPage";

export const ProductDetailCard = () => {
    const { isLoading, error, data: cartProduct } = useCartdetail();
    const [localCart, setLocalCart] = useState(cartProduct?.products || []);
    const [previousCart, setPreviousCart] = useState(localCart);
    const {  decreaseCartCount, increaseCartCount } = useCartCountStore(); 

    const queryClient = useQueryClient();

    useEffect(() => {
        if (cartProduct) {
            setLocalCart(cartProduct.products);
            setPreviousCart(cartProduct.products);
        }
    }, [cartProduct]);

    const quantityAdder = (productId: string) => {
        if (!productId) return toast.error("product ID missing");

        const updatedCart = localCart.map((item:any) =>
            item.product.productId._id === productId
                ? { ...item, product: { ...item.product, prodQuantity: item.product.prodQuantity + 1 } }
                : item
        );
        setPreviousCart(localCart);
        setLocalCart(updatedCart);
        mutation.mutate(productId);
    };

    const quantityDecreaser = (productId: string) => {
        if (!productId) return toast.error("product ID missing");

        const updatedCart = localCart.map((item:any) => {
            if (item.product.productId._id === productId) {
                const newQuantity = item.product.prodQuantity - 1;
                if (newQuantity < 1) return item; // Ensure quantity does not go below 1
                return { ...item, product: { ...item.product, prodQuantity: newQuantity } };
            }
            return item;
        });
        setPreviousCart(localCart);
        setLocalCart(updatedCart);
        decreaseQuantity.mutate(productId);
    };

    const handleRemoveProd = (productId: string) => {
        if (!productId) return toast.error("product ID missing");

        const updatedCart = localCart.filter(
            (item:any) => item.product.productId._id !== productId
        );
        decreaseCartCount();
        setPreviousCart(localCart);
        setLocalCart(updatedCart);
        productRemoverFromCart.mutate(productId);
    };

    const mutation = useMutation({
        mutationFn: (productId: string) => addProductToCart(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cartDetails"] });
            toast.success("Quantity Added");
        },
        onError: () => {
            toast.error("Something went wrong");
            setLocalCart(previousCart);
            queryClient.invalidateQueries({ queryKey: ["cartDetails"] });
        },
    });

    const decreaseQuantity = useMutation({
        mutationFn: (productId: string) => decreaseProdQuantity(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cartDetails"] });
            toast.success("Quantity Decreased");
        },
        onError: () => {
            toast.error("Something went wrong");
            setLocalCart(previousCart);
            queryClient.invalidateQueries({ queryKey: ["cartDetails"] });
        },
    });

    const productRemoverFromCart = useMutation({

    
        mutationFn: (productId: string) => handleRemoveFromCart(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cartDetails"] });
            toast.success("Product Removed");
        },
        onError: () => {
            toast.error("Something went wrong");
            increaseCartCount()
            setLocalCart(previousCart);
            queryClient.invalidateQueries({ queryKey: ["cartDetails"] });
        },
    });

    if (isLoading) return <div className="text-black h-auto w-full flex flex-col justify-center ">  <ProductDetailCartSkelton/> </div>;

    if(localCart.length < 1 ) return <div className="py-12"><NoProduct/></div>;

    if (error) return <div className="py-12"><ErrorPage/></div>;

    return (
        <>
            {localCart.map((item: any, index: number) => (
                <Fragment key={index}>
                    <div className="py-2">
                        <div
                            onClick={() => handleRemoveProd(item.product.productId._id)}
                            className="border-t-2 flex justify-end p-1"
                        >
                            <RxCross1 />
                        </div>
                        {/* detail div */}
                        <div className="flex md:gap-4 gap-1">
                            <Image
                                className="bg-violet-50 p-2 rounded-lg shadow-md h-[8rem]  w-[8rem] md:h-[10rem] md:w-[10rem]"
                                src={"/rocket.png"}
                                width={150}
                                height={150}
                                alt="ProductImage"
                            />
                            <div className="flex flex-col gap-2">
                                <h1 className="text-lg">{item.product.productId.name}</h1>
                                <h1 className="text-sm">
                                    {item.product.productId.stock > 0 ? (
                                        <div className="text-green-600">In Stock</div>
                                    ) : (
                                        <div className="text-red-600">Out Of Stock</div>
                                    )}
                                </h1>
                                <div className="border-2 rounded-lg justify-between flex w-[8rem]">
                                    <button
                                        onClick={() => quantityDecreaser(item.product.productId._id)}
                                        className="hover:bg-violet-100 w-12 rounded-s-lg"
                                    >
                                        -
                                    </button>
                                    <div>{item.product.prodQuantity}</div>
                                    <button
                                        onClick={() => quantityAdder(item.product.productId._id)}
                                        className="hover:bg-violet-100 w-12 rounded-e-lg"
                                    >
                                        +
                                    </button>
                                </div>
                                <h1>₹{(item.product.productId.price) * (item.product.prodQuantity)}</h1>
                            </div>
                        </div>
                    </div>
                </Fragment>
            ))}
        </>
    );
};
