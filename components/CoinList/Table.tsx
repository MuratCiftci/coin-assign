import { useRouter } from "next/router";

// 3rd party imports
import { Button, Col, Row, Table, Text, User } from "@nextui-org/react";
import { useReactTable } from "@tanstack/react-table";

// Types and Hooks
import { CoinList } from "./types";

// Local imports
import React from "react";
import {RenderCell} from "./RenderCell";
import { Tooltip } from "recharts";
import styles from "./coinList.module.css";
import { useFavoriteCoinsStore } from "@/store/favoriteCoinsStore";
import Image from "next/image";
type Props = {
  coinList: CoinList[];
};
type UserType = {
  id: string | number;
  name?: string;
  email?: string;
  role?: string;
  team?: string;
  status: "active" | "paused" | "vacation";
  age?: string;
  avatar?: string;
};

const CoinListTable = ({ coinList }: Props) => {
  const router = useRouter();
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
