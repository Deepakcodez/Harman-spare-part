import Link from "next/link";
import { FC } from "react";

const Login: FC = () => {
    return (
        <>
            <div className=" w-[90%] sm:w-[30rem] text-center bg-transparent relative z-40">
                <h1 className="text-xl font-bold mb-6 text-white">Harman Spare Parts
                    <h1 className="text-xs font-thin">make Your Bike Super-Bike</h1>
                </h1>
                <h3 className="text-2xl font-bold mb-1 text-white"> Log in to your account</h3>
                <h5 className="text-xs text-gray-400">
                    Welcome back, Please enter your details.
                </h5>
                <form>
                    {/* email input */}
                    <label
                        htmlFor="username"
                        className="block text-left text-sm font-medium leading-6 text-white"
                    >
                        Email
                    </label>
                    <div className="mb-2">
                        <div className="flex  rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                            <input
                                type="text"
                                name="email"
                                // value={inputValue.email}
                                // onChange={onchangeHandler}
                                className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="please enter email"
                            />
                        </div>
                    </div>

                    {/* password input  */}
                    <label
                        htmlFor="username"
                        className="block text-left text-sm font-medium leading-6 text-white"
                    >
                        Password
                    </label>
                    <div className="mb-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                            <input
                                type="password"
                                name="password"
                                // value={inputValue.password}
                                // onChange={onchangeHandler}
                                className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="enter  password"
                            />
                        </div>
                    </div>

                    <button
                        className="bg-blue-400 rounded h-[2rem] flex justify-normal items-center  py-1.5 w-full mt-3 hover:bg-blue-500 "
                        // onClick={loginHandler}
                    >
                        {/* {isLoading ? (
                            <Lottie className='h-[5rem] w-full ' animationData={loadingAnimation} loop={true} />
                        ) : (
                            <h1 className="text-center w-full text-white">Login</h1>
                        )} */}
                        Login
                    </button>
                    <h5 className="mt-3 font-thin text-gray-400">
                        haven&apos;t any account ?{" "}
                        <Link href="/auth/register" className="text-blue-300">
                            Create an account
                        </Link>{" "}
                    </h5>
                </form>
            </div>
           

        
        </>
    );
}

export default Login;
