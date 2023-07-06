import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// Types and Hooks
import { CoinList } from "./types";
import styles from "./coinList.module.css";

// 3rd party libraries
import { Button, Text, User } from "@nextui-org/react";

// Global Zustand Store
import { useFavoriteCoinsStore } from "@/store/favoriteCoinsStore";

type Props = {
  coin: CoinList;
};

export const RenderCell = ({ coin }: Props) => {
  const router = useRouter();

  // global zustand store for favorite coins
  const [favorites, addFavoriteCoin, removeFavoriteCoin] =
    useFavoriteCoinsStore((state) => [
      state.favoriteCoins,
      state.addFavoriteCoin,
      state.removeFavoriteCoin,
    ]);

  const handleFavorite = (coin: CoinList) => {
    console.log("coin.id", coin.id);
    if (favorites.includes(coin.id)) {
      removeFavoriteCoin(coin.id);
    } else {
      //  // go to up  smooth
      // window.scrollTo({ top: 400, behavior: "smooth" });
      addFavoriteCoin(coin.id);
    }
  };

  return (
    <tr key={coin.id}>
      <td>
        <User
          squared
          src={coin?.image}
          name={coin?.name}
          css={{ p: 0, cursor: "pointer" }}
          onClick={() => router.push(`/coins/${coin?.id}`)}
        >
          {coin?.name}
        </User>
      </td>
      <td>
        <Text b>${coin?.current_price.toLocaleString()}</Text>
      </td>
      <td>
        <Text
          b
          color={
            coin.price_change_percentage_24h
              ? Number(coin.price_change_percentage_24h) > 0
                ? "success"
                : "error"
              : ""
          }
        >
          {coin.price_change_percentage_24h
            ? coin.price_change_percentage_24h.toLocaleString()
            : ""}
          %
        </Text>
      </td>
      <td>
        <Text
          b
          color={
            coin.price_change_24h
              ? Number(coin.price_change_24h) > 0
                ? "success"
                : "error"
              : ""
          }
        >
          ${coin.price_change_24h ? coin.price_change_24h.toLocaleString() : ""}
        </Text>
      </td>
      <td>
        <button
          className={styles.star}
          onClick={(e) => handleFavorite(coin)}
          type="button"
        >
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
        </button>
      </td>
    </tr>
  );
};
