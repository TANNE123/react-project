import React, { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import {
  HomeOutlined,
  VideoCameraOutlined,
  UserOutlined,
  HeartOutlined,
  MenuOutlined,
  MoonOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import "./App.css";
import { NavLink, Outlet } from "react-router-dom";

import logo from "..//public/project-Logo.png";
import ProfileComponent from "./components/multimedia-components/profile-component";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleResize = () => {
    if (window.innerWidth <= 700) {
      setIsMobile(true);
      setCollapsed(true);
    } else {
      setIsMobile(false);
      setCollapsed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header/Navbar */}
      <Header className="header">
        <div>
          <div>
            <NavLink to="/" className="NavLink">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <div className="menu-button">
            <Button
              className="menu-toggle"
              onClick={() => setCollapsed(!collapsed)}
              icon={<MenuOutlined />}
            />
          </div>
        </div>
        <div>
          <div className="profile-div">
            <NavLink type="primary" to={`/live/${12345}`}>
              <VideoCameraOutlined />
              <label>Live</label>
            </NavLink>

            {/* Toggle profile bar visibility */}
            <Button
              onClick={() => setProfileOpen(!profileOpen)}
              icon={<UserOutlined />}
            />
          </div>
        </div>
      </Header>

      <Layout>
        {/* Sidebar */}
        <Sider
          width={250}
          collapsed={collapsed}
          style={{ display: collapsed && isMobile ? "none" : "block" }}
        >
          <div className="said-nav-bar">
            <div>
              <NavLink onClick={handleResize} to="/">
                <HomeOutlined />

                <label>{collapsed ? "" : "HOME"}</label>
              </NavLink>
            </div>
            <div>
              <NavLink onClick={handleResize} to="/video">
                <VideoCameraOutlined />
                <label>{collapsed ? "" : "Reels"}</label>
              </NavLink>
            </div>

            <div>
              <NavLink onClick={handleResize} to="/Favorites">
                <HeartOutlined />
                <label>{collapsed ? "" : "Favorites"}</label>
              </NavLink>
            </div>
            <div>
              <NavLink onClick={handleResize} to="/Themes">
                <MoonOutlined />
                <label>{collapsed ? "" : "Themes"}</label>
              </NavLink>
            </div>
          </div>
        </Sider>

        {/* Main Content Area */}
        <Layout>
          <Content
            className="Main-Content-Area"
            style={{ padding: "80px 16px 24px 16px" }}
          >
            <Outlet />
          </Content>
        </Layout>

        {/* Profile Bar */}
        {profileOpen && (
          <div className="profile-bar">
            <ProfileComponent />
          </div>
        )}
      </Layout>
    </Layout>
  );
};

export default App;
