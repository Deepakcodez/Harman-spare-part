import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

import {
  addProductToCart,
  AddProductToCartData,
  AddProductToCartResponse,
} from "../../services/Cartservice";

export const useAddProductToCart = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<AddProductToCartResponse, AxiosError, AddProductToCartData>(
    (data:AddProductToCartData) => addProductToCart(data), // Provide the mutation function directly
    {
      onSuccess: (data:AddProductToCartData) => {
        // Optionally, invalidate the cart query to refetch the cart data
        queryClient.invalidateQueries(["allProducts"]);
        toast.success("Product Added to Cart")
        console.log("Product added to cart:", data);
      },
      onError: (error:any) => {
        toast.error("Something Went Wrong")
        console.error("Error adding product to cart:", error);
      },
    }
  );

  return mutation;
};
