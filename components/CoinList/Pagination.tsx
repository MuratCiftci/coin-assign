import React from "react";
import { Pagination } from "@nextui-org/react";

type Props = {
  page: number;
  onPageChange: (pageNumber: number) => void;
  totalPages: number;
};

export const TablePagination = ({ page, onPageChange, totalPages }: Props) => {
  return (
    <Pagination
      total={totalPages}
      initialPage={page}
      onChange={onPageChange}
      css={{ marginTop: "1rem", width: "100%" }}
    />
  );
};
