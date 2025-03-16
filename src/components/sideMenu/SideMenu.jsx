import { Menu } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import "./sideMenu.css";
import { AuthMiddleware } from "../../Store/Middlewares/AuthMiddleware";
import Storage from "../../utilities/AsyncStorage";
import { checkRouteName } from "../../utilities/utilities";
import { FaSignOutAlt } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { GoFileCode } from "react-icons/go";
import { LuFileCode2 } from "react-icons/lu";

const menuStyle = {
  borderRadius: 0,
  width: "100%",
  margin: 0,
  paddingLeft: 0,
  borderTopLeftRadius: "0px",
  borderBottomLeftRadius: "0px",
  marginBottom: 5,
  fontFamily: "var(--font-family)",
};



const MenuList = (navigation, logout) => {
  return [
    {
      style: menuStyle,
      key: "dashboard",
      icon: <FiHome className="sidebarIcon" />,
      label: <h4 className="menu-lable">Home</h4>,
      onClick: () => {
        navigation("/dashboard");
      },
    },
    {
        style: menuStyle,
        key: "uploadSnippet",
        icon: <LuFileCode2  className="sidebarIcon" />,
        label: <h4 className="menu-lable">My Basket</h4>,
        onClick: () => {
          navigation("/uploadSnippet");
        },
      },
    {
      style: menuStyle,
      key: "logout",
      icon: <FaSignOutAlt className="sidebarIcon" />,
      label: <h4 className="menu-lable">Logout</h4>,
      onClick: logout,
    },
  ];
};

const SideMenu = ({ collapsed, onBackClick }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const navigate = useNavigate();


  const logout = () => {
    dispatch(AuthMiddleware.logout()).then((data) => {
      navigation("/");
    });
  };

  const menus = MenuList(navigation, logout);


  return (
    <div className="menu-main-container">
      <div className="logo_container">
        {collapsed ? (
          <img
            src={require("../../assets/images/sidebarIcons/sideLogo.png")}
            alt="logo"
            style={{ width: "50%", height: "50%" }}
          />
        ) : (
          <img
            src={require("../../assets/images/sidebarIcons/sideLogo.png")}
            alt="logo"
            style={{ width: "70%", height: "70%" }}
          />
        )}
      </div>
      <Menu
        _internalDisableMenuItemTitleTooltip
        className={`${collapsed ? "menu-colapsed" : "menu"}`}
        mode="inline"
        defaultSelectedKeys={checkRouteName(location.pathname?.substring(1))}
        selectedKeys={checkRouteName(location.pathname?.substring(1))}
        items={menus}
      />
    </div>
  );
};

export default SideMenu;
