import { FC } from "react"


interface AlertProps{
    message : string;
    buttonText : string;
    buttonLink : string;
}

export const Alert:FC<AlertProps> = () => {
  return (
    <div className="bg-red-400 text-2xl">Alert</div>
  )
}