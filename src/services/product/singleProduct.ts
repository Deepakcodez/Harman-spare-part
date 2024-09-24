import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

async function getProduct(id: string) {

    let response
    try {
         response = await axios.get(`https://harman-spare-parts-backend.vercel.app/api/v1/product/product/${id}`,
            {
                headers: {
                    Authorization: Cookies.get('HSPToken'),
                }
            });
            if(response.status !== 200){
                toast.success("server error")
            }

    } catch (error) {
        toast.error("something went wrong")
    }

    return response
}

export default getProduct;