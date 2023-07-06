import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CoinNews } from "../types/CoinNews";

export const getCoinNewsByCoinId = async (coinId: string) => {
  try {
    const { data } = await axios.get(`/api/post/coin/${coinId}`);

    return data.data;
  } catch (error) {
    throw error;
  }
};

export const useGetCoinNewsByCoinId = (coinId: string) => {
  const queryKey = ["coinNews", coinId];
  const queryFn = () => getCoinNewsByCoinId(coinId);
  const {
    data: coinNews,
    isLoading,
    isError,
  } = useQuery<CoinNews[]>(queryKey, queryFn, {
    enabled: !!coinId,
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 60 * 1, //  1 hour 
    staleTime: 1000 * 60 * 60 * 1, //  1 hour
    // since news is not updated frequently
    // 1 hour is enough to cache the news
  });

  return { coinNews, isLoading, isError };
};
