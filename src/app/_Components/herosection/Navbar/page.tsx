"use client";
import Link from "next/link";
import Cart from "./cart/page";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { Shadows_Into_Light } from "next/font/google";
import { useGSAP } from "@gsap/react";
import { Menu } from "lucide-react";
import Mobilemenu from "./mobilemenu/page";
import { useState } from "react";
import Searchbutton from "../../search/page";
const shadowFont = Shadows_Into_Light({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const Navbar = () => {
  const pathname = usePathname();
  console.log(">>>>>>>>>>>current path", pathname);
  const [showMenu, setShowmenu] = useState(false);
  const navbarElems = [
    {
      tag: "Home",
      linkTo: "/",
    },
    {
      tag: "Lights",
      linkTo: "/lights",
    },
    {
      tag: "Products",
      linkTo: "/products",
    },
    {
      tag: "Shop",
      linkTo: "/shop",
    },
    {
      tag: "About-us",
      linkTo: "/about-us",
    },
  ];

  //animation
  useGSAP(() => {
    gsap.from(".navbar", {
      y: -100,
      duration: 1.5,
      delay: 1,
      opacity: 0.4,
      stagger: {
        amount: 1.5,
      },
      ease: "back",
    });
  }, []);
  return (
    <>
      <div className=" navbar h-[4rem] w-full fixed bg-transparent flex justify-between px-[1rem] items-center top-[2rem] z-[1000] ">
        <Link href={'/'} className={`${shadowFont.className} text-3xl`}>HSP</Link>

        <ul className="bg-gray-50/75 backdrop-blur-sm	 shadow-lg h-full w-auto flex justify-between items-center text-gray-700 lg:gap-5 gap-1 px-3 rounded-full  cursor-pointer hidden md:flex ">
          {navbarElems.map((elem, index) => (
            <>
              <Link
                href={elem.linkTo}
                className={`hover:bg-[#efff01] p-3 px-5 hover:text-black rounded-full transition ease-linear duration-700
              ${elem.linkTo === pathname ? "bg-[#efff01] text-black " : ""}
              `}
              >
                {elem.tag}
              </Link>
            </>
          ))}
        </ul>
        {/* cart */}
        <div className="hidden md:flex">
         {/* <Searchbutton/> */}
          <Cart />
        </div>


        {/* menu button for mobile devices */}

        <div className="flex gap-3 md:hidden">
          <div className="md:hidden">
            <Cart />
          </div>
          <div
            onClick={() => setShowmenu(!showMenu)}
            className=" md:hidden bg-gray-50/50 hover:bg-gray-50/75  transition ease-linear duration-700  p-3 flex justify-center items-center rounded-full"
          >
            <Menu color="black" />
          </div>
        </div>
      </div>
      <Mobilemenu show={showMenu} />
    </>
  );
};

export default Navbar;
