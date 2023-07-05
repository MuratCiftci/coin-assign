import React from "react";
import { useGetCoinById } from "./api/getCoinById";
import { Card, Grid, Image, Text } from "@nextui-org/react";

// chart js imports
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import Chart from "./Chart";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


interface Props {
  id: string;
}

const CoinCard = ({ id }: Props) => {
  const { coin, isLoading, isError, error } = useGetCoinById(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Coin not found</div>;
  }
  return (
    <Card css={{ p: "$6", mw: "400px" }}>
      <Card.Header>
        <Image
          alt="nextui logo"
          src={coin?.image || ""}
          width={34}
          height={34}
        />
        <Grid.Container css={{ pl: "$6" }}>
          <Grid xs={12}>
            <Text h4 css={{ lineHeight: "$xs" }}>
              {coin?.name}
            </Text>{" "}
          </Grid>
          <Grid xs={12}>
            <Text css={{ lineHeight: "$xs", color: "$gray600" }}>
              ${coin?.symbol}
            </Text>
          </Grid>
        </Grid.Container>

        <Grid.Container css={{ pl: "$6" }}>
          <Grid xs={12}>
            <Text h5 css={{ lineHeight: "$xs" }}>
              ${coin?.current_price}
            </Text>{" "}
          </Grid>
          <Grid xs={12}>
            <Text
              css={{
                lineHeight: "$xs",
                color:
                  Number(coin?.price_change_percentage_24h) > 0
                    ? "$success"
                    : "$error",
              }}
              h6
            >
              ${coin?.price_change_percentage_24h.toFixed(3)} (
              {coin?.market_cap_change_percentage_24h.toFixed(2)}%)
            </Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: "$2" }}>
        <Text>
            lorem
        </Text>
      </Card.Body>
    </Card>
  );
};

export default CoinCard;
