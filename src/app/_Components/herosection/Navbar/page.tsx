"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shadows_Into_Light } from "next/font/google";
import { IoMenuOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment, useState } from "react";
import Image from "next/image";
import { CiUser } from "react-icons/ci";
import Mobilemenu from "./mobilemenu/page";
import Cart from "./cart/page";
import { navbarElemsProps } from "@/types/mobilenavbar.types";
import { SideMenuBtn } from "./sidemenubutton/MenuButton";

const shadowFont = Shadows_Into_Light({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const Navbar = () => {
  const pathname = usePathname();
  const [showMenu, setShowmenu] = useState(false);

  const navbarElems: navbarElemsProps[] = [
    {
      tag: "Home",
      linkTo: "/",
    },
    {
      tag: "Products",
      linkTo: "/products",
    },
    {
      tag: "Contact",
      linkTo: "/contact",
    },
    {
      tag: "About-us",
      linkTo: "/about-us",
    },
  ];

  // Framer Motion variants for animation
  const menuVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "100%", opacity: 0 },
  };

  return (
    <>
      <div className="navbar h-[4rem] w-full backdrop-blur fixed bg-transparent flex justify-between px-[1rem] items-center top-0 z-[1000]">
        <Link
          href={"/"}
          className={`${shadowFont.className} text-3xl text-black`}
        >
          <Image src={'/logo.png'} width={60} height={60} alt="HSP" />
        </Link>

        <ul className="bg-gray-50/75 backdrop-blur-sm border-2 shadow-lg h-[3rem] text-gray-700 rounded-full cursor-pointer hidden md:grid grid-cols-4 gap-2">
          {navbarElems.map((elem, index) => (
            <Fragment key={index}>
              <Link
                href={elem.linkTo}
                className={`hover:bg-[#eeff0131] p-2 text-center px-3 hover:text-black rounded-full transition ease-linear duration-700
                ${elem.linkTo === pathname ? "bg-[#eeff0163] text-black " : ""}`}
              >
                {elem.tag}
              </Link>
            </Fragment>
          ))}
        </ul>

        {/* Cart and User Icon */}
        <div className="hidden md:flex gap-3">
          <Link href={'/auth/login'}><CiUser size={20} /></Link>
          <Cart />
        </div>

        {/* Menu button for mobile devices */}
        <div className="flex gap-2 md:hidden">
          <div className="md:hidden flex items-center">
            <Cart />
          </div>
          <div
            onClick={() => setShowmenu(!showMenu)}
            className="md:hidden bg-gray-50/50 hover:bg-gray-50/75 transition ease-linear duration-700 p-3 flex justify-center items-center rounded-full"
          >
            <SideMenuBtn />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.5 }}
            className="fixed top-0 md:hidden right-0 sm:w-2/4 w-3/4 h-full bg-white/75 backdrop-blur-md z-[999] shadow-lg"
          >
            <Mobilemenu show={showMenu} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
