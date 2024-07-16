import Image from "next/image"

export const ErrorPage = () => {
  return (
    <div className="h-[15rem] w-full flex justify-center items-center flex-col py-12 ">
        <Image
        src={'/errorPng.png'}
        width={250}
        height={250}
        alt="Not Found"
        />
        <h1 className="md:text-3xl text-xl text-black/25 font-bold">Something went wrong</h1>
    </div>
  )
}