import Image from "next/image"

export const NoProduct = () => {
  return (
    <div className="h-[15rem] w-full flex justify-center items-center flex-col py-12 ">
        <Image
        src={'/notFound.png'}
        width={250}
        height={250}
        alt="Not Found"
        />
        <h1 className="text-3xl text-black/25 font-bold">No Product Found In Cart</h1>
    </div>
  )
}