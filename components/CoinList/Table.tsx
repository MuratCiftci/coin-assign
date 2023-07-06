// Types and Hooks
import { CoinList } from "./types";

// Local imports
import React from "react";
import RenderCell from "./RenderCell";
import styles from "./coinList.module.css";

type Props = {
  coinList: CoinList[];
};

const CoinListTable = ({ coinList }: Props) => {
  const columns = [
    { name: "Ad", uid: "name" },
    { name: "Fiyat", uid: "current_price" },
    { name: "24s", uid: "price_change_percentage_24h" },
    { name: "24s İşlem", uid: "price_change_24h" },
    { name: "İşlemler", uid: "actions" },
  ];


  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.uid}>{column.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {coinList.map((coin) => (
          <RenderCell key={coin.id} coin={coin} />
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(CoinListTable);
