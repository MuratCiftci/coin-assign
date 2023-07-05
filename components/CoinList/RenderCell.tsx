import React from "react";
import { CoinList } from "./types";
import { Text, User } from "@nextui-org/react";
import Image from "next/image";
import styles from "./coinList.module.css";
import { useFavoriteCoinsStore } from "@/store/favoriteCoinsStore";

type Props = {
  coin: CoinList;
  columnKey: React.Key;
};

export const RenderCell = ({ coin, columnKey }: Props) => {
  const cellValue = coin[columnKey as keyof CoinList];

  // global zustand store for favorite coins
  const [favorites, addFavoriteCoin, removeFavoriteCoin] =
    useFavoriteCoinsStore((state) => [
      state.favoriteCoins,
      state.addFavoriteCoin,
      state.removeFavoriteCoin,
    ]);

  const handleFavorite = () => {
    if (favorites.includes(coin.id)) {
      removeFavoriteCoin(coin.id);
    } else {
      addFavoriteCoin(coin.id);
    }
  };

  switch (columnKey) {
    case "name":
      return (
        <User squared src={coin?.image} name={cellValue} css={{ p: 0 }}>
          {coin?.name}
        </User>
      );
    case "current_price":
      return <Text b>${cellValue}</Text>;
    case "price_change_percentage_24h":
      return (
        <Text
          b
          color={cellValue ? (Number(cellValue) > 0 ? "success" : "error") : ""}
        >
          {cellValue ? Number(cellValue).toFixed(2) : ""}%
        </Text>
      );
    case "price_change_24h":
      return (
        <Text
          b
          color={cellValue ? (Number(cellValue) > 0 ? "success" : "error") : ""}
        >
          ${cellValue ? Number(cellValue).toFixed(8) : ""}
        </Text>
      );
    case "actions":
      return (
        <div className={styles.star} onClick={() => handleFavorite()}>
          {favorites.includes(coin.id) ? (
            <Image
              src="/star-yellow.png"
              alt="star-yellow"
              width={20}
              height={20}
            />
          ) : (
            <Image
              src="/star.png"
              alt="star-empty"
              width={20}
              height={20}
            />
          )}
        </div>
      );
    default:
      return cellValue;
  }
};
