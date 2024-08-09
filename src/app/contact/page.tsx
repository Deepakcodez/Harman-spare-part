"use client"
import Image from "next/image";
import { FC } from "react"
import { ContactForm } from "../_Components/checkoutComp/ContactForm";

  const contact:FC = () => {
  return (
    <div className="w-full min-h-screen max-screen grid  order-2 md:grid-cols-2 pb-20">
    <div className="grid-cols-9 md:grid-cols-6 md:pt-[4.2rem]  ">
      <div className="mt-[8rem]">
        <ContactForm/>

      </div>
    </div>

    <div className="grid-cols-3 hidden md:flex md:grid-cols-6 pt-[4.2rem]  order-first md:order-last  flex justify-center ">
      <Image
      className=" md:h-auto md:w-auto h-[50vh] w-[50vw] md:p-16 "
      src={'/contactus.svg'}
      alt="contact Image"
      height={500}
      width={500}
      />
    </div>
     
    </div>
  )
}

export default contact;