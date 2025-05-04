import { Layout, theme } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import Sider from "antd/es/layout/Sider";
import SideMenu from "../components/sideMenu/SideMenu";
import useWindowDimensions from "../hooks/useWindowDimensions";
import styles from "./layoutstyle.module.css";
import CompHeader from "../components/header/Header";
import { checkRouteName } from "../utilities/utilities";

const { Header, Content, Footer } = Layout;
export const ProtectedLayout = () => {
 
  const IsLogin = useSelector((state) => state.AuthReducer.isLogin);

  const user = useSelector((state) => state.AuthReducer.user);

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();
  const location = useLocation();

  if (IsLogin == false) {
    return <Navigate to={"/"} />;
  }
  return (
    <Layout
    
      // hasSider
      style={{
        position: "fixed",
        width: "100%",
        backgroundColor: "var(--white-color)",
      }}
    >
      <Sider
        trigger={null}
        collapsible
        width={220}
        collapsed={width > 768 ? collapsed : true}
        style={{
          backgroundColor: "var(--white-color)",
          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
          overflow: "auto",
          height: "100vh",
          padding: 0,
          // position: "fixed",
          overflowX: "hidden",
          // transition: "width 2s ease 2s",

          // marginLeft: collapsed && 15,
        }}
      >
        <SideMenu
          collapsed={collapsed}
          onBackClick={() => setCollapsed(!collapsed)}
        />
      </Sider>

      <Layout className="site-layout" style={{backgroundColor: "var(--bg-color)"}}>
        <CompHeader
          onBackClick={() => setCollapsed(!collapsed)}
          collapsed={collapsed}
                   
          title={checkRouteName(location.pathname?.substring(1). replace(/([A-Z])/g, ' $1'
          ).trim())
          }

        
        />
        <Content className={styles.contentBox}
          // style={{
          //   // margin: "10px 4px",
          //   padding: "0px 20px",
          //   // minHeight: 650,
          //   background: "var(--bg-color)",
          //   height: "75vh",
          //   overflowY: "scroll",
          // }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export const ProtectedRoute = () => {
  const IsLogin = useSelector((state) => state.AuthReducer.isLogin);

  if (IsLogin == false) {
    // navigate('/login');
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};
