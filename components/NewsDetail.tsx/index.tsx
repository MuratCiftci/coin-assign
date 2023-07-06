import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// Hooks/Services
import { useGetNewsDetailsById } from "./api/getNewsDetails";

// Components
import Loader from "../common/Loading";

// 3rd party libraries
import { Grid, Text } from "@nextui-org/react";
import dayjs from "dayjs";

// Styles/Icons
import styles from "./news.module.css";
import BackArrow from "../common/icons/BackArrow";

const NewsDetails = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { newsDetails, isLoading, isError } = useGetNewsDetailsById(id);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Haber bulunamadı</div>;
  }

  return (
    <Grid.Container gap={1} justify="center">
      <Grid xs={12} sm={12} md={12} className={styles.backContainer}>
        <Text className={styles.text} onClick={() => router.push("/")}>
          {" "}
          <BackArrow />
          <Text className={styles.home}> Ana Sayfa </Text>
        </Text>
      </Grid>

      <Grid xs={12} sm={12} md={12} className={styles.gridContainer}>
        <Text className={styles.title}> {newsDetails?.title} </Text>
      </Grid>

      <Grid xs={12} sm={12} md={12} className={styles.gridContainer}>
        <Text className={styles.subTitle}> {newsDetails?.subtitle} </Text>
      </Grid>
      <Grid xs={12} sm={12} md={12} className={styles.gridContainer}>
        <Text className={styles.date}>
          {" "}
          {dayjs(newsDetails?.createdAt).format("DD/MM/YYYY HH:mm")}{" "}
        </Text>
      </Grid>

      <Grid xs={12} sm={12} md={12} className={styles.gridContainer}>
        <Image
          src={newsDetails?.image || ""}
          className={styles.image}
          alt="coin image"
          width={300}
          height={200}
        />
      </Grid>

      <Grid xs={12} sm={12} md={12} className={styles.contentContainer}>
        <div dangerouslySetInnerHTML={{ __html: newsDetails?.content || "" }} />
      </Grid>
    </Grid.Container>
  );
};

export default NewsDetails;
