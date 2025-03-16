import React from "react";
import styles from "./Notifications.module.css";
import { TextComponent } from "../../components";
import { List } from "antd";
const Notifications = () => {
  const dummyNotifications = [
    {
      id: 1,
      message:
        "Security system triggered due to an unauthorized vehicle access attempt.",
        isRead: false,
        time: "6m"
    },
    {
      id: 2,
      message:
        "An unauthorized attempt to access your vehicle was detected. Immobilizer activated.",
        isRead: true,
        time: "10m"

    },
    {
      id: 3,
      message: "Please check your vehicle's security settings for any alerts or issues.",
      isRead: false,
      time: "26m"

    },
    {
      id: 4,
      message:
        "Security system triggered due to an unauthorized vehicle access attempt.",
        isRead: false,
        time: "6m"
    },
    {
      id: 5,
      message:
        "An unauthorized attempt to access your vehicle was detected. Immobilizer activated.",
        isRead: true,
        time: "10m"

    },
    {
      id: 6,
      message: "Please check your vehicle's security settings for any alerts or issues.",
      isRead: false,
      time: "26m"

    },
  ];
  return (
    <div className={styles.mainCont}>
      <TextComponent
        text={"Alerts"}
        style={{
          fontFamily: "Urbanist-bold",
          fontSize: "var(--heading1-font-size)",
        }}
      />
      <List
        dataSource={dummyNotifications}
        style={{margin: "20px 0"}}
        renderItem={(item, index) => {
          return( 
          <div className={styles.listItem}>
            <TextComponent className={item?.isRead ? styles.notiDot : styles.nonActivenotiDot} text={"●"}/>
            <div className={styles.messageBox}>
            <TextComponent style={{fontFamily: "Urbanist-regular"}} className={styles.notiMess} text={item?.message} />
            <TextComponent style={{fontFamily: "Urbanist-regular"}} className={styles.notiTime} text={`${item?.time} ago`} />
          </div>
          </div>
          )
        }}
      />
    </div>
  );
};

export default Notifications;
