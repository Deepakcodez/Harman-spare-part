import { Star } from "lucide-react";
import Link from "next/link";
import { FC, Fragment } from "react";
import { motion } from "framer-motion";
import { ProgressiveImage } from "../../progressiveImage/ProgressiveImage";
import { ProdDocument } from "@/types/product.types";


interface CardProps {
  products: ProdDocument[];
}
const Card: FC<CardProps> = ({ products }) => {


  return (
    <>
      {
        products?.map((elem, index) =>
          <Fragment key={index}>
            <Link href={`/products/${elem?._id}`}
              className="h-auto pb-6 max-w-full w-full  sm:w-[15rem]    backdrop-blur-md rounded-md  hover:-translate-y-2 transition ease-linear duration-300 hover:bg-violet-5 p-2 hover:shadow-sm "
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: -20 }}
                viewport={{
                  once: true,
                  margin: "0px 0px 50px 0px"
                }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  duration: .2,
                  delay: (index * 0.1)
                }}
              >
                <div className="relative h-[100vw] sm:h-[15rem] w-full flex items-center justify-center rounded-sm hover:rounded-md transition ease-linear duration-300 hover:bg-transparent  shadow-md bg-violet-100/25 "
                >
                  <ProgressiveImage src={elem.images} />
                </div>

                {/* DETAIL */}
                <div className="mt-3 flex flex-col gap-1 ">
                  <h1 className="text-md truncate text-black  w-[90%]">{elem.name}</h1>

                  {/* Price */}
                  <h1 className="text-lg  font-serif text-black leading-4 pb-1">₹{elem.price}</h1>

                  {
                    elem.ratings > 0.0 &&
                    <div className="flex gap-1 items-center justify-start">
                      <div className="bg-violet-400 border border-violet-500 w-fit px-2 text-black rounded-full flex gap-1 items-center justify-start">
                        <h1 className="text-md">{elem.ratings.toFixed(1)}</h1>
                        <Star size={20} />
                      </div>
                      <h1 className="text-sm text-black/75">({elem.reviews.length} Reviews)</h1>
                    </div>
                  }

                </div>
              </motion.div>
            </Link>
          </Fragment>)
      }

    </>
  );
}
export default Card;