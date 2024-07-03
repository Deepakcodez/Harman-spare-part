"use client"
import Link from "next/link";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import Lottie from "lottie-react";
import loadingAnim from '../../../../public/lading.json'
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    const router = useRouter()

    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };


    const loginHandler = async (e: FormEvent) => {
        e.preventDefault();
        const { email, password, } = inputValue;
         if (email.trim() === "") {
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
                const response = await axios.post('https://harman-spare-parts-backend.vercel.app/api/v1/user/login', 
                    inputValue, 
                    { headers: { 'Content-Type': 'application/json' } })

                if (response.status === 200) {

                    localStorage.setItem("HSPToken",response.data.token)
                    localStorage.setItem("HSPuser",response.data.user.name)
                    toast.success("Login successfully successfully")
                    router.push('/')
                    setInputValue({
                        email: "",
                        password: "",
                    })
                    setIsLoading(false)

                } else {
                    toast.error("Something Went Wrong")
                    console.error('Login failed:', response.data.message);
                    // Display an error message to the user
                    setIsLoading(false)
                }

            } catch (error) {
                toast.error("Something Went Wrong")
                console.log('>>>>>>>>>>>', error)

            } finally {
                setIsLoading(false);
            }

        }
    };
    return (
        <>
            <div className=" w-[90%] sm:w-[30rem] text-center bg-transparent relative z-40">
                <h1 className="text-xl font-bold mb-6 text-black/75">Harman Spare Parts
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
                        className="block text-left text-sm font-medium leading-6 text-black/75"
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
                                className="block flex-1 border-0 text-black bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="please enter email"
                            />
                        </div>
                    </div>

                    {/* password input  */}
                    <label
                        htmlFor="username"
                        className="block text-left text-sm font-medium leading-6 text-black/75"
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
                                className="block flex-1 border-0 text-black bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="enter  password"
                            />
                        </div>
                    </div>

                    <button
                        className="bg-violet-500 rounded h-[2rem] flex justify-normal items-center  py-1.5 w-full mt-3 hover:bg-violet-400 "
                        onClick={loginHandler}
                    >
                        {isLoading ? (
                            <Lottie className='h-[5rem] w-full ' animationData={loadingAnim} loop={true} />
                        ) : (
                            <h1 className="text-center w-full text-white">Register</h1>
                        )}

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
