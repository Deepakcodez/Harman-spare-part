"use client"
import Image from "next/image";
import { FC, useState } from "react"
import BlurIn from "@/components/magicui/blur-in";
import { motion } from "framer-motion"
const contact: FC = () => {
  const [isShowMore, setShowMore] = useState<boolean>(false)
  return (
    <div className="w-full  grid  grid-cols-12 pb-20  ">
      <div className="col-span-12 md:col-span-6 md:pt-[4.2rem] order-last md:order-first ">
        <div className="  md:mt-[2rem] mt-0 ">
          <div className="md:px-12 px-6  h-auto text-black flex flex-col gap-12">
            <BlurIn
              word="About-Us"
              className="text-4xl font-bold text-black dark:text-white text-center"
            />
            <div className="md:px-12 px-3 text-sm text-justify">
              <h1  >
                Welcome to Harman Spare Parts, your trusted source for high-quality automotive spare parts. We are committed to providing our customers with reliable products and excellent service. Our team is passionate about helping you find the right parts for your vehicle, ensuring safety and performance.
              </h1>


              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  damping: 10,
                  delay: 0.1,
                }}
                className={` ${isShowMore ? "block" : "hidden"} mt-4   transition ease-linear duration-300 `}>
                <h1 className="text-lg font-semibold ">Our Mission</h1>
                <p>To deliver top-notch automotive spare parts that meet the needs of our customers, while ensuring affordability and convenience.</p>
                <h1 className="text-lg font-semibold mt-4 ">Why Choose Us?</h1>
                <div className="flex flex-col gap-2">
                  <p className="flex items-start"> Quality Products: We offer a wide range of genuine and aftermarket spare parts.    </p>
                  <p className="flex items-start"> Customer Satisfaction: Your satisfaction is our priority. We strive to provide the best service and support.</p>
                  <p className="flex items-start">Expertise: Our knowledgeable team is here to assist you in finding the perfect parts for your vehicle.</p>
                </div  >

                <p className="mt-4 text-xs">Thank you for choosing Harman Spare Parts. We look forward to serving you!</p>
              </motion.div>


              <button

                onClick={() => setShowMore(!isShowMore)}
                className=" w-fit px-3 py-3 bg-violet-600 ring-2 ring-violet-500 rounded-md text-white text-sm hover:bg-violet-500  mt-8">
                {
                  isShowMore ? "Show Less" : "Read More"
                }

              </button>
            </div>


          </div>

        </div>
      </div>

      <div className="col-span-12 md:col-span-6 md:h-screen w-full    flex items-center justify-center bg-blue-20  order-first md:order-last  mt-[3rem] md:mt-0  ">
        <Image
          className="  w-[30vh] md:w-auto md:h-[80vh]  md:p-16  "
          src={'/aboutus.png'}
          alt="Image"
          height={500}
          width={500}
        />
      </div>

    </div>
  )
}

export default contact;