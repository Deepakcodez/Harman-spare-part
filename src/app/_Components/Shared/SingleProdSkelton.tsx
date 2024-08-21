export const SingleProductPageSkelton = () => {
    return (
        <div className=" w-full h-screen grid grid-cols-12 pt-[4rem] ">
            <div className="col-span-6  px-3">
                <div className="bg-violet-100 border border-violet-900/25 h-[20rem] w-full px-5 rounded-lg shadow-md animate-pulse"></div>
            </div>
            <div className="col-span-6 flex gap-2 flex-col px-5">
                <div className="bg-violet-100 h-[7rem]  w-full border border-violet-900/25 px-5 rounded-lg shadow-md animate-pulse"></div>
                <div className="bg-violet-100 h-[10rem] w-full px-5 border border-violet-900/25 rounded-lg shadow-md animate-pulse"></div>
                <div className="bg-violet-100 h-[9rem] w-full px-5 border border-violet-900/25 rounded-lg shadow-md animate-pulse"></div>
            </div>
        </div>
    )
}