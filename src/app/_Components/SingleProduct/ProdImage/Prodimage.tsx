import Image from "next/image";
import { FC, Fragment } from "react";
import { Image as ImageType  } from '@/types/product.types'


interface ProdImageProps {
    images: ImageType[];
  }
const ProdImage: FC<ProdImageProps> = ({images}) => {

    console.log('>>>>>>>>>>>image url', images[0].url)
    const prodimages = [1, 1, 1, , 1, 1]
    return (
    <>
        <div className="mt-[7rem]">
            {/* main image */}
            <div className="h-fit w-full flex justify-center ">
                <div className="h-auto ">
                    <Image
                        className="h-[13rem] xs:h-[17rem] sm:h-[18rem] md:h-[17rem] lg:h-[28rem] w-auto rounded-md"
                        src={'/bike4.jpg'}
                        width={200}
                        height={200}
                        alt="Prod image"
                    />
                </div>
            </div>

            {/* option images */}
            <div>

                <div className="flex justify-center py-3 gap-2 flex-wrap px-2">
                    {prodimages.map((image, index) =>
                        <Fragment key={index}>
                            <Image
                                className="border  cursor-pointer rounded-md"
                                src={"/bike4.jpg"}
                                width={50}
                                height={50}
                                alt="Prod image"
                            />
                        </Fragment>)}

                </div>
                {/* buttons */}
                <div className="w-full flex gap-9 justify-center mt-5">
                    <button className="bg-violet-900 border-2 border-violet-700 hover:bg-violet-800 p-2 rounded-md transition ease-linear duration-300  ">Add to Cart</button>
                    <button className="border-2 border-violet-800 hover:bg-violet-900 hover:text-white p-2 rounded-md dark:text-black transition ease-linear duration-300 px-5 ">Buy now</button>
                </div>
            </div>
        </div>
    </>
    );
}

    export default ProdImage;