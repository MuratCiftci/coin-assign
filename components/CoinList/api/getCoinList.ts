import axios from "@/configs/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { CoinList } from "../types";
export const getCoinList = async () => {
    try {

        const response = await axios.get("/coins/markets", {
            params: {
                vs_currency: "usd"
            },
        });

        return response.data;
    }
    catch (error) {
        throw error;
    }
};


export const useGetCoinList = () => {

    const queryKey = ['coin-list'];
    const queryFn = () => getCoinList();


    const { data: coinList, isLoading, isError, error } = useQuery<CoinList[]>(queryKey, queryFn, {
        staleTime: 1000 * 45, // 1 seconds
        cacheTime: 1000 * 45 // 45 seconds
    });
    return { coinList, isLoading, isError, error }
}



