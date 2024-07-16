"use client"
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { useState } from 'react';
import RetroGrid from '@/components/magicui/retro-grid';



const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  

    return ( 
        <>
        <div className=" relative z-0 h-screen w-full  md:p-5  md:mt-[3rem] mt-[4rem]  ">
            <div className="relative bg-violet-400 w-full h-screen rounded-3xl flex items-center justify-center">
             
            <span className="pointer-events-none  z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
             HARMAN SPARE PARTS
      </span>
 
      <RetroGrid />
              

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
               {/* product button  end*/}
                
            </div>
        </div>
        </>
     );
}
 
export default Hero;