import React, { useState } from "react";
import { Dropdown, Menu, Space } from "antd";

const HeaderAdmin = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="relative border h-[10%] ">
      <Space direction="vertical">
        <Space wrap>
          <Dropdown overlay={MenuDropdown} placement="bottomRight">
            <button
              onClick={() => setShowMenu(true)}
              className="absolute right-12 text-black font-medium text-lg"
            >
              user
            </button>
          </Dropdown>
        </Space>
      </Space>
    </div>
  );
};
export default HeaderAdmin;

//  const [showModal, setShowModal] = useState(false);<div><Modal open={showModal}></Modal></div>
function MenuDropdown(props) {
  return (
    <Menu
      items={[
        {
          key: "1",
          label: <a href="/Profile">Thông tin cá nhân</a>,
        },
        {
          key: "2",
          label: <a href="https://www.luohanacademy.com">Đăng xuất</a>,
        },
      ]}
    />
  );
}
