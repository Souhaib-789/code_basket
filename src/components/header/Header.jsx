import React from "react";
import { useNavigate } from "react-router";
import Person from "../../assets/images/dummy.png";
import styles from "./Header.module.css";
import TextComponent from "../textComponent/TextComponent";
import { useSelector } from "react-redux";

const CompHeader = ({
  onBackClick,
  title,
  collapsed,
  isProfile,
  mainHeader,
}) => {

  const navigate = useNavigate();
  const user = useSelector((state) => state.AuthReducer.user);
  

  return (
    <div className={`${styles.mainHeaderDiv} ${mainHeader}`}>
      <TextComponent className={styles.title} text={title} />

      <div className={styles.headingDiv}>
          <TextComponent className={styles.heading} text={user?.email || ' '} />
          <img src={user?.image ? user?.image : Person} className={styles.avatar} onClick={()=>{
            navigate('/profile')
          }} />
      </div>
      {/* <div style={{ cursor: "pointer" }} onClick={()=>navigation("/notifications")}>
        <Badge count={1} color="var(--yellow-color)">
          <img
            src={require("../../assets/images/notificationBell.png")}
            className={styles.notificationIcon}
          />
        </Badge>
      </div> */}
    </div>
  );
};

export default CompHeader;
