import toast from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";

const token = Cookies.get("HSPToken")

export const handleRemoveFromCart = async (productId : string) => {
    try {
        
        const resp = await axios.post(
            "https://harman-spare-parts-backend.vercel.app/api/v1/cart/remove",
            { productId },
            {
                headers: { Authorization: token },
            }
        );
        

       
    } catch (error) {
        toast.error("Something Went Wrong");
    }
};