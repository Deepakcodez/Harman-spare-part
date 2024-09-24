import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

async function updateOderStatus(
  orderId: string,
  orderStatus: string,
  paymentStatus: string
) {
  const orderdata = {
    orderId,
    orderStatus,
    paymentStatus,
  };
  let response;
  try {
    // const url = `https://harman-spare-parts-backend.vercel.app/api/v1/order/admin/update/status`;
    const url = "http://localhost:8000/api/v1/order/admin/update/status"
    response = await axios.put(url, orderdata,{
        headers: {
          Authorization: Cookies.get("HSPToken"),
        },
      }
    );
  } catch (error) {
    toast.error("something went wrong");
  }

  return response;
}

export default updateOderStatus;
