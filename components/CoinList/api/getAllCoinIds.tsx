import axios from "@/configs/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { CoinList } from "../types";
export const getCoinIds = async (page = 1, per_page = 100) => {
  try {
    const response = await axios.get("/coins/list");

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useGetCoinIds = () => {
  const queryKey = ["coins"];
  const queryFn = () => getCoinIds();

  const {
    data: coins,
    isLoading,
    isError,
    error,
  } = useQuery<CoinList[]>(queryKey, queryFn, {
    staleTime: Infinity, // Its a static data so no need to update
    cacheTime: Infinity, // Its a static data so no need to update
  });
  return { coins, isLoading, isError, error };
};
