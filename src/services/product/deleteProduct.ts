import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

async function deleteProduct(id: string) {

    let response
    try {
         response = await axios.delete(`https://harman-spare-parts-backend.vercel.app/api/v1/product/admin/delete/${id}`,
            {
                headers: {
                    Authorization: Cookies.get('HSPToken'),
                }
            });
            if(response.status === 200){
                toast.success("Product Deleted Successfully")
            }

    } catch (error) {
        toast.error("something went wrong")
    }

    return response
}

export default deleteProduct;