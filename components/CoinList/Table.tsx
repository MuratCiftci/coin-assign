import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { CoinList } from "./types";
import Image from "next/image";
import { RenderCell } from "./RenderCell";
import { useRouter } from "next/router";

type Props = {
  coinList: CoinList[];
};

export default function CoinListTable({ coinList }: Props) {
  const router = useRouter();
  const columns =
    coinList?.length === 0
      ? [{ name: "İşlemler", uid: "actions" }]
      : [
          { name: "Ad", uid: "name" },
          { name: "Fiyat", uid: "current_price" },
          { name: "24h", uid: "price_change_percentage_24h" },
          { name: "24h volume", uid: "price_change_24h" },
          { name: "İşlemler", uid: "actions" },
        ];

  return (
    <Table
      compact
      aria-label="Coin List"
      css={{
        backgroundColor: "#FFF",
        height: "auto",
        minWidth: "100%",
        marginTop: "1rem",
        borderRadius: "0.5rem",
      }}
      selectionMode="none"
      onSelectionChange={(e: any) => {
        router.push(`/coins/${e.anchorKey}`);
      }}
      containerCss={{
        width: "99%",
        backgroundColor: "#fff",
        border: "none !important",
      }}
      lined={coinList?.length === 0 ? false : true}
      headerLined={coinList?.length === 0 ? false : true}
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
            <Table.Row key={item.id}>
              {(columnKey) => (
                <Table.Cell>
                  <RenderCell coin={item} columnKey={columnKey} />
                </Table.Cell>
              )}
            </Table.Row>
          )
        )}
      </Table.Body>
    </Table>
  );
}
