import React from "react";
import { CoinList } from "./types";
import { Text, User } from "@nextui-org/react";
import Image from "next/image";
import styles from "./coinList.module.css";

type Props = {
  coin: CoinList;
  columnKey: React.Key;
};

export const RenderCell = ({ coin, columnKey }: Props) => {
  const cellValue = coin[columnKey as keyof CoinList];

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
        <div className={styles.star}>
          <Image src={"/star.png"} width={20} height={20} alt="star" />
        </div>
      );
    default:
      return cellValue;
  }
};
