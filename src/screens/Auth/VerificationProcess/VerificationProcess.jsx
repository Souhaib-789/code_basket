import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import styles from "./VerificationProcess.module.css";
import clockImg from "../../../assets/images/clock.png";
import { TextComponent } from "../../../components";
const VerificationProcess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={styles.mainCont}>
      <div className={styles.leftCont}>
        <img src={logo} className={styles.logoImg} />
      </div>
      <div className={styles.rightCont}>
        <div className={styles.subRightCont}>
            <img src={clockImg} className={styles.clockImg}/>
            <TextComponent text={"Your profile is under verification process"} className={styles.heading}/>
            <TextComponent text={"to make our platform secure we verify every new user it can take upto 48 Hours"} className={styles.text}/>
        </div>
      </div>
    </div>
  );
};

export default VerificationProcess;
