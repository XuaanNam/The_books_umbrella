import { Menu } from "antd";
import React from "react";

const menu = [
  <Menu
    className="border border-teal-500"
    items={[
      {
        key: "1",
        label: (
          <a className="text-lg" href="https://www.antgroup.com">
            Đã hoàn thành
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a className="text-lg" href="https://www.aliyun.com">
            Chờ duyệt
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a className="text-lg" href="https://www.luohanacademy.com">
            Đã hủy
          </a>
        ),
      },
    ]}
  />,
  <Menu
    className="border border-teal-500"
    items={[
      {
        key: "4",
        label: (
          <a className="text-lg" href="https://www.antgroup.com">
            Bìa cứng
          </a>
        ),
      },
      {
        key: "5",
        label: (
          <a className="text-lg" href="https://www.aliyun.com">
            Bìa mềm
          </a>
        ),
      },
    ]}
  />,
  <Menu
    className="border border-teal-500"
    items={[
      {
        key: "6",
        label: (
          <a className="text-lg" href="https://www.antgroup.com">
            Dưới 50.000 đ
          </a>
        ),
      },
      {
        key: "7",
        label: (
          <a className="text-lg" href="https://www.aliyun.com">
            50.000 {"->"} 120.000 đ
          </a>
        ),
      },
      {
        key: "8",
        label: (
          <a className="text-lg" href="https://www.aliyun.com">
            Trên 120.000 đ
          </a>
        ),
      },
    ]}
  />,
];
export default menu;
