import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

async function addProduct(data: any) {

    let response
    try {
         response = await axios.post("https://harman-spare-parts-backend.vercel.app/api/v1/product/admin/create", data,
            {
                headers: {
                    Authorization: Cookies.get('HSPToken'),
                }
            });
            if(response.status === 200){
                toast.success("Product Added Successfully")
            }

    } catch (error) {
        toast.error("something went wrong")
    }

    return response
}

export default addProduct;