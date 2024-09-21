"use client"
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import RetroGrid from '@/components/magicui/retro-grid';
import BlurIn from '@/components/magicui/blur-in';
import useCurrentUserStore from '@/Store/userStore/currentUser';
import { Rajdhani } from "next/font/google";
import useCurrentUser from '@/hooks/user/currentuser';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from "gsap";

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400']
});


const Hero = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [currentUserName, setCurrentUserName] = useState<string>("");
  const { currentUser, setCurrentUser } = useCurrentUserStore()
  const { data } = useCurrentUser()

  const bikeRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(bikeRef.current, { y: -12, duration: 1, ease: 'power1.inOut' })
      .to(bikeRef.current, { y: 12, duration: 1, ease: 'power1.inOut' });
  }, []);

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
            <h1 className={` ${rajdhani.className} absolute top-12 left-8 text-5xl text-violet-300`}>
              Hello {currentUserName}
              </h1>
          }
          <div className='z-[9] absolute flex md:right-[17vw] top-28 md:top-[34vh] '>
            <div
              ref={bikeRef}
              className=''>
              <Image
                src={'/rocket.png'}
                alt={'rocket'}
                width={150}
                height={150}
              />
            </div>
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