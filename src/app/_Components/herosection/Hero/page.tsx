"use client"
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import RetroGrid from '@/components/magicui/retro-grid';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import BlurIn from '@/components/magicui/blur-in';
import useCurrentUserStore from '@/Store/userStore/currentUser';
// import { BikeModel } from '../Models/BikeModel';
import { Rajdhani } from "next/font/google";
import useCurrentUser from '@/hooks/user/currentuser';

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400']
});

const BikeModel = dynamic(() => import('../Models/BikeModel').then((mod) => mod.default), {
  ssr: false,
  loading: () => <div></div>, // Optional loading component
});

const Hero = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [currentUserName, setCurrentUserName] = useState<string>("");
  const { currentUser,setCurrentUser } = useCurrentUserStore()
  const { data } = useCurrentUser()

  useEffect(() => {
    setCurrentUser(data)
    setCurrentUserName(currentUser?.name)
  }, [currentUser, data])


  return (
    <>
      <div className=" relative z-0 h-screen w-full  md:p-5  md:mt-[3rem] mt-[4rem]  ">
        <div className="relative bg-violet-500 w-full h-screen rounded-3xl flex items-center justify-center">
          {
            currentUserName &&
            <h1 className={` ${rajdhani.className} absolute top-12 left-8 text-5xl text-violet-300`}>Hello {currentUserName}</h1>
          }
          <div className='z-[9] absolute w-1/2 hidden md:flex right-0  '>
            <Suspense fallback={null}>
              <BikeModel />
            </Suspense>
          </div>

          <span
            className='z-[99] '
          >
            <BlurIn
              word="  HARMAN SPARE PARTS"
              className="pointer-events-none  whitespace-pre-wrap bg-gradient-to-b from-[#ffd415] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent select-none px-2"
            />

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