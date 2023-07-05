import React from "react";
import { useGetCoinById } from "./api/getCoinById";
import { Card, Grid, Image, Text } from "@nextui-org/react";
import MarketChart from "./MarketChart";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  id: string;
}

const CoinCard = ({ id }: Props) => {
  // router
  const router = useRouter();

  // data fetching for coin details
  const { coin, isLoading, isError } = useGetCoinById(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Coin not found</div>;
  }

  const isCoinRising = Number(coin?.price_change_percentage_24h) > 0;
  return (
    <Link href={`/coins/${coin?.id}`}>
    <Card
      css={{ p: "$6", mw: "400px", cursor: "pointer" }}
    
    >
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
      <Card.Footer>
        <Grid.Container gap={1}>
          <Grid xs={12} justify="flex-end">
            <Text
              css={{
                lineHeight: "$xs",
                color: "$gray600",
              }}
            >
              Son 24 Saat
            </Text>
          </Grid>
          <Grid xs={12}>
            <MarketChart id={id} isCoinRising={isCoinRising} />
          </Grid>
        </Grid.Container>
      </Card.Footer>
    </Card>
    </Link>
  );
};

export default CoinCard;
