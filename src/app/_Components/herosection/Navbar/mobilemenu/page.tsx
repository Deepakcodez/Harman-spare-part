"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Fragment } from "react";
import { navbarElemsProps, showProps } from "@/types/mobilenavbar.types";

const Mobilemenu = ({ show }: showProps) => {
  console.log(">>>>>>>>>>> show", show);
  const pathname = usePathname();
  const navbarElems: navbarElemsProps[] = [
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
    const tl = gsap.timeline();

    if (show) {
      tl.from(".outerBox", {
        x: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [show]);

  return (
    <>
      <div
        className={`${
          show ? "fixed" : "hidden"
        } md:hidden z-50 outerBox flex flex-col gap-4 py-4 px-5 rounded-s-xl top-[6rem] right-0 w-[15rem] z-10 bg-black/50 backdrop-blur-md  border-[0.2px] border-gray-700 border-l-[#eeff0181]`}
      >
        {navbarElems.map((elem, index) => (
          <Fragment key={index}>
            <Link
              href={elem.linkTo}
              className={` elems hover:bg-[#efff01] p-3 px-5 hover:text-black rounded-full transition ease-linear duration-700
              ${elem.linkTo === pathname ? "bg-[#efff01] text-black " : ""}
              `}
            >
              {elem.tag}
            </Link>
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default Mobilemenu;
