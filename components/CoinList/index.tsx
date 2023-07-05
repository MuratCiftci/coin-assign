import React from "react";
import { useGetCoinList } from "./api/getCoinList";
import CoinTable from "./Table";

const CoinList = () => {
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

  return <CoinTable coinList={coinList} />;
};

export default CoinList;
