import { Image as ImageProp } from "@/types/product.types";
import Image from "next/image";
import { FC, useState } from "react";

interface ProgressiveImageProps {
  src: ImageProp[] | undefined;
}

export const ProgressiveImage: FC<ProgressiveImageProps> = ({ src }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageToShow, setImageToShow] = useState<string | undefined>(src?.[0]?.url);

  const changeImageOnHover = (src: ImageProp[]) => {
    if (src?.length > 1) {
      setImageToShow(src[1].url);
    } else {
      setImageToShow(src?.[0]?.url);
    }
  };

  const resetImage = () => {
    setImageToShow(src?.[0]?.url);
  };

  return (
    <div className="relative w-full h-full">
      {/* Low-res placeholder image */}
      <Image
        src={'/smallimage.jpg'}
        alt="Low res placeholder"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        fill
        quality={10}
      />

      {/* Main image */}
      {imageToShow && (
        <Image
          src={imageToShow}
          alt="High res"
          className="absolute transition ease-linear  inset-0 w-full h-full object-cover  duration-300"
          fill
          onLoadingComplete={() => setIsLoaded(true)}
          onMouseOver={() => changeImageOnHover(src!)}
          onMouseLeave={resetImage}
          onContextMenu={(e) => e.preventDefault()} // Prevents right-click download
        />
      )}
    </div>
  );
};
