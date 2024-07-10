// makeReviewRequest.ts
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface ReviewData {
    productId: string;
    comment: string;
    rating: number;
}

export const makeReviewRequest = async (reviewData: ReviewData) => {
    const token = Cookies.get("HSPToken");

    try {
        const response = await axios.put("https://harman-spare-parts-backend.vercel.app/api/v1/product/create/review", reviewData, {
            headers: {
                Authorization: token,
            }
        });

        toast.success("Review Added");
        return response.data; // Optionally return response data if needed
    } catch (error: any) {
        toast.error("Something Went Wrong");
        console.error("Failed to submit review:", error.message);
        throw new Error(error.message); // Rethrow error to be caught by useMutation
    }
};
