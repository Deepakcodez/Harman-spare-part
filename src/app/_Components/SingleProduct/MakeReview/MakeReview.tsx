import { toggleIsShown } from "@/lib/features/review/reviewSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import {  PenBoxIcon, Send, X } from "lucide-react";
import { FC } from "react";

const MakeReview:FC = () => {
    const dispatch = useAppDispatch();


    const ReviewHandler = () => {
        dispatch(toggleIsShown())
    }

    return ( 
        <>
        <div className="absolute z-50 h-screen w-full bg-black/50 flex justify-center items-center">
            <div className="w-[70%] p-9  bg-violet-50 rounded-md border-2 border-violet-200 shadow-md  ">
                <div className="flex text-black justify-between items-center">
                <h1 className="text-black text-2xl mb-2 flex items-center gap-3">Post Review <PenBoxIcon/></h1>
                <div
                 onClick={ReviewHandler}
                >
                <X />
                </div>
                </div>
                <textarea
                className="border border-black/25 w-full p-4 rounded-md text-black max-h-[10rem] min-h-[5rem]"
                 placeholder="Enter your Review"
                 />
                 <button
                 className="bg-violet-900 rounded-md p-2 px-4 mt-3 flex gap-1 cursor-pointer ">
                    <h1>Post</h1>
                    <Send /> 
                    </button>
            </div>
        </div>
        </>
     );
}
 
export default MakeReview;