import { Button } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./ForgotPassword.module.css";
import logo from "../../../assets/images/logo.png";
import { InputField, SubmitButton, TextComponent } from "../../../components";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
function ForgetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  return (
    <div className={styles.mainCont}>
      <div className={styles.leftCont}>
        <img src={logo} className={styles.logoImg} />
      </div>
      <div className={styles.rightCont}>
        <div className={styles.subRightCont}>
        <div className={styles.backDiv} onClick={()=>navigate("/")}>
          <IoChevronBackOutline />
          <TextComponent text={"Back to login"} />
        </div>
        <div className={styles.textDiv}>
          <TextComponent
            className={styles.welcomeHeading}
            text={"Forgot Password?"}
          />
          <TextComponent
            className={styles.welcomeText}
            text={"Please enter your email address to get verification code."}
          />
        </div>
        <div className={styles.inputDiv}>
          <InputField
            className={styles.input}
            label={"Email Address"}
            placeholder={"chris@email.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.btn} onClick={()=>navigate("/verifyCode")}>
          <SubmitButton title={"Get Code"} />
        </div>
      </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
