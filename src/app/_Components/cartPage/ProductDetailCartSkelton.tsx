import Image from "next/image"
import { Fragment } from "react"

export const ProductDetailCartSkelton = () => {
    const localCart = [1,1]
  return (
    <>
            {localCart.map((item: any, index: number) => (
                <Fragment key={index}>
                    <div className="py-2">
                        <div
                           
                            className="border-t-2 flex justify-end p-1"
                        >
                           
                        </div>
                        {/* detail div */}
                        <div className="flex md:gap-4 gap-1">
                            <Image
                                className="bg-gray-50 p-2 rounded-lg shadow-md h-[8rem]  w-[8rem] md:h-[10rem] md:w-[10rem] opacity-15 animate-pulse"
                                src={"/rocketSkelton.png"}
                                width={150}
                                height={150}
                                alt="ProductImage"
                            />
                            <div className="flex flex-col gap-2">
                                <div className="text-lg bg-gray-100 w-[10rem] h-[1.5rem] lg:w-[15rem] rounded-full animate-pulse"></div>
                                <div className="text-lg bg-gray-50 w-[8rem] h-[1.5rem] lg:w-[12rem] rounded-full animate-pulse"></div>
                                <div className="text-lg bg-gray-50 w-[4rem] h-[1.5rem] lg:w-[8rem] rounded-full animate-pulse"></div>
                               
                            </div>
                        </div>
                    </div>
                </Fragment>
            ))}
        </>
  )
}