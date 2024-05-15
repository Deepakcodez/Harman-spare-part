import Rocket from "./rocket/Rocket";

const Stats = () => {
    return ( 
        <>
        <Rocket/>
        <div className="py-[5rem] mt-9 sm:px-[3rem] w-full bg-black grid md:grid-cols-3 grid-cols-1  sm:gap-4 gap-2 items-center place-items-center 	" >

            <div className=" w-full h-[5rem] md:border-r text-center  md:border-r-yellow-200 flex flex-col items-center">
                <div className="">
                <h1 className="text-3xl font-bold w-[15rem] ">2000+</h1>
                <h1 className="text-violet-100 font-thin">Happy Customers</h1>
                </div>
            </div>

            <div className=" w-full h-[5rem] text-center md:border-r  md:border-r-yellow-200  flex flex-col items-center justify-center">
                <div className="">
                <h1 className=" text-3xl font-bold w-[15rem]">100+</h1>
                <h1 className="text-violet-100 font-thin">Daily Services</h1>
                </div>
            </div>

            <div className=" w-full h-[5rem]  text-center  flex flex-col items-center justify-center">
                <div className="     ">
                <h1 className="text-3xl font-bold w-[15rem]">100+</h1>
                <h1 className="text-violet-100 font-thin">Bike Accessories</h1>
                </div>
            </div>
           
        </div>
        </>
     );
}
 
export default Stats;