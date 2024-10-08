"use client"
import React, { FC, useEffect, useState } from 'react';
import { ProdDocument } from '../../types/product.types';
import { Search } from 'lucide-react';
import ProductCards from '../_Components/productCards/ProductCards';
import useFilterStore, { selectCategory, selectSearchKeyword, selectCurrentPage, selectMaxPage } from '@/Store/filter/useFilterStore';
import { useAllProducts } from '@/hooks/products/Product';
import useCurrentUser from '@/hooks/user/currentuser';
import useCurrentUserStore from '@/Store/userStore/currentUser';


const Products: FC = () => {
  const {
    category,
    searchKeyword,
    currentPage,
    maxPage,
    setCategory,
    setSearchKeyword,
    setCurrentPage,
    setMaxPage,
  } = useFilterStore();

  const [searchInput, setSearchInput] = useState<string>("");
  const { data: user,  isError, } = useCurrentUser();
  const { setCurrentUser,currentUser } =  useCurrentUserStore();

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      
    }
  }, [user, setCurrentUser, currentUser]);

  

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchKeyword(searchInput);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchInput, setSearchKeyword]);

  const nextPageHandler = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPageHandler = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const categoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
  };

  const { data, error, isLoading } = useAllProducts(currentPage, searchKeyword, category);

  useEffect(() => {
    if (data) {
      const productCount = data.productCount ?? 0;
      const averageOfProducts = Math.ceil(productCount / 15); // 9 is products shown on one page
      setMaxPage(averageOfProducts);
    }
  }, [data, setMaxPage]);

  const products: ProdDocument[] = data?.products ?? [];



  return (
    <>
      <div className="h-auto w-full pt-16 xl:px-16">
        <div className='md:flex w-full'>
          {/* filter parent div */}
          <div className='md:w-[25rem] w-full h-auto  py-7 border-r-[1px] border-[#efefef] '>
            {/* filter child div */}
            <div className='h-full w-full bg-white/50 rounded-md flex flex-col py-5 '>
              {/* search option */}
              <div className='flex justify-center items-center  '>
                <div className='flex w-full border-2 rounded-md mx-6'>

                  <input
                    className='bg-[#f7f7f7] w-full  px-2 py-1 rounded-s-md outline-none text-black/75 '
                    name='search_keyword'
                    value={searchInput}
                    placeholder='Search Item'
                    onChange={searchHandler}
                  />
                  <div className='bg-[#f7f7f7] py-1 rounded-e-md '>
                    <Search className='hover:text-white text-black pe-2' />
                  </div>
                </div>
              </div>
              {/* category */}
              <div className='w-full  flex justify-center mt-3 '>
                <select
                  name="category"
                  className=" bg-[#ffff] border-2 text-black rounded-md px-2 outline-none py-1 w-full text-center mx-6 text-sm "
                  value={category}
                  onChange={categoryHandler}
                >
                  <option className='text-black/75 bg-violet-500 text-sm' value="">Select Product Category</option>
                  <option className='text-black' value="">All</option>
                  <option className='text-black' value="bike">Bike</option>
                  <option className='text-black' value="car">Car</option>
                  <option className='text-black' value="light">Light</option>
                </select>
              </div>
            </div>
          </div>
          {/* cards */}
          <ProductCards products={products} data={data} error={error} isLoading={isLoading} />
        </div>

        {/* pagination div */}
        <div className='h-[3rem] w-full rounded-md flex justify-center items-center gap-2 py-14'>
          {/* prev button */}
          <div
            onClick={prevPageHandler}
            className={`bg-gray-50 p-1 px-3 rounded-md ring-1 ring-slate-400/50 cursor-pointer hover:ring-slate-400/75 ${currentPage <= 1 ? 'text-black/50' : 'text-black/75'} text-sm`}
          >
            Prev
          </div>
          <div className='text-sm text-black/75'>{currentPage} of {maxPage}</div>
          {/* next page button */}
          <div
            onClick={nextPageHandler}
            className={`bg-gray-50  p-1 px-3 rounded-md ring-1 ring-slate-400/50 cursor-pointer hover:ring-slate-400/75 ${currentPage === maxPage ? "text-black/50" : "text-black/75"} text-sm`}
          >
            Next
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
