import { CoinNews } from "@/components/CoinDetail/types/CoinNews";
import React from "react";
import styles from "./newsCard.module.css";
import { Text, Card } from "@nextui-org/react";
import dayjs from "dayjs";
import Link from "next/link";

type Props = {
  news: CoinNews;
};

const NewsCard = ({ news }: Props) => {
  return (
    <Card className={styles.newsCard}>
      <Link key={news.id} href={`/news/${news.id}`}>
        <Card.Header
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text className={styles.newsDate}>
            {dayjs(news.createdAt).format("DD/MM/YYYY HH:mm")}
          </Text>
          <Text>{news.title}</Text>
          <img
            src={news.image}
            width={75}
            height={67}
            alt="coin image"
            className={styles.newsImage}
          />
        </Card.Header>
        <Text css={{ color: "$gray700" }} className={styles.newsSubtitle}>
          {news.subtitle.slice(0, 120) +
            (news.subtitle.length > 120 ? "..." : "")}
        </Text>
      </Link>
    </Card>
  );
};

export default NewsCard;
