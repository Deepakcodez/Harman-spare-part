"use client"
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { useState } from 'react';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

    return ( 
        <>
        <div className=" relative z-0 h-screen w-full  md:p-5  ">
            <div className="bg-yellow-50 w-full h-screen rounded-3xl  ">

              {/* product button */}
              <div className='absolute top-[70%]   w-full flex justify-center group'>
              <Link href={'/products'} 
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
              className={` hover:-translate-y-2 bg-[#efff01] hover:bg-[#f9ffa7] transition ease-linear duration-300 flex gap-2 w-fit justify-center items-center shadow-md  text-black rounded-full p-2 px-3`}>
               <h1>Our Products</h1>
               <MoveRight className={isHovered ? 'rotate-180  transition ease-linear duration-300' : ''} size={22} strokeWidth={3} />
                </Link>
                </div>

                
            </div>
        </div>
        </>
     );
}
 
export default Hero;