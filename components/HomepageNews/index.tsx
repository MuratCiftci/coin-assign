import { Card, Grid, Text } from "@nextui-org/react";
import React from "react";
import { useGetCoinNews } from "./api/getCoinNews";
import NewsCard from "../common/NewsCard";

const HomePageNews = () => {
  const { coinNews, isLoading, isError } = useGetCoinNews();

  if (isError || !coinNews) {
    return <div>News not found</div>;
  }

  return (
    <Grid.Container
      justify="space-between"
      style={{ marginBottom: 20 }}
    >
      <Grid xs={12} md={12} lg={12} css={{ display: "flex" , justifyContent:"center"}}>
        {coinNews.map((news) => (
          <Grid xs={4} md={4} lg={4} key={news.id}>
            <NewsCard news={news} />
          </Grid>
        ))}
      </Grid>
    </Grid.Container>
  );
};

export default HomePageNews;
