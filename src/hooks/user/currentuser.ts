import {useQuery,} from '@tanstack/react-query'
import axios from 'axios';
import Cookies from 'js-cookie';

// Define the function to fetch the current user data
const fetchCurrentUser = async () => {
  const token = Cookies.get("HSPToken");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.get('https://harman-spare-parts-backend.vercel.app/api/v1/user/detail', {
    headers: {
      Authorization: token,
    }
  });
  return response.data.user;
};

/// Create the custom hook
const useCurrentUser = () => {
    return useQuery({
      queryKey: ['currentUser'],
      queryFn: fetchCurrentUser,
      staleTime: 5 * 10 * 1000, // 5 min
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 10,
      
    });
  };
  

export default useCurrentUser;
