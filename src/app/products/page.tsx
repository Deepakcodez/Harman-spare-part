"use client";
import React, { FC } from 'react';
import useSWR from 'swr';
import { ProdDocument } from '../../types/product.types';
import Card from '../_Components/Card/Card';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Products: FC = () => {
  const { data, error } = useSWR('https://harman-spare-parts-backend.vercel.app/api/v1/product/allProducts', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const products: ProdDocument[] = data.products;

  return (
    <div className="h-auto w-full p-4">
      <div className="bg-violet-300 h-[20rem] rounded-lg"></div>
      <div className="my-7 w-full md:px-[1rem] px-1 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-5 place-items-center">
        <Card products={products} />
      </div>
    </div>
  );
};

export default Products;
