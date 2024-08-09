import { ProdDocument } from "@/types/product.types";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC, Fragment, useState } from "react";
import { motion} from "framer-motion";

import smallImage from '../../../../../public/smallimage.jpg'
interface CardProps {
  products: ProdDocument[];
}
const Card: FC<CardProps> = ({ products }) => {


  return (
    <>
      {
        products?.map((elem, index) =>
          <Fragment key={index}>
            <Link  href={`/products/${elem?._id}`}
            className="h-auto pb-6 max-w-full w-full  sm:w-[15rem]    backdrop-blur-md rounded-md  hover:-translate-y-2 transition ease-linear duration-300 hover:bg-violet-5 p-2 hover:shadow-sm "
            >
            <motion.div 
             initial={{ opacity: 0, x: -60 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{
               type: "spring",
               stiffness: 150,
               duration: .2,
               delay: (index * 0.3)
             }}
            >
              <div className="relative h-[80vw] sm:h-[15rem] w-full flex items-center justify-center rounded-sm hover:rounded-md transition ease-linear duration-300 hover:bg-transparent  shadow-md bg-violet-100/25 "
                
              >
                
                 <ProgressiveImage src={elem.images?.[0]?.url} />
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





interface ProgressiveImageProps {
  src: string | undefined;
}

const ProgressiveImage: FC<ProgressiveImageProps> = ({ src }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Image
        src={smallImage}
        alt="Low res placeholder"
        className={`absolute  backdrop-blur-lg inset-0 w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
        layout="fill"
        quality={10}
      />
      {src && (
        <Image
          src={src}
          alt="High res"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          layout="fill"
          onLoadingComplete={() => setIsLoaded(true)}
          onContextMenu={(e) => e.preventDefault()}
        />
      )}
    </>
  );
};




export default Card;