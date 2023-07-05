import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { CoinList } from "./types";
import Image from "next/image";
import styles from "./coinList.module.css";


type Props = {
  coinList: CoinList[];
};

export default function CoinListTable({ coinList }: Props) {


  const columns = [
    { name: "Ad", uid: "name" },
    { name: "Fiyat", uid: "current_price" },
    { name: "24h", uid: "price_change_percentage_24h" },
    { name: "24h volume", uid: "price_change_24h" },
    { name: "İşlemler", uid: "actions" },
  ];

  const renderCell = (coin: CoinList, columnKey: React.Key) => {
    const cellValue = coin[columnKey as keyof CoinList];
    switch (columnKey) {
      case "name":
        return (
          <User squared src={coin?.image} name={cellValue} css={{ p: 0 }}>
            {coin?.name}
          </User>
        );
      case "current_price":
        return <Text b>${cellValue}</Text>;
      case "price_change_percentage_24h":
        return (
          <Text
            b
            color={
              cellValue ? (Number(cellValue) > 0 ? "success" : "error") : ""
            }
          >
            {cellValue ? Number(cellValue).toFixed(2) : ""}%
          </Text>
        );

      case "price_change_24h":
        return (
          <Text
            b
            color={
              cellValue ? (Number(cellValue) > 0 ? "success" : "error") : ""
            }
          >
            ${cellValue ? Number(cellValue).toFixed(8) : ""}
          </Text>
        );
      case "actions":
        return (
          // add to favorites star
          <div className={styles.star}>
            <Image src={"/star.png"} width={20} height={20} alt="star" />
          </div>
        );

      default:
        return cellValue;
    }
  };
  return (
    <Table
      aria-label="Coin List"
      css={{
        backgroundColor: "#FFF",
        height: "auto",
        minWidth: "100%",
        marginTop: "1rem",
        borderRadius: "0.5rem",
      }}
      containerCss={{
        width: "99%",
        backgroundColor: "#fff",
        border: "none !important",
      }}
      lined={coinList?.length === 0 ? false : true}
      headerLined={coinList?.length === 0 ? false : true}
      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={coinList}>
        {coinList?.length === 0 ? (
          <Table.Row key={0}>
            <Table.Cell
              css={{
                d: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text size="medium" style={{ textAlign: "center" }}>
                Kayıtlı Kripto Para Bulunamadı
              </Text>
            </Table.Cell>
          </Table.Row>
        ) : (
          (item: CoinList) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>
                  {renderCell(item, columnKey as keyof CoinList)}
                </Table.Cell>
              )}
            </Table.Row>
          )
        )}
      </Table.Body>
      <Table.Pagination
        shadow
        noMargin
        align="center"
        rowsPerPage={coinList.length > 10 ? 10 : coinList.length}
        onPageChange={(page) => console.log({ page })}
      />
    </Table>
  );
}
