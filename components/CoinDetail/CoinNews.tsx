import React from "react";
import { useGetCoinNewsByCoinId } from "./api/getCoinNewsByCoinId";
import { useParams } from "@/hooks/useParams";
import styles from "./coinDetail.module.css";
import NewsCard from "../common/NewsCard";
const CoinNews = () => {
  const id = useParams() as string;
  console.log(id);

  const { coinNews, isLoading, isError } = useGetCoinNewsByCoinId(id);

  if (isError || !coinNews) {
    return <div>News not found</div>;
  }

  return (
    <div className={styles.newsContainer}>
      {coinNews.map((news) => (
        <NewsCard news={news} key={news.id} />
      ))}
    </div>
  );
};

export default CoinNews;
