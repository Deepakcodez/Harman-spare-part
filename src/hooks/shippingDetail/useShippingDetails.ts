import {useQuery,} from '@tanstack/react-query'
import axios from 'axios';
import Cookies from 'js-cookie';

const fetchShippingDetail = async () => {
  const token = Cookies.get("HSPToken");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.get('https://harman-spare-parts-backend.vercel.app/api/v1/shipping/getShippingInfo',
   
    {
    headers: {
      Authorization: token,
    }
  });
  return response.data.shippingDetails;
};

/// Create the custom hook
const useShippingdetail = () => {
    return useQuery({
      queryKey: ['shippingDetails'],
      queryFn:fetchShippingDetail,
      staleTime: 5 * 10 * 1000, // 5 min
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 4,
      
    });
  };
  

export default useShippingdetail;
