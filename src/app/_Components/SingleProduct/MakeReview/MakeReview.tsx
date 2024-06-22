import { toggleIsShown } from "@/lib/features/review/reviewSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { PenBoxIcon, Send, X } from "lucide-react";
import { FC, useState } from "react";
import axios from 'axios';


interface MakeReviewProps {
    productId: string; 
}
const MakeReview: FC<MakeReviewProps> = ({productId}) => {
    const dispatch = useAppDispatch();
    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState<number>(1);
    const ReviewHandler = () => {
        dispatch(toggleIsShown())
    }

    const handleSubmit = async () => {
        const reviewData = {
            productId ,
            comment: comment,
            rating: rating
        };
          if(!reviewData){
            return 
          }
        try {
            const response = await axios.put("https://harman-spare-parts-backend.vercel.app/api/v1/product/create/review", reviewData);

            // Handle success, maybe show a success message to the user
            console.log("Review submitted successfully!", response.data);
        } catch (error:any) {
            // Handle error, maybe show an error message to the user
            console.error("Failed to submit review:", error.message);
        }
    };

    return (
        <>
            <div className="absolute z-10 h-screen w-full bg-black/75 flex justify-center items-center">
                <div className="md:w-[50%] sm:w-[70%] w-[90%] p-9  bg-white rounded-md border-2 border-violet-200 shadow-md  ">
                <div className="text-black w-full "
                    onClick={ReviewHandler}>
                            <X />
                </div>
                    <div className="flex text-black justify-between items-center">
                        <h1 className="text-black/75 text-sm mb-2 flex items-center gap-3 ">
                        Post Review <PenBoxIcon size={15} />
                        </h1>
                       
                    </div>
                    <textarea
                        className="border border-black/25 w-full p-4 rounded-md text-black max-h-[10rem] min-h-[5rem] text-sm"
                        placeholder="Enter your Review"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="flex gap-1 text-black/75 mt-2  ">
                        <h1 className="text-md me-3  ">Rate The Product </h1>
                        <select
                            name="rating"
                            className="text-white bg-violet-500 rounded-md px-2 "
                            value={rating}
                            onChange={(e) => setRating(parseInt(e.target.value))}
                        >
                            <option value="1">⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="5">⭐⭐⭐⭐⭐</option>
                        </select>
                    </div>

                    <button
                        className="bg-violet-900 rounded-md p-2 px-4 mt-3 flex justify-center items-center gap-1 cursor-pointer "
                        onClick={handleSubmit}
                    >
                        <h1 className="text-sm">Post</h1>
                        <Send size={15} />
                    </button>
                </div>
            </div>
        </>
    );
}

export default MakeReview;
