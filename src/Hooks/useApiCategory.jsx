import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/";

export default function useApi(endPoint) {
  return useQuery({
    queryKey: [endPoint], 
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}${endPoint}`);
        return response.data; 
      } catch (error) {
        console.error("API Fetch Error:", error); 
        throw new Error("error in loading data");
      }
    },
    staleTime: 1000 * 60 * 5, 
    cacheTime: 1000 * 60 * 10, 
    retry: 2, 
  });
}
