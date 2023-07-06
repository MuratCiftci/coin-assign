
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// Next UI  
import { Badge, Grid, Text } from "@nextui-org/react";

// Types and Hooks and Services
import { useGetCoinDetail } from "./api/getCoinDetail";
import UpIcon from "../common/icons/UpIcon";
import DownIcon from "../common/icons/DownIcon";

// Local imports
import DetailTable from "./DetailTable";
import MarketChart from "./MarketChart";
import CoinNews from "./CoinNews";

// Styles and icons
import styles from "./coinDetail.module.css";
import BreadCrumb from "../common/icons/BreadCrumb";
import Loader from "../common/Loading";

const CoinDetail = () => {
  // get coin id from router
  const router = useRouter();
  const { id } = router.query as { id: string };

  // get coin details
  const { coin, isLoading, isError } = useGetCoinDetail(id);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Coin not found</div>;
  }

  const isCoinRising = Number(coin?.price_change_percentage_24h) > 0;

  return (
    <Grid.Container gap={1} className={styles.container}>
      <Grid
        xs={12}
        sm={12}
        md={12}
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Text
          css={{ fontSize: "$4", fontWeight: "bold", cursor: "pointer" }}
          onClick={() => router.push("/")}
        >
          {" "}
          Market Listesi{" "}
        </Text>
        <BreadCrumb />
        <Text css={{ fontSize: "$4", fontWeight: "bold" }}> {coin?.name} </Text>
      </Grid>

      <Grid
        xs={6}
        sm={6}
        md={6}
        css={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Grid xs={3} sm={4} md={3}>
          <Badge color="default"> Rank #{coin?.market_cap_rank} </Badge>
        </Grid>

        <Grid
          xs={12}
          sm={12}
          md={12}
          css={{ display: "flex", alignItems: "flex-end" }}
        >
          {" "}
          <Image
            src={coin?.image.small || ""}
            width={36}
            height={36}
            alt="coin image"
          />{" "}
          <Text h5 css={{ lineHeight: "$xs", ml: 4 }}>
            {" "}
            {coin?.name} -{" "}
          </Text>
          <Text h5 css={{ lineHeight: "$xs", color: "$gray600", ml: 6 }}>
            {" "}
            ${coin?.symbol}{" "}
          </Text>{" "}
          <Text h5 css={{ lineHeight: "$xs", ml: "2rem" }}>
            {" "}
            ${coin?.market_data.current_price.usd.toLocaleString()}{" "}
          </Text>
          <Text
            h5
            css={{
              lineHeight: "$xs",
              color: isCoinRising ? "green" : "red",
              ml: "1rem",
            }}
          >
            {" "}
            {isCoinRising ? <UpIcon /> : <DownIcon />}{" "}
            {coin?.market_data.price_change_percentage_24h} %
          </Text>{" "}
        </Grid>

        <Grid xs={12} sm={12} md={12}>
          <DetailTable coin={coin} />
        </Grid>

        <Grid xs={12} sm={12} md={12}>
          <MarketChart coin={coin} />
        </Grid>
        <Grid xs={12} sm={12} md={12}>
          <p
            dangerouslySetInnerHTML={{ __html: coin.description.en }}
            className={styles.description}
          ></p>
        </Grid>
      </Grid>
      <Grid
        xs={6}
        sm={6}
        md={6}
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          width: "60%",
        }}
      >
        <CoinNews />
      </Grid>
    </Grid.Container>
  );
};

export default CoinDetail;
