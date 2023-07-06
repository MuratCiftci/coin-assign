import React from "react";
import styles from "./coinDetail.module.css";

type Props = {
  coin: any;
};

const DetailTable = ({ coin }: Props) => {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <th className={styles.th}> Piyasa Değeri </th>
          <th className={styles.th}> Hacim (24h) </th>
          <th className={styles.th}> En Düşük / En Yüksek (24h) </th>
        </tr>

        <tr className={styles.tr}>
          <td className={styles.td}>
            {" "}
            ${coin?.market_data.market_cap.usd.toLocaleString()}{" "}
          </td>
          <td className={styles.td}>
            ${coin?.market_data.total_volume.usd.toLocaleString()}
          </td>
          <td className={styles.td}>
            ${coin?.market_data.low_24h.usd.toLocaleString()} / $
            {coin?.market_data.high_24h.usd.toLocaleString()}
          </td>
        </tr>
      </thead>
    </table>
  );
};

export default DetailTable;
