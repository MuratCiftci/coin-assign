import { CoinList } from '@/components/CoinList/types';
import axios from '@/configs/axiosConfig';
import { useQuery } from '@tanstack/react-query';
export const getCoinById = async (id: string) => {
    try {
        const res = await axios.get("/coins/markets", {
            params: {
                vs_currency: "usd",
                ids: id,
            },
        });

        return res.data[0];
    } catch (error) {
        throw error;
    }
};


export const useGetCoinById = (id: string) => {
    const queryKey = ['coin', id];
    const queryFn = () => getCoinById(id);

    const { data: coin, isLoading, isError, error } = useQuery<CoinList>(queryKey, queryFn, {
        staleTime: 1000 * 45, // 1 seconds
        cacheTime: 1000 * 45 // 45 seconds * api call cache is 45 seconds so we set it to 45 seconds
    });
    return { coin, isLoading, isError, error }
}






