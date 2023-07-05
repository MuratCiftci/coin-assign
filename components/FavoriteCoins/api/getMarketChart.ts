import axios from '@/configs/axiosConfig';
import { useQuery } from '@tanstack/react-query';
export const getMarketChart = async (coinId: string, days: number) => {
    try {
        const response = await axios.get(`/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
};


export const useGetMarketChart = (coinId: string, days: number) => {
    const queryKey = ['marketChart', coinId, days];
    const queryFn = () => getMarketChart(coinId, days);

    const { data: marketChart, isLoading, isError, error } = useQuery(queryKey, queryFn, {
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 5 // 5 minutes // api call cache is 5 minutes so we set it to 5 minutes        
    });
    return { marketChart, isLoading, isError, error }
}


