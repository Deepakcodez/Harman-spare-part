"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Fragment } from "react";
import { useGSAP } from "@gsap/react";
import Lenis from "@studio-freight/lenis";

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

interface ImageData {
  src: string;
}

const images: ImageData[] = [
  { src: '/bike1.jpg' },
  { src: '/bike2.jpg' },
  { src: '/bike3.jpg' },
  { src: '/bike4.jpg' },
  { src: '/bike1.jpg' },
];

const Scroll_Img: React.FC = () => {
  const contRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {

   // Initialize Lenis for smooth scrolling
   const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);






    if (contRef.current) {
      gsap.to(contRef.current, {
        transform : "translateX(-150%)",
        scrollTrigger: {
          trigger: contRef.current,
          start: "top 20%",
          end: "top -50%",
          scrub: true,
          pin: true,
        //   markers: true, // This adds the markers for start and end points
        },
      });
    }


    return () => {
      lenis.destroy();
    };

  }, []);

  return (
    <div className="px-[2rem] mt-5 ">
      <div ref={contRef} className="flex gap-10  transform -translate-x-0">
        {images.map((img, index) => (
          <Fragment key={index}>
            <Image 
            className="rounded-md"
             src={img.src} width={500} height={500} alt="bike" />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Scroll_Img;
