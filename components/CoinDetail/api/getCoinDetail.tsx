import axios from "@/configs/axiosConfig";
import { useQuery } from "@tanstack/react-query";

export const getCoinDetail = async (id: string) => {
  try {
    const { data } = await axios.get(`/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const useGetCoinDetail = (id: string) => {
  const queryKey = ["coinDetail", id];
  const queryFn = () => getCoinDetail(id);
  const { data, isLoading, isError } = useQuery(queryKey, queryFn, {
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  return { coin: data, isLoading, isError };
};
