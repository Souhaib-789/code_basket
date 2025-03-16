import { Layout, theme } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getUser, isLogin } from "../Store/Actions/AuthAction";
import { sessionExpired } from "../Store/Actions/GeneralActions";
import { AuthMiddleware } from "../Store/Middlewares/AuthMiddleware";
import Sider from "antd/es/layout/Sider";
import SideMenu from "../components/sideMenu/SideMenu";
import useWindowDimensions from "../hooks/useWindowDimensions";

import CompHeader from "../components/header/Header";
import { checkRouteName } from "../utilities/utilities";
// import { roles } from "../config/roles";

const { Header, Content, Footer } = Layout;
export const ProtectedLayout = () => {
  // const agoraClient = useRTCClient(
  //   AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  // ); // Initialize Agora Client
  const IsLogin = useSelector((state) => state.AuthReducer.isLogin);

  // const showRinger = useSelector((state) => state.GeneralReducer.showRinging);
  // const ringingOptions = useSelector(
  //   (state) => state.GeneralReducer.ringingOptions
  // );
  const user = useSelector((state) => state.AuthReducer.user);
  // const SessionExpired = useSelector(
  //   (state) => state.GeneralReducer.sessionExpired
  // );
  // const [isModalOpen, setIsModalOpen] = useState(!user?.is_subscribed);

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();
  const location = useLocation();

  // useEffect(() => {
  //   dispatch(AuthMiddleware.GeneralType());
  // }, []);

  // useEffect(() => {
  //   timeoutRinger()
  // }, [showRinger]);

  // const timeoutRinger = () => {
  //   if (showRinger) {
  //     setTimeout(() => {
  //       callEndButton();
  //     }, 20000);
  //   }

  // }
  // const callEndButton = () => {
  //   dispatch(
  //     VideoCallMiddleware.declineCall({
  //       receiver_id: ringingOptions?.room_name
  //         ? false
  //         : ringingOptions?.caller_id,
  //       caller_id: ringingOptions?.room_name ? false : user?.id,
  //       channel: ringingOptions?.channel_name,
  //     })
  //   ).then((data) => {
  //     dispatch(hideRinging());
  //   });
  // };
  // const callRecieveButton = () => {
  //   dispatch(VideoCallMiddleware.acceptCall())
  //     .then(() => {
  //       ringingOptions?.is_group_call
  //         ? navigate("/videoCall", {
  //             state: {
  //               data: ringingOptions,
  //               group: true,
  //             },
  //           })
  //         : navigate("/singleVideoCall", {
  //             state: {
  //               data: ringingOptions,
  //               group: false,
  //               incomming: true,
  //             },
  //           });
  //     })
  //     .catch();
  //   dispatch(hideRinging());
  // };

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

      <Layout className="site-layout">
        {/* <Header
            style={{ padding: 0, background: "var(--bg-color)", height: 85 }}
          > */}
        <CompHeader
          onBackClick={() => setCollapsed(!collapsed)}
          collapsed={collapsed}
                   
          title={checkRouteName(location.pathname?.substring(1). replace(/([A-Z])/g, ' $1'
          ).trim())
          }

        
        />
        {/* </Header> */}
        <Content
          style={{
            // margin: "10px 4px",
            padding: "0px 20px",
            // minHeight: 650,
            background: "var(--bg-color)",
            height: "75vh",
            overflowY: "scroll",
          }}
        >
          {/* <Box boxClass={styles.contentBox}> */}
          <Outlet />
          {/* </Box> */}
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
