"use client";
import React, { FC, useEffect, useState } from 'react';
import useSWR from 'swr';
import { ProdDocument } from '../../types/product.types';
import Card from '../_Components/Shared/Card/Card';
import Loader from '../_Components/Shared/Loader/Loader';
import { Divide, Search } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Products: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [maxPage, setMaxPage] = useState<number>(1)
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");


  const nextPageHandler = () => {

    if (currentPage === maxPage) {
      return
    }
    setCurrentPage((prev) => prev + 1)
  }



  const prevPageHandler = () => {

    if (currentPage === 1) {
      return
    }
    setCurrentPage((prev) => prev - 1)
  }


  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

    e.preventDefault()
    setSearchInput(e.target.value)

    setTimeout(() => {
      setSearchKeyword(searchInput)
    }, 1000);

  }





  const { data, error } = useSWR(`https://harman-spare-parts-backend.vercel.app/api/v1/product/allProducts?page=${currentPage}&keyword=${searchKeyword}`, fetcher);

  useEffect(() => {


    console.log('>>>>>>>>>>>', data?.productCount / 9)
    const averageOfProducts = Math.floor(data?.productCount / 9) + 1;    //9 is products shown on one page
    if (data?.products) {
      setMaxPage(averageOfProducts)
    }
  }, [data])

  if (error) return <div>Failed to load</div>;
  if (!data) return <div><Loader /></div>;
  if(!data.products || data.products.length === 0) return <div className='h-screen w-full flex justify-center items-center'>Nothing to show</div>

  const products: ProdDocument[] = data.products;

  return (
    <div className="h-auto w-full p-4 mt-9">
      <div className='md:flex w-full'>
        {/* filter parent div */}
        <div className=' md:w-[25rem] w-full h-[7rem] md:h-[100vh]  py-7'>
          {/*filter child div  */}
          <div className='h-full w-full bg-[#ffffff16] rounded-md flex flex-col pt-5 '>
            <div className='flex justify-center items-center '>

              <input
                className={' bg-[#ffffff48] px-2 py-1 rounded-s-md outline-none'}
                name='search_keyword'
                value={searchInput}
                placeholder='Search Item'
                onChange={searchHandler}

              />
              <div
                className='bg-[#ffffff48] py-1 rounded-e-md' >
                <Search className='hover:text-white text-[#ffffff5f] pe-2 ' />
              </div>
            </div>

          </div>
        </div>
        <div className="my-7 w-full md:px-[1rem] px-1 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-5 place-items-center   ">
          <Card products={products} />
        </div>
      </div>




      {/* pagination div */}
      <div className='h-[3rem] w-full  rounded-md flex justify-center items-center gap-2 mt-14'>
        {/* prev button */}
        <div
          onClick={prevPageHandler}
          className={`bg-[#ffffff30] p-1 px-3 rounded-md ring-1 ring-slate-400/50 cursor-pointer hover:ring-slate-400/75 ${currentPage <= 1 ? 'text-white/25' : 'text-white'}`}>Prev</div>

        <div>{currentPage} of {maxPage} </div>

        {/* next page buttton */}
        <div
          onClick={nextPageHandler}
          className={`bg-[#ffffff30] p-1 px-3 rounded-md ring-1 ring-slate-400/50 cursor-pointer hover:ring-slate-400/75 ${currentPage == maxPage ? "text-white/25" : "text-white"}`}>Next</div>
      </div>
    </div>
  );
};

export default Products;
