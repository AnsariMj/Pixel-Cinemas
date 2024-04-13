
import {
  FieldTimeOutlined,
  FileImageOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlayCircleOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const { Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { gray } } = theme.useToken();
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // useEffect(() => {
  //   navigate("add-movie");
  // }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: gray, height: "100vh", position: "fixed", left: 0 }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapsed}
          style={{ position: "absolute", top: 20, left: collapsed ? 75 : 200, zIndex: 1 }}
        />
        <div className="bg-teal-700">
          <h2 className="text-white text-xl text-center py-5 mb-0">
            <span className="sm-logo">Pixel </span>
            <span className="lg-logo">Cinemas</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["key"]}
          onClick={({ key }) => {
            if (key === "logout") {
              toast.warning("Logout Successfully ");
              localStorage.removeItem("token");
              window.location.reload();
            } else {
              navigate(key);
            }
          }}
          inlineCollapsed={collapsed}
        >
          <Menu.Item key="add-movie" icon={<PlayCircleOutlined />}>Add Movies</Menu.Item>
          <Menu.Item key="add-timing" icon={<FieldTimeOutlined />}>Add Timing</Menu.Item>
          <Menu.Item key="add-banner" icon={<FileImageOutlined />}>Add Banner</Menu.Item>
          <Menu.Item key="all-movie" icon={<VideoCameraOutlined />}>Movie Details</Menu.Item>
          <Menu.Item key="all-banner" icon={<UnorderedListOutlined />}>Banner Details</Menu.Item>
          <Menu.Item key="user-details" icon={<UserOutlined />}>User Details</Menu.Item>
          <Menu.Item key="/" ></Menu.Item>
          <Menu.Item key="logout" icon={<UploadOutlined />}>Logout</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Content style={{ margin: "24px 16px", padding: 24, background: gray }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout >
  );
};

export default Dashboard;