"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion} from "framer-motion";
import { Fragment } from "react";
import { navbarElemsProps, showProps } from "@/types/mobilenavbar.types";
import ShinyButton from "@/components/magicui/shiny-button";
import useNavbarShow from "@/Store/navbar/useNavbar";



const Mobilemenu = ({ show }: showProps) => {
  console.log(">>>>>>>>>>> show", show);
  const pathname = usePathname();
  const { setShowmenu} = useNavbarShow()
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
            <motion.div
             onClick={()=>setShowmenu(false)}
             initial={{ opacity: 0, x: 100 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{
              type: "spring",
              stiffness: 150,
              duration: .2,
              delay: (index * 0.3),

             }}
             className="p-3 px-5"
            >

            <Link
            
              href={elem.linkTo}
              className={`  text-xl font-extrabold   rounded-full transition ease-linear duration-700
                ${elem.linkTo === pathname ? "text-gray-800   " : "text-gray-400"}
                `}
                >
              {elem.tag}
            </Link>
              </motion.div>

          </Fragment>
        ))}
        <Link  onClick={()=>setShowmenu(false)} href={"/auth/login"} className="  flex items-center justify-center rounded-full">
        <ShinyButton text="Register/Login" className="bg-violet-500 " />
        </Link>
      </div>
    </>
  );
};

export default Mobilemenu;
