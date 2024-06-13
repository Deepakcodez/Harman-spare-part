"use client"
import axios from "axios";
import Link from "next/link";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import Lottie from "lottie-react";

import loadingAnim from '../../../../public/lading.json'
const Register: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const SignUpHandler = async (e: FormEvent) => {
        e.preventDefault();
        const { name, email, password, } = inputValue;
        if (name.trim() === "") {
            console.log('>>>>>>>>>>>Name is missing')
        } else if (email.trim() === "") {
            console.log('>>>>>>>>>>>Email missing')
        } else if (!email.includes("@")) {
            console.log('>>>>>>>>>>>invalid email')
        } else if (password.trim() === "") {
            console.log('>>>>>>>>>>>Password missing')
        } else if (password.length < 6) {
            console.log('>>>>>>>>>>>password should be greater than 6')
        } else {
            try {
                setIsLoading(true)
                const response = await axios.post('https://harman-spare-parts-backend.vercel.app/api/v1/user/register', inputValue, { headers: { 'Content-Type': 'application/json' } })
                if (response.status === 200) {
                    console.log(response.data);

                    setInputValue({
                        name: "",
                        email: "",
                        password: "",
                    })
                    setIsLoading(false)

                } else {
                    console.error('Signup failed:', response.data.message);
                    // Display an error message to the user
                    setIsLoading(false)
                }

            } catch (error) {
                console.log('>>>>>>>>>>>', error)

            } finally {
                setIsLoading(false);
            }

        }
    };


    return (
        <>
            <div className=" w-[90%] sm:w-[30rem] text-center bg-transparent relative z-40">
                <h1 className="text-xl font-bold mb-6 text-white">Harman Spare Parts
                    <h1 className="text-xs font-thin">make Your Bike Super-Bike</h1>
                </h1>
                <h3 className="text-2xl font-bold mb-1 text-white"> Create your account</h3>
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
                                value={inputValue.email}
                                onChange={onchangeHandler}
                                className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="please enter email"
                            />
                        </div>
                    </div>

                    {/* name  */}
                    <label
                        htmlFor="name"
                        className="block text-left text-sm font-medium leading-6 text-white"
                    >
                        Name
                    </label>
                    <div className="mb-2">
                        <div className="flex  rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                            <input
                                type="text"
                                name="name"
                                value={inputValue.name}
                                onChange={onchangeHandler}
                                className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Please Enter Name"
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
                                value={inputValue.password}
                                onChange={onchangeHandler}
                                className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="enter  password"
                            />
                        </div>
                    </div>

                    <button
                        className="bg-blue-400 rounded h-[2rem] flex justify-normal items-center  py-1.5 w-full mt-3 hover:bg-blue-500 "
                        onClick={SignUpHandler}
                    >
                        {isLoading ? (
                            <Lottie className='h-[5rem] w-full ' animationData={loadingAnim} loop={true} />
                        ) : (
                            <h1 className="text-center w-full text-white">Register</h1>
                        )}

                    </button>
                    <h5 className="mt-3 font-thin text-gray-400">
                        have an account ?{" "}
                        <Link href="/auth/login" className="text-blue-300">
                            Login
                        </Link>{" "}
                    </h5>
                </form>
            </div>



        </>
    );
}

export default Register;
