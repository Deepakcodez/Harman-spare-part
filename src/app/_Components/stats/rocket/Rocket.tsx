"use client"
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

const Rocket = () => {
    const rocketRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(rocketRef.current, { y: -5, duration: 1 })
          .to(rocketRef.current, { y: 5, duration: 1 });
    });

    return ( 
        <div className="rocket-container absolute right-6 mt-[5rem]">
            <Image
                ref={rocketRef}
                className="rocket"
                src={'/rocket.png'}
                width={100}
                height={100}
                alt="rocket png"
            />
        </div>
    );
}
 
export default Rocket;
