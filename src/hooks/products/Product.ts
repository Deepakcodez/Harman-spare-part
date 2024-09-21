import {  ProductResponse } from '@/types/product.types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchAllProducts = async (currentPage: number, searchKeyword: string, category: string): Promise<ProductResponse> => {
    const query = `https://harman-spare-parts-backend.vercel.app/api/v1/product/allProducts?page=${currentPage}&keyword=${searchKeyword}${category ? `&category=${category}` : ''}`;
    const { data } = await axios.get<ProductResponse>(query);
    console.log('>>>>>>>>>>>', data)
    return data;
  };


  export const useAllProducts = (
    currentPage: number,
    searchKeyword: string,
    category: string
  ): UseQueryResult<ProductResponse, unknown> => {
    return useQuery({
      queryKey: ['allProducts', currentPage, searchKeyword, category],
      queryFn: () => fetchAllProducts(currentPage, searchKeyword, category),
    });
  };