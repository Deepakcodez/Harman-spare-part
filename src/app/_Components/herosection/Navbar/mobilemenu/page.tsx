"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Fragment } from "react";
import { navbarElemsProps, showProps } from "@/types/mobilenavbar.types";
import { FaUser } from "react-icons/fa";
import ShinyButton from "@/components/magicui/shiny-button";



const Mobilemenu = ({ show }: showProps) => {
  console.log(">>>>>>>>>>> show", show);
  const pathname = usePathname();
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
      tag: "Shop",
      linkTo: "/#shop",
    },
    {
      tag: "About-us",
      linkTo: "/about-us",
    },
  ];

  // //animation
  // useGSAP(() => {
  //   const tl = gsap.timeline();

  //   if (show) {
  //     tl.from(".outerBox", {
  //       x: "100%",
  //       opacity: 0,
  //       duration: 0.5,
  //       ease: "power2.out",
  //     });
  //   }
  // }, [show]);

  return (
    <>
      <div
        className={`${show ? "fixed" : "hidden"
          } md:hidden z-50  flex flex-col gap-4 py-4 px-5 top-[6rem] right-0 w-full bg-transparent  `}
      >
        {navbarElems.map((elem, index) => (
          <Fragment key={index}>
            <Link
              href={elem.linkTo}
              className={` elems hover:bg-[#efff01] p-3 px-5 text-black rounded-full transition ease-linear duration-700
              ${elem.linkTo === pathname ? "text-black bg-[#f9ffa553]  " : ""}
              `}
            >
              {elem.tag}
            </Link>

          </Fragment>
        ))}
        <Link href={"/auth/login"} className="  flex items-center justify-center rounded-full">
        <ShinyButton text="Register/Login" className="bg-violet-300 text-black" />
        </Link>
      </div>
    </>
  );
};

export default Mobilemenu;
