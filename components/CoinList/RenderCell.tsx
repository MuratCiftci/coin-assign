import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// Types and Hooks 
import { CoinList } from "./types";
import styles from "./coinList.module.css";

// 3rd party libraries
import { Text, User } from "@nextui-org/react";

// Global Zustand Store
import { useFavoriteCoinsStore } from "@/store/favoriteCoinsStore";

type Props = {
  coin: CoinList;
  columnKey: React.Key;
};

export const RenderCell = ({ coin, columnKey }: Props) => {
  const router = useRouter();

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

       // go to up  smooth
      window.scrollTo({ top: 400, behavior: "smooth" });
      addFavoriteCoin(coin.id);
    }
  };

  switch (columnKey) {
    case "name":
      return (
        <User
          squared
          src={coin?.image}
          name={cellValue}
          css={{ p: 0 , cursor: "pointer"}}
          onClick={() => router.push(`/coins/${coin?.id}`)}
        >
          {coin?.name}
        </User>
      );
    case "current_price":
      return <Text b>${cellValue?.toLocaleString()}</Text>;
    case "price_change_percentage_24h":
      return (
        <Text
          b
          color={cellValue ? (Number(cellValue) > 0 ? "success" : "error") : ""}
        >
          {cellValue ? cellValue.toLocaleString() : ""}%
        </Text>
      );
    case "price_change_24h":
      return (
        <Text
          b
          color={cellValue ? (Number(cellValue) > 0 ? "success" : "error") : ""}
        >
          ${cellValue ? cellValue.toLocaleString() : ""}
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
            <Image src="/star.png" alt="star-empty" width={20} height={20} />
          )}
        </div>
      );
    default:
      return cellValue;
  }
};
