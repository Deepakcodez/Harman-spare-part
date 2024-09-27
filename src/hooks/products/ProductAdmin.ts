import { ProductResponse } from "@/types/product.types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from 'js-cookie';

const fetchAllProductsAdmin = async (): Promise<ProductResponse> => {
    const token = Cookies.get("HSPToken");
    if (!token) {
      throw new Error("No token found");
    }
  const query = `https://harman-spare-parts-backend.vercel.app/api/v1/product/admin/all`;
  // const query = `http://localhost:8000/api/v1/product/admin/all`;
  const { data } = await axios.get<ProductResponse>(query,{
    headers: {
      Authorization: token,
    }
  } );
  console.log(">>>>>>>>>>>", data);
  return data;
};

const useAllProductsAdmin = () => {
  return useQuery({
    queryKey: ["allProductsAdmin"],
    queryFn: fetchAllProductsAdmin,
    staleTime: 5 * 10 * 1000, // 5 min
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 10,
  });
};

export default useAllProductsAdmin;