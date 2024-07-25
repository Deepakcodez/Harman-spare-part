export const BIkeSkelton = () => {
    return (
        <>
            {

                [1, 1, 1, 1,1,1].map((_, index) => (
                    <div
                        key={index}

                        className="h-auto pb-6 max-w-full w-[12rem] sm:w-[15rem] backdrop-blur-md rounded-md hover:-translate-y-2 transition ease-linear duration-300 hover:bg-violet-5 p-2 hover:shadow-sm flex-none"
                    >
                        <div className="h-[15rem] w-full flex items-center justify-center rounded-sm hover:rounded-md transition ease-linear duration-300 hover:bg-transparent py-1 border-b-2 shadow-md bg-violet-100 animate-pulse">

                        </div>
                        {/* DETAIL */}
                        <div className="mt-1 flex flex-col py-2 gap-2">
                            <div className="text-md bg-slate-200 h-5 w-[90%] rounded-full animate-pulse ">
                                
                            </div>

                            {/* Price */}
                            <div className=" bg-slate-200 h-5 w-[70%] rounded-full animate-pulse">
                                
                            </div>


                            <div className="flex gap-1 items-center justify-start">

                            </div>


                        </div>
                    </div>
                ))
            }
        </>
    )
}