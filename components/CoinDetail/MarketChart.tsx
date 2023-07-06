import React from "react";

// Hooks/Services
import { useGetMarketChart } from "../FavoriteCoins/api/getMarketChart";

// Components
import ButtonGroup from "./ButtonGroup";
import Loader from "../common/Loading";

// 3rd-party imports
import {  Card, Grid } from "@nextui-org/react";
import {
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
  Tooltip,
  XAxis,
} from "recharts";
import dayjs from "dayjs";

type Props = {
  coin: any;
};

export type Duration = 1 | 7 | 30 | 365;

const MarketChart = ({ coin }: Props) => {
  const id = coin.id;
  const [selectedDuration, setSelectedDuration] = React.useState<Duration>(1);

  const handleSelectDuration = (duration: Duration) => {
    setSelectedDuration(duration);
  };

  const { marketChart, isLoading, isError } = useGetMarketChart(
    id,
    selectedDuration
  );

  const data = marketChart?.prices.map((price: number[]) => ({
    day: dayjs(price[0]).format("DD/MM/YYYY HH:mm"),
    price: price[1].toFixed(4),
  }));
  console.log(data);

  return (
    <Card title="Market Chart" variant="bordered" >
      <Grid.Container>
        <Grid xs={12} css={{ mb: "$6" }}>
          <ButtonGroup
            selectedDuration={selectedDuration}
            handleSelectDuration={handleSelectDuration}
          />
        </Grid>
        <Grid xs={6}>
          {isLoading ? (
            <Loader color="primary" />
          ) : isError || !marketChart ? (
            <div>Market Chart not found</div>
          ) : (
            <>
              <CartesianGrid strokeDasharray="3 3" />
              <LineChart
                width={600}
                height={250}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                }}
              >
                <XAxis dataKey="day" style={{ fontSize: "10px" }} />
                <YAxis
                  domain={["dataMin", "dataMax"]}
                  dataKey={"price"}
                  style={{ fontSize: "10px" }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#82ca9d"
                  dot={false}
                />
              </LineChart>
            </>
          )}
        </Grid>
      </Grid.Container>
    </Card>
  );
};

export default MarketChart;
