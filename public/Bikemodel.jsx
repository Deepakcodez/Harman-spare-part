/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 bikemodel.gltf 
Author: Max Hordin (https://sketchfab.com/maxhordin)
License: SKETCHFAB Standard (https://sketchfab.com/licenses)
Source: https://sketchfab.com/3d-models/nakedev-concept-draft-model-7b9db99bf91d4961a26d42ecd044523f
Title: NakedEV Concept (Draft Model)
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/bikemodel.gltf')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={1.053}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.Alum} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.Alum} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.BlackGloss} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.Carbon} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.Chrome} />
        <mesh geometry={nodes.Object_7.geometry} material={materials.EmissionRed} />
        <lineSegments geometry={nodes.Object_8.geometry} material={materials.EmissionWhite} />
        <mesh geometry={nodes.Object_9.geometry} material={materials.EmissionWhite} />
        <mesh geometry={nodes.Object_10.geometry} material={materials.Glass} />
        <mesh geometry={nodes.Object_11.geometry} material={materials.GlassGreen} />
        <mesh geometry={nodes.Object_12.geometry} material={materials.METAL01} />
        <mesh geometry={nodes.Object_13.geometry} material={materials.METAL01} />
        <mesh geometry={nodes.Object_14.geometry} material={materials.Metal04} />
        <mesh geometry={nodes.Object_15.geometry} material={materials.Metal08} />
        <mesh geometry={nodes.Object_16.geometry} material={materials.MetalGold} />
        <mesh geometry={nodes.Object_17.geometry} material={materials['MetalGrid03.002']} />
        <mesh geometry={nodes.Object_18.geometry} material={materials.PainGreen} />
        <mesh geometry={nodes.Object_19.geometry} material={materials.PaintGrey} />
        <mesh geometry={nodes.Object_20.geometry} material={materials.PlasticBlack} />
        <mesh geometry={nodes.Object_21.geometry} material={materials.PurpleMetal} />
        <mesh geometry={nodes.Object_22.geometry} material={materials.RubberODI} />
        <mesh geometry={nodes.Object_23.geometry} material={materials.Steel} />
        <mesh geometry={nodes.Object_24.geometry} material={materials.WireOrange} />
      </group>
    </group>
  )
}

useGLTF.preload('/bikemodel.gltf')
