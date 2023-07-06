import { CoinNews } from "@/components/CoinDetail/types/CoinNews";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getCoinNews= async () => {
  try {
    const { data } = await axios.get(`/api/post`);

    return data.data;
  } catch (error) {
    throw error;
  }
};

export const useGetCoinNews = () => {
  const queryKey = ["coinNews"];
  const queryFn = () => getCoinNews();
  const {
    data: coinNews,
    isLoading,
    isError,
  } = useQuery<CoinNews[]>(queryKey, queryFn, {
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 60 * 1, //  1 hour
    staleTime: 1000 * 60 * 60 * 1, //  1 hour
    // since news is not updated frequently
    // 1 hour is enough to cache the news
  });

  return { coinNews, isLoading, isError };
};
