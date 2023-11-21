import React from "react";

import "./pagination.css";

import { Pagination } from "antd";

export default function MyPagination({
  total = 5,
  changePage = null,
  current = 1,
}) {
  return (
    <Pagination
      onChange={(page) => changePage(page)}
      className="my-pagination"
      showSizeChanger={false}
      hideOnSinglePage
      defaultCurrent={1}
      current={current}
      pageSize={5}
      total={total}
    />
  );
}
