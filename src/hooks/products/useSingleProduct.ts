import { ProdDocument, singleProductResponse } from '@/types/product.types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchSingleProduct = async (productid : string): Promise<singleProductResponse> => {
    const query = `https://harman-spare-parts-backend.vercel.app/api/v1/product/product/${productid}`;
    const { data } = await axios.get<singleProductResponse>(query);
    console.log('>>>>>>>>>>>', data)
    return data;
  };


  export const useSingleProduct = (
   productid : string
  ): UseQueryResult<singleProductResponse, unknown> => {
    return useQuery({
      queryKey: ['singleProduct'],
      queryFn: () => fetchSingleProduct(productid),
    });
  };