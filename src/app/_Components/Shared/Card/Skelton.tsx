import { Fragment } from "react"

export const CardSkelton = () => {
    const products = [1,1,1,1,1]
  return (
   <>
    {
            products?.map((elem,index)=>
            <Fragment key={index}>
                <div   className="h-[21rem] pb-6 max-w-full w-[15rem] bg-gray-100/25 rounded-md animate-pulse">
             <div className=" h-[15rem] flex items-center justify-center bg-violet-100 rounded-sm"> </div>

            {/* DETAIL */}
            <div className="mt-1 flex flex-col ">
              {/* Price */}
              <div className="flex gap-1 items-center justify-start bg-gray-100/25"></div>
     
              </div>
            </div>
        

            </Fragment>)
          }
   </>
  )
}