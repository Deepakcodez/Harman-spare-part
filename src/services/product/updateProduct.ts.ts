import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

async function updateProduct(id:string, data: any) {

    let response
    try {
         response = await axios.put(`https://harman-spare-parts-backend.vercel.app/api/v1/product/admin/update/${id}`, data,
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

export default updateProduct;