import React, { useState } from "react";
import { useGetCoinList } from "./api/getCoinList";
import CoinTable from "./Table";
import { Card, Grid, Input, Text } from "@nextui-org/react";
import { InputSearchIcon } from "../common/icons/InputSearchIcon";
import { useDebounce } from "@/hooks/useDebounce";

const CoinList = () => {
  const [search, setSearch] = useState("");

  const { coinList, isLoading, isError, error } = useGetCoinList();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {(error as Error).message}</span>;
  }

  if (!coinList) {
    return <span>Not found</span>;
  }

  const filterCoinsByName = (search: string) => {
    return coinList.filter((coin) => {
      return coin.name.toLowerCase().includes(search.toLowerCase());
    });
  };

  // client side search filter- derive state
  const filteredCoins = filterCoinsByName(search);

  return (
    <Grid.Container gap={2} justify="space-between">
      <Card>
        <Card.Header>
          <Grid xs={12} md={12} lg={12}>
            <Text h3>Kripto Listesi</Text>
          </Grid>

          <Grid xs={12} sm={6} md={6} lg={6}>
            <Input
              bordered
              color="primary"
              width="100%"
              borderWeight="light"
              contentLeft={<InputSearchIcon />}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
        </Card.Header>
        <Card.Body>
          <Grid xs={12} md={12} lg={12}>
            <CoinTable coinList={filteredCoins} />
          </Grid>
        </Card.Body>
      </Card>
    </Grid.Container>
  );
};

export default CoinList;
