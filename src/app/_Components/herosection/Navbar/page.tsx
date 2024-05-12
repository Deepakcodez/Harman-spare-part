"use client"
import Link from "next/link";
import Cart from "./cart/page";
import { usePathname } from 'next/navigation'

const Navbar = () => {

    const pathname = usePathname()
    console.log('>>>>>>>>>>>current path', pathname)
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
  return (
    <>
      <div className="h-[4rem] w-full fixed bg-transparent flex justify-between px-[4rem] items-center top-[2rem]">
      <div></div>

        <ul className="bg-gray-50/75 backdrop-blur-sm	 shadow-lg h-full w-auto flex justify-between items-center text-gray-700 gap-5 px-3 rounded-full  cursor-pointer ">
          {navbarElems.map((elem, index) => (
            <>
              <Link href={elem.linkTo} className={`hover:bg-[#efff01] p-3 px-5 hover:text-black rounded-full transition ease-linear duration-700
              ${elem.linkTo === pathname ? "bg-[#efff01] text-black ":""}
              `}>
                {elem.tag}
              </Link>
            </>
          ))}
        </ul>
        {/* cart */}
        <Cart/>
      </div>
    </>
  );
};

export default Navbar;
