// React Imports
import React, { useRef, useState } from "react";

// 3rd Party Imports
import { Button, Card, Grid, Input, Loading, Text } from "@nextui-org/react";
import { toast } from "react-hot-toast";

// Local Component Imports
import { InputSearchIcon } from "../common/icons/InputSearchIcon";
import { TablePagination } from "./Pagination";
import CoinTable from "./Table";
import Loader from "../common/Loading";

// Local Style Imports
import styles from "./coinList.module.css";

// Local Hook/Service Imports
import { useGetCoinList } from "./api/getCoinList";
import { useGetCoinIds } from "./api/getAllCoinIds";

const CoinList = () => {
  const [page, setPage] = useState(1);

  // search input value
  const search = useRef("");

  // search state for re-rendering the component when search value changes
  const [searchState, setSearchState] = useState("");

  

  // get coin ids for pagination and search (we need coin ids for search and
  // total coin count for pagination)
  const {
    coins,
    isLoading: isCoinIdsLoading,
    isError: isCoinIdsError,
  } = useGetCoinIds();

  // get coin list details
  const { coinList, isLoading, isError, error } = useGetCoinList(
    page,
    searchState
  );

  if (isError || isCoinIdsError) {
    if ((error as any).response?.status === 429) {
      return (
        <span>
          Deneme Api rate limit aşıldı. Lütfen 1 dakika sonra tekrar deneyiniz.
          1 dakika içinde yapabileceğiniz istek sayısı 10 ile 30 arasındadır.
        </span>
      );
    }

    return <span>Error: {(error as Error).message}</span>;
  }

  if (!coinList || !coins) {
    return <span>Not found</span>;
  }

  const filterCoins = (coins: any, search: string) => {
    return coins.filter(
      (coin: any) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  // we need coin ids for search
  const getCoinIdsBasedOnSearch = () => {
    if (!search.current) {
      return "";
    }
    const filteredCoins = filterCoins(coins, search.current);

    // check length, if its too long, alert user to narrow the search
    if (filteredCoins.length > 250) {
      toast.error("Lütfen arama sonucunu daraltınız.");
      setPage(1);
      setSearchState("");
      return "";
    }

    return filteredCoins.map((coin: any) => coin.id).join(",");
  };

  // we need total page count for pagination
  const getTotalPageBasedOnSearch = (search: string) => {
    // if there is no search, return total page count based on total coin count
    if (!search) {
      return Math.ceil(coins.length / 10);
    }

    const filteredCoins = filterCoins(coins, search);
    return Math.ceil(filteredCoins.length / 10) || 1;
  };

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const handleSearch = () => {
    const ids = getCoinIdsBasedOnSearch();
    setPage(1);
    setSearchState(ids);
  };

  const totalPages = getTotalPageBasedOnSearch(searchState);

  return (
    <Grid.Container gap={2} justify="space-between">
      <Card>
        <Card.Header>
          <Grid xs={12} md={12} lg={12}>
            <Text h3>Kripto Listesi</Text>
          </Grid>

          <Grid xs={12} sm={6} md={6} lg={6}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className={styles.searchForm}
            >
              <Input
                bordered
                color="primary"
                width="100%"
                borderWeight="light"
                contentLeft={<InputSearchIcon />}
                onChange={(e) => (search.current = e.target.value)}
              />
              <Button auto css={{ marginLeft: "1rem" }} type="submit">
                {isLoading ? <Loading color="white" /> : "Ara"}
              </Button>
            </form>
          </Grid>
        </Card.Header>
        <Card.Body>
          <Grid xs={12} md={12} lg={12}>
            {isLoading || isCoinIdsLoading ? (
              <Loader />
            ) : (
              <CoinTable coinList={coinList} />
            )}
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={12}
            css={{ display: "flex", justifyContent: "center" }}
          >
            <TablePagination
              page={page}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </Grid>
        </Card.Body>
      </Card>
    </Grid.Container>
  );
};

export default React.memo(CoinList);
