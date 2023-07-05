import React from "react";
import { useGetCoinById } from "./api/getCoinById";
import { useFavoriteCoinsStore } from "@/store/favoriteCoinsStore";
import CoinCard from "./CoinCard";
import { Card, Grid } from "@nextui-org/react";

export const FavoriteCoins = () => {
 
  const favoriteCoins = useFavoriteCoinsStore((state) => state.favoriteCoins);



  return (
    <Card css={{ p: "$6", mb: "$6"}} variant="bordered">
      <Card.Header>
        <h4>Favori Kripto Paralarım</h4>
      </Card.Header>

      <Grid.Container gap={2} justify="center">
        {favoriteCoins.length > 0 ? (
          favoriteCoins.map((coin) => (
            <Grid xs={12} sm={4} md={3} key={coin}>
              <CoinCard id={coin} />
            </Grid>
          ))
        ) : (
          <Grid xs={12}>
            <p>Listeden favori kripto para ekleyip buradan takip edebilirsiniz.</p>
          </Grid>
        )}
      </Grid.Container>
    </Card>
  );
};
