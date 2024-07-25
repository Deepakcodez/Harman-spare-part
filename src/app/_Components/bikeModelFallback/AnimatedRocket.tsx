import Image from "next/image"
import { FC } from "react"

export const Rocket = () => {
  return (
    <div>
         <Image
         src={'/rocket.png'}
         alt="rocket"
         width={100}
         height={100}
         />

    </div>
  )
}