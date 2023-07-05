import React from "react";
import {
  LineChart,
  Line,
  YAxis,
} from "recharts";

import { useGetMarketChart } from "./api/getMarketChart";

type Props = {
  id: string;
  isCoinRising: boolean;
};

const MarketChart = ({ id, isCoinRising }: Props) => {
  const { marketChart, isLoading, isError } = useGetMarketChart(id, 1);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !marketChart) {
    return <div>Market Chart not found</div>;
  }

  const data = marketChart.prices.map((price :  number[]) => ({
    pv: price[1],
  }));

  return (
      <LineChart
        width={260}
        height={90}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
        }}
      >
        <YAxis domain={ ["dataMin", "dataMax"] } hide={true} />
     
        <Line type="monotone" dataKey="pv" stroke="#82ca9d"  dot={false} />
      </LineChart>
  );
};

export default MarketChart;
