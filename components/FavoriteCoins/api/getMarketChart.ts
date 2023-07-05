import axios from '@/configs/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import { MarketChart } from '../types/Market';
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

    const { data: marketChart, isLoading, isError, error } = useQuery<MarketChart>(queryKey, queryFn, {
        staleTime: 1000 * 60 * 1, // 1 minutes
        cacheTime: 1000 * 60 * 1 // 1 minutes // api call cache is 5 minutes but we set it to 1 minute to be safe     
    });
    return { marketChart, isLoading, isError, error }
}


