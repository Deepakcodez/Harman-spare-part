"use client "

import { toggleIsShown } from "@/lib/features/review/reviewSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { PenBoxIcon, X } from "lucide-react";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeReviewRequest } from "@/services/product/MakeReviewRequest";

interface MakeReviewProps {
    productId: string;
}
interface ReviewData {
    productId: string;
    comment: string;
    rating: number;
}

const MakeReview: FC<MakeReviewProps> = ({ productId }) => {
    const dispatch = useAppDispatch();
    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState<number>(1);

    const queryClient = useQueryClient()

   const mutation = useMutation({
    mutationFn : (reviewData : ReviewData)=> makeReviewRequest(reviewData),
    onSuccess : ()=>{
        queryClient.invalidateQueries({ queryKey: ['allProducts'] })
        dispatch(toggleIsShown())
    }
   })

    const ReviewHandler = () => {
        dispatch(toggleIsShown())
    }

    const handleRatingChange = (value: number) => {
        setRating(value);
    };


    const handleSubmit = async () => {

        const reviewData:ReviewData = {
            productId,
            comment,
            rating
        };
        if (!reviewData) {
            toast.error("Enter Review")
            return
        }
        if(!comment) return toast.error("Please enter comment")

        
            mutation.mutate(reviewData);

       
        


    };

    return (
        <>
            <div className="absolute z-10 h-screen w-full bg-black/75 flex justify-center items-center">
                <div className="md:w-[50%] sm:w-[70%] w-[90%] p-9  bg-gray-50 rounded-md border-2 border-violet-200 shadow-md  ">
                    <div className="text-black w-full flex flex-row-reverse  "
                        onClick={ReviewHandler}>
                        <X />
                    </div>
                    <div className="flex text-black justify-between items-center">
                        <h1 className="text-black/75 text-sm mb-2 flex items-center gap-3 ">
                            Post Review <PenBoxIcon size={15} />
                        </h1>

                    </div>
                    <textarea
                        className="border border-black/25 w-full p-4 bg-gray-50 rounded-md text-black max-h-[10rem] min-h-[5rem] text-sm"
                        placeholder="Enter your Review"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="flex gap-1 text-black/75 mt-2  ">
                        <h1 className="text-sm me-3  ">Rate The Product </h1>
                       
                        <div className="rating">
                            <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-orange-400"
                                onChange={() => handleRatingChange(1)}
                                checked={rating === 1}
                            />
                            <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-orange-400"
                                onChange={() => handleRatingChange(2)}
                                checked={rating === 2}
                            />
                            <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-orange-400"
                                onChange={() => handleRatingChange(3)}
                                checked={rating === 3}
                            />
                            <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-orange-400"
                                onChange={() => handleRatingChange(4)}
                                checked={rating === 4}
                            />
                            <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-orange-400"
                                onChange={() => handleRatingChange(5)}
                                checked={rating === 5}
                            />

                        </div>



                    </div>

                    <button
                        className="bg-violet-900 hover:bg-violet-800 rounded-md p-2 px-4 mt-3 flex justify-center items-center gap-1 cursor-pointer "
                        onClick={handleSubmit}
                    >
                        <h1 className="text-sm text-white">Submit</h1>

                    </button>
                </div>
            </div>
        </>
    );
}

export default MakeReview;
