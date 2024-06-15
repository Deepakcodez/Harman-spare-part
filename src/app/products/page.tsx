"use client";
import React, { FC, useEffect, useState } from 'react';
import useSWR from 'swr';
import { ProdDocument } from '../../types/product.types';
import { Search } from 'lucide-react';
import ProductCards from '../_Components/productCards/ProductCards';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { selectCategory, selectSearchKeyword, selectCurrentPage, selectMaxPage, setCategory, setSearchKeyword, setCurrentPage, setMaxPage } from '@/lib/features/filter/filterSlice';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Products: FC = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategory);
  const searchKeyword = useAppSelector(selectSearchKeyword);
  const currentPage = useAppSelector(selectCurrentPage);
  const maxPage = useAppSelector(selectMaxPage);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchKeyword(searchInput));
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchInput, dispatch]);

  const nextPageHandler = () => {
    if (currentPage < maxPage) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const prevPageHandler = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const categoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const selectedCategory = e.target.value;
    dispatch(setCategory(selectedCategory));
  };

  const query = `https://harman-spare-parts-backend.vercel.app/api/v1/product/allProducts?page=${currentPage}&keyword=${searchKeyword}${category ? `&category=${category}` : ''}`;

  const { data, error } = useSWR(query, fetcher, { revalidateOnFocus: false });

  useEffect(() => {
    if (data) {
      const averageOfProducts = Math.ceil(data.productCount / 9); // 9 is products shown on one page
      dispatch(setMaxPage(averageOfProducts));
    }
  }, [data, dispatch]);

console.log('>>>>>>>>>>>data', data)
  const products: ProdDocument[] = data?.products;

  return (
    <div className="h-auto w-full p-4 mt-9">
      <div className='md:flex w-full'>
        {/* filter parent div */}
        <div className='md:w-[25rem] w-full h-auto md:h-[100vh] py-7'>
          {/* filter child div */}
          <div className='h-full w-full bg-[#ffffff16] rounded-md flex flex-col py-5'>
            <div className='flex justify-center items-center'>
              <input
                className='bg-[#ffffff48] px-2 py-1 rounded-s-md outline-none'
                name='search_keyword'
                value={searchInput}
                placeholder='Search Item'
                onChange={searchHandler}
              />
              <div className='bg-[#ffffff48] py-1 rounded-e-md'>
                <Search className='hover:text-white text-[#ffffff5f] pe-2' />
              </div>
            </div>
            {/* category */}
            <div className='w-full  flex justify-center mt-3'>
              <select
                name="category"
                className="text-white bg-[#ffffff48] text-[#ffffff56] rounded-md px-2 outline-none py-1 w-full text-center mx-6 text-sm "
                value={category}
                onChange={categoryHandler}
              >
                <option className='text-black bg-violet-500' value="">Select Product Category</option>
                <option className='text-black' value="bike">Bike</option>
                <option className='text-black' value="car">Car</option>
                <option className='text-black' value="light">Light</option>
                <option className='text-black' value="showcases">Showcases</option>
              </select>
            </div>
          </div>
        </div>
        {/* cards */}
        <ProductCards products={products} data={data} error={error} />
      </div>


      {/* pagination div */}
      <div className='h-[3rem] w-full rounded-md flex justify-center items-center gap-2 mt-14'>
        {/* prev button */}
        <div
          onClick={prevPageHandler}
          className={`bg-[#ffffff30] p-1 px-3 rounded-md ring-1 ring-slate-400/50 cursor-pointer hover:ring-slate-400/75 ${currentPage <= 1 ? 'text-white/25' : 'text-white/75'} text-sm`}
        >
          Prev
        </div>
        <div className='text-sm'>{currentPage} of {maxPage}</div>
        {/* next page button */}
        <div
          onClick={nextPageHandler}
          className={`bg-[#ffffff30] p-1 px-3 rounded-md ring-1 ring-slate-400/50 cursor-pointer hover:ring-slate-400/75 ${currentPage === maxPage ? "text-white/25" : "text-white/75"} text-sm`}
        >
          Next
        </div>
      </div>


    </div>
  );
};

export default Products;
