// components/BottomNavigation.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HomeOutlined, SlidersOutlined } from "@ant-design/icons";
import { Menu } from "antd";

const BottomNavigation = () => {
  const location = useLocation();

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[location.pathname]}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-around",
        borderTop: "1px solid #d9d9d9",
        backgroundColor: "#fff",
        zIndex: 1000,
      }}
    >
      <Menu.Item key="/" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/slider" icon={<SlidersOutlined />}>
        <Link to="/slider">Slider</Link>
      </Menu.Item>
    </Menu>
  );
};

export default BottomNavigation;
