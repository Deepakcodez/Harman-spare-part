import {useQuery,} from '@tanstack/react-query'
import axios from 'axios';
import Cookies from 'js-cookie';

const fetchAllOrders = async () => {
  const token = Cookies.get("HSPToken");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.get(`https://harman-spare-parts-backend.vercel.app/api/v1/order/admin/all/orders`,
   
    {
    headers: {
      Authorization: token,
    }
  });
  console.log(response.data);
  return response.data;
};

/// Create the custom hook
const useAllOrders = () => {
    return useQuery({
      queryKey: ['AllOrders'],
      queryFn:fetchAllOrders,
      staleTime: 5 * 10 * 1000, // 5 min
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 4,
      
    });
  };
  

export default useAllOrders;
