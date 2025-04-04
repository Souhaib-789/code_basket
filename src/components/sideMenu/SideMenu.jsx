import { Menu } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import "./sideMenu.css";
import { AuthMiddleware } from "../../Store/Middlewares/AuthMiddleware";
import { checkRouteName } from "../../utilities/utilities";
import { FiHome } from "react-icons/fi";
import { LuFileCode2, LuUser } from "react-icons/lu";
import { BiBasket, BiSolidBasket } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import ModalComponent from "../modal/ModalComponent";
import TextComponent from "../textComponent/TextComponent";
import SubmitButton from "../submitButton/SubmitButton";

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




const SideMenu = ({ collapsed, onBackClick }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const navigate = useNavigate();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);


  
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
      key: "myBasket",
      icon: <BiBasket className="sidebarIcon" />,
      label: <h4 className="menu-lable">My Basket</h4>,
      onClick: () => {
        navigation("/myBasket");
      },
    },
    {
      style: menuStyle,
      key: "profile",
      icon: <LuUser className="sidebarIcon" />,
      label: <h4 className="menu-lable">Profile</h4>,
      onClick: () => {
        navigation("/profile");
      },
    },
    {
      style: menuStyle,
      key: "about",
      icon: <LuFileCode2 className="sidebarIcon" />,
      label: <h4 className="menu-lable">About</h4>,
      onClick: () => {
        navigation("/about");
      },
    },

    // {
    //   style: menuStyle,
    //   key: "feedback",
    //   icon: <MdOutlineFeedback className="sidebarIcon" />      ,
    //   label: <h4 className="menu-lable">Feedback</h4>,
    //   onClick: () => {
    //     navigation("/feedback");
    //   },
    // },
    {
      style: menuStyle,
      key: "logout",
      icon: <IoLogOutOutline className="sidebarIcon" />,
      label: <h4 className="menu-lable">Logout</h4>,
      onClick: () => {
        setOpenLogoutModal(true);
      },
    },
  ];
};

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
            src={require("../../assets/images/sideLogo.png")}
            alt="logo"
            style={{ width: "50%", height: "50%" }}
          />
        ) : (
          <img
            src={require("../../assets/images/sideLogo.png")}
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

      <ModalComponent  open={openLogoutModal} closable onCancel={() => setOpenLogoutModal(false)} >
        <TextComponent text={'Logout'} className="logout_text" />
        <TextComponent text={'Are you sure you want to logout?'} className="logout_sub_text" />
        <div className="logout_btn_container">
          <SubmitButton title={'Cancel'} secondaryBtn btnClass="cancel_btn" onClick={() => { setOpenLogoutModal(false) }} />
          <SubmitButton title={'Yes'} primaryBtn btnClass="logout_btn" onClick={logout} />
        </div>

      </ModalComponent>
    </div>
  );
};

export default SideMenu;
