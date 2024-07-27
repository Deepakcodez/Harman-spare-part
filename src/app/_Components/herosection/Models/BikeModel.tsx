"use client"

import {  Suspense, useRef} from 'react';
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls} from '@react-three/drei'
import Bikemodel from './../../../../../public/Bikemodel'
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { Rocket } from '../../bikeModelFallback/AnimatedRocket';

export const BikeModel = () => {

    const bikeRef = useRef(null)
   
  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(bikeRef.current, { y: -5, duration: 1, ease: 'power1.inOut' })
      .to(bikeRef.current, { y: 5, duration: 1, ease: 'power1.inOut' });
  }, []);
  return (
   <>
    <div
    ref={bikeRef}
    className='  md:h-[35rem] h-[30rem] w-full'>

 <Canvas  className='' camera={{ position: [2, 0, 2] }} >
  <ambientLight/>
  <OrbitControls enableZoom={false} />  
  <Suspense fallback = {null}>
     <Bikemodel    />
  </Suspense>
 <Environment  preset='studio'/>  
</Canvas> 

</div>
   </>
  )
}