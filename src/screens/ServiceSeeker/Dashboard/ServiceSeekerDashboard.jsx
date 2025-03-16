import React from "react";
import { AuthMiddleware } from "../../../Store/Middlewares/AuthMiddleware";
import { Button, List, Switch } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLogin } from "../../../Store/Actions/AuthAction";
import { sessionExpired } from "../../../Store/Actions/GeneralActions";
import Card from "../../../components/Card/Card";

import styles from "./dealership.module.css";
import { TextComponent } from "../../../components";

const ServiceSeekerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    // dispatch(AuthMiddleware.logout()).then((data) => {
    //   dispatch(getUser(null));
    dispatch(isLogin(false));
    //   dispatch(sessionExpired(false));
    //   localStorage.clear();
    navigate("/");
    // });
  };

  const recentOrders = [
    {
      name: "Phoenix Immobilizer N16",
      image: require("../../../assets/images/staticImages/p1.png"),
      items: 100,
    },
    {
      name: "Phoenix Immobilizer N16",
      image: require("../../../assets/images/staticImages/p2.png"),
      items: 100,
    },
  ];

  const Inventory = [
    {
      name: "Phoenix Immobilizer N16",
      image: require("../../../assets/images/staticImages/p1.png"),
      version: "1.0.5",
      drive: true,
    },
    {
      name: "Phoenix Immobilizer N16",
      image: require("../../../assets/images/staticImages/p2.png"),
      version: "1.0.5",
      drive: true,
    },
  ];
  const notifications = [
    {
      title: "Low Inventory Alert ",
      desc: "Warning! Inventory for Secure Guard 200 is below the threshold. Restock immediately to avoid delays",
      status: "Unread",
      time: "2 min ago",
    },
    {
      title: "Order Shipped",
      desc: "Your order for 100 units of SmartLock Pro has been shipped and is expected to arrive by 2024-10-15.",
      status: "Unread",
      time: "2 min ago",
    },
  ];

  const renderRecentOrders = (item, index) => {
    return (
      <div className={styles.productCont}>
        <img src={item?.image} alt="" className={styles.prodImg} />
        <div className={styles.descCont}>
          <TextComponent text={item?.name} className={styles.prodName} />
          <TextComponent text={"Item " + item?.items} />
        </div>
      </div>
    );
  };

  const renderInventory = (item, index) => {
    return (
      <div
        className={styles.productCont}
        style={{ justifyContent: "space-between" }}
      >
        <div className={styles.productRightCont}>
          <img src={item?.image} alt="" className={styles.prodImg} />
          <div className={styles.descCont}>
            <TextComponent text={item?.name} className={styles.prodName} />
            <TextComponent text={"Firmware Version: "}>
              <TextComponent text={item?.version} className={styles.version} />
            </TextComponent>
          </div>
        </div>
        <div>
          <TextComponent text={"Drive "} />
          <Switch
            value={item.drive}
            style={item.drive ? { backgroundColor: "var(--green-color)" } : {}}
            onChange={() => {}}
            disabled
          />
        </div>
      </div>
    );
  };

  const renderNotification = (item, index) => {
    return (
      <div
        className={styles.productCont}
        style={{ justifyContent: "space-between" }}
      >
        <div className={styles.productRightCont}>
          <div className={styles.descCont}>
            <TextComponent text={item?.title} className={styles.prodName} />
            <TextComponent text={item.desc} />
          </div>
        </div>
        <div className={styles.notLeftCont}>
          <TextComponent text={item?.status} className={styles.status} />
          <TextComponent text={item?.time} />
        </div>
      </div>
    );
  };
  return (
    <div className={styles.mainCont}>
      <div className={styles.leftCol}>
        <Card className={styles.stockDetail}>
          <div className={styles.saleCont}>
            <TextComponent text="Total sold" className={styles.name} />
            <TextComponent text="130" className={styles.val} />
          </div>
          <div className={styles.saleCont}>
            <TextComponent text="Available in stocks" className={styles.name} />
            <TextComponent text="24" className={styles.val} />
          </div>
          <div className={styles.saleCont}>
            <TextComponent text="Active" className={styles.name} />
            <TextComponent text="124" className={styles.val} />
          </div>
        </Card>
        <Card>
          <div className={styles.orderMainCont}>
            <TextComponent text="Recent order" className={styles.headerHead} />
            <TextComponent
              text="See All"
              className={styles.seeAll}
              onClick={() => navigate("/products")}
            />
          </div>
          <List dataSource={recentOrders} renderItem={renderRecentOrders} />
        </Card>
        <Card>
          <div className={styles.orderMainCont}>
            <TextComponent text="Inventory" className={styles.headerHead} />
            <TextComponent text="See All" className={styles.seeAll} />
          </div>
          <List dataSource={Inventory} renderItem={renderInventory} />
        </Card>
      </div>
      <div className={styles.rightCol}>
        <Card>
          <div className={styles.orderMainCont}>
            <TextComponent text="Alerts" className={styles.headerHead} />
            {/* <TextComponent text="See All" className={styles.seeAll} /> */}
          </div>
          <List dataSource={notifications} renderItem={renderNotification} />
        </Card>
        <Card>
          <div className={styles.orderMainCont}>
            <TextComponent
              text="Sales overview"
              className={styles.headerHead}
            />
            {/* <TextComponent text="See All" className={styles.seeAll} /> */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ServiceSeekerDashboard;
