"use client"
import { useCartDetailStore } from "@/Store/CartCount/useCartDetail";
import Image from "next/image"
import { Fragment, useEffect, useState } from "react";
import Cookies from "js-cookie";


const CartDetail = () => {
  const { isLoading, error, checkProductInCart, cartCount, setCartCount } = useCartDetailStore();
  const [cartProduct, setCartProduct] = useState<any>(null)
  const token = Cookies.get("HSPToken")

  useEffect(() => {
    const fetchCartDetails = async () => {
      if (token) {
        try {
          const cart = await checkProductInCart(token);
          setCartProduct(cart.products)
          console.log("cart detail", cart.products[0].productId)
        } catch (error) {
          console.error('Error fetching cart details:', error);
        }
      } else {
        console.error('Token is not defined');
      }
    };

    fetchCartDetails();
  }, [checkProductInCart, token]);


  return (
    <>
      <div className="grid grid-cols-12 min-h-[100vh] h-auto">
        {/* product detail */}
        <div className="md:col-span-8 col-span-12  lg:px-[4rem] sm:px-[2rem]  px-3 ">
          <div className="bg-white     h-auto w-full mt-[5rem] shadow-md rounded-md p-2 py-4">
            <h1 className="text-black text-2xl ">Cart</h1>


            <div className="mt-5 ">



              {/* prod card */}
              {
                cartProduct?.map((item: any, index: any) =>
                  <Fragment key={index}>
                    <div className=" flex md:flex-row flex-col justify-between   border-t-2  p-2">
                      <div className="flex gap-2 bg-red-300 w-full">
                        <div className="min-w-[8rem] w-[15rem]">
                          <Image
                            className="w-[9rem] h-auto bg-violet-200 rounded-lg p-2"
                            src={'/rocket.png'}
                            width={500}
                            height={500}
                            alt="prodImage"
                          />
                        </div>
                        {/* prod name */}
                        <div className="flex flex-col gap-2  bg-slate-300  w-full flex-wrap">
                          <h1 className="text-xl w-[80%]  truncate">{item.productId.name}</h1>
                          <h1 className="text-sm">{item.productId.stock > 0 ?
                            <div className="text-green-600">In Stock</div>
                            :
                            <div className="text-red-600">Out Of Stock</div>}</h1>
                          <div className="border-2 rounded-lg justify-between flex w-[8rem]">
                            <button className="hover:bg-violet-100 w-12 rounded-s-lg">-</button>
                            <div>{item.productId.price}</div>
                            <button className="hover:bg-violet-100 w-12 rounded-e-lg">+</button>
                          </div>
                          <h1 className="text-2xl md:hidden ">  ₹{item.productId.price}</h1>
                        </div>
                      </div>
                      {/* price of single prod */}
                      <div className="flex flex-col items-center justify-between">
                        <h1 className="text-2xl hidden md:block">  ₹{item.productId.price}</h1>
                        <button className="text-xs border-1 rounded-full bg-red-100 px-2 ring-1 ring-red-300 hover:bg-red-200 text-black/75">Delete</button>

                      </div>
                    </div>

                  </Fragment>)
              }


              {/* prod card end*/}




            </div>
          </div>
        </div>

        {/*sidebar  price card */}
        <div className="md:col-span-4 col-span-12 lg:px-[4rem] sm:px-[2rem]  px-3 ">
          <div className="bg-white h-auto w-full mt-[5rem] shadow-md rounded-md p-2 py-4 ">
            gfhgkl
          </div>
        </div>
      </div>
    </>
  )
}

export default CartDetail