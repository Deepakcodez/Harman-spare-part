"use client"
import { FC, Fragment, useEffect, useState } from "react";
import { TiStar } from "react-icons/ti";

interface RatingProps{
    rating : number;
}
const RenderStar: FC<RatingProps> = ({ rating }) =>  {
    const [stars, setStars] = useState<number[]>([]);

    
    useEffect(()=>{
        let starsArray:number[] = [];
        for (let i = 0; i < rating; i++) {
              
            starsArray.push(i);
        }
        setStars(starsArray);
    },[rating])
    
  return (
    <>
   
    <div className="flex flex-wrap  items-center">


    {
        stars?.map((star:number,index:number)=>
            <Fragment  key={index}>
         <div> <TiStar className="text-amber-600" /> </div>
        </Fragment>)
       }  

       </div>
      
    </>
  )
}

export default RenderStar