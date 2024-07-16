"use client"

import {  Suspense} from 'react';
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls} from '@react-three/drei'
import Bikemodel from './../../../../../public/Bikemodel'
export const BikeModel = () => {
  return (
   <>
    <div className='  md:h-[35rem] h-[30rem] w-full'>

 <Canvas  className='' camera={{ position: [0, 0, 2] }} >
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