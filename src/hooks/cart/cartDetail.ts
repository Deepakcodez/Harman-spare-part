import {useQuery,} from '@tanstack/react-query'
import axios from 'axios';
import Cookies from 'js-cookie';

// Define the function to fetch the current user data
const fetchCartDetail = async () => {
  const token = Cookies.get("HSPToken");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.get('http://localhost:8000/api/v1/cart/details',
   
    {
    headers: {
      Authorization: token,
    }
  });
  return response.data.cart;
};

/// Create the custom hook
const useCartdetail = () => {
    return useQuery({
      queryKey: ['cartDetails'],
      queryFn:fetchCartDetail,
      staleTime: 5 * 10 * 1000, // 5 min
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 4,
      
    });
  };
  

export default useCartdetail;
