import axios from "@/configs/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { CoinList } from "../types";
export const getCoinList = async (page = 1, searchState = "") => {
  try {
    const response = await axios.get("/coins/markets", {
      params: {
        vs_currency: "usd",
        page: page,
        per_page: 100,
        ids: searchState,
      },
    });


    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useGetCoinList = (page: number, searchState: string) => {
  const queryKey = ["coin-list", page, searchState];
  const queryFn = () => getCoinList(page, searchState);

  const {
    data: coinList,
    isLoading,
    isError,
    error,
  } = useQuery<CoinList[]>(queryKey, queryFn, {
    keepPreviousData: true,
    staleTime: 1000 * 45, // 1 seconds
    cacheTime: 1000 * 45, // 45 seconds
  });
  return { coinList, isLoading, isError, error };
};
