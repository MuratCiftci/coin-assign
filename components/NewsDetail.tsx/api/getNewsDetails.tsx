import { CoinNews } from "@/components/CoinDetail/types/CoinNews";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getNewsDetails = async (id: string) => {
    try {
        const { data } = await axios.get(`/api/news/${id}`);
        return data.data;
    } catch (error) {
        throw error;
    }
    }

export const useGetNewsDetailsById = (id: string) => {
    const cacheKey = ["newsDetails", id];
    const queryFn = () => getNewsDetails(id);

    const { data: newsDetails, isLoading, isError } = useQuery<CoinNews>(cacheKey, queryFn, {
        enabled: !!id,
        refetchOnWindowFocus: false,
        cacheTime: 1000 * 60 * 60 * 1, //  1 hour
        staleTime: 1000 * 60 * 60 * 1, //  1 hour
        // since news is not updated frequently
        // 1 hour is enough to cache the news
    });

    return { newsDetails, isLoading, isError };
}