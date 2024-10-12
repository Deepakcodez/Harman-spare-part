import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

async function placeOder(orderData: any) {
    let response
    try {
        // https://harman-spare-parts-backend.vercel.app/api/v1/order/create
         response = await axios.post("http://localhost:8000/api/v1/order/create", orderData,
            {
                headers: {
                    Authorization: Cookies.get('HSPToken'),
                }
            });

    } catch (error) {
        toast.error("something went wrong")
    }

    return response
}

export default placeOder