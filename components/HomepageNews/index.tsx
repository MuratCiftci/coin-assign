import React from "react";

// Hooks/Services
import { useGetCoinNews } from "./api/getCoinNews";

// Components
import NewsCard from "../common/NewsCard";

// 3rd party
import { Grid, Loading } from "@nextui-org/react";


const HomePageNews = () => {
  const { coinNews, isLoading, isError } = useGetCoinNews();

  if(isLoading) return (<Loading color="primary" />)

  if (isError || !coinNews) {
    return <div>News not found</div>;
  }

  return (
    <Grid.Container justify="space-between" style={{ marginBottom: 20 }}>
      <Grid
        xs={12}
        md={12}
        lg={12}
        css={{ display: "flex", justifyContent: "center" }}
      >
        {coinNews.map((news) => (
          <Grid xs={4} md={4} lg={4} key={news.id}>
            <NewsCard news={news} />
          </Grid>
        ))}
      </Grid>
    </Grid.Container>
  );
};

export default React.memo(HomePageNews);
