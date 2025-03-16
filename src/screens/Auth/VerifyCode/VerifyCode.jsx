import { Button } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./VerifyCode.module.css";
import logo from "../../../assets/images/logo.png";
import {
  InputField,
  Modal,
  SubmitButton,
  TextComponent,
} from "../../../components";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { IoChevronBackOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
// import OTPInput from "react-otp-input";
import { PiSealCheck } from "react-icons/pi";

function VerifyCode() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isSuccessfulModal, setIsSuccessFulModal] = useState(false);

  const onPressVerify = () => {
    setIsSuccessFulModal(false);
    // if (location?.state?.role == roles.user) {
    //   localStorage.setItem("@user", { role: location?.state?.role });
    //   localStorage.setItem("@token", "contractor");
    //   Storage.setERole("@role", location?.state?.role);
    //   dispatch(isLogin(true));
    //   dispatch(getUser({ role: location?.state?.role }));
    //   setTimeout(() => {
    //     navigate("/moduleRegistration", { state: "userModule" });
    //   }, 0);
    // } else {
    //   navigate("/accountSetup");
    // }
  };
  return (
    <div className={styles.mainCont}>
      <div className={styles.leftCont}>
        <img src={logo} className={styles.logoImg} />
      </div>
      <div className={styles.rightCont}>
        <div className={styles.subRightCont}>
          <div className={styles.backDiv} onClick={() => navigate("/")}>
            <IoChevronBackOutline />
            <TextComponent text={"Back to login"} />
          </div>
          <div className={styles.textDiv}>
            <TextComponent
              className={styles.welcomeHeading}
              text={"Verify Code"}
            />
            <TextComponent
              className={styles.welcomeText}
              text={"Please enter your verification code from email address"}
            />
          </div>
          <div
            className={styles.enterCodeDiv}
            //   style={{textDecorationColor}}
          >
            <TextComponent
              style={{ fontSize: "var(--mobile-heading)", fontWeight: "600" }}
              text={"Enter Code"}
            />
            <div className={styles.resendCodeDiv}>
              <TextComponent text={"Didn't get code?"} />
              <TextComponent
                style={{
                  marginLeft: "5px",
                  textDecoration: "undeline",
                  color: "var(--secondary-color)",
                  textDecorationLine: "underline",
                  textDecorationColor: "var(--secondary-color)",
                }}
                text={"Resend"}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <OTPInput
              containerStyle={styles.otpInputDiv}
              inputStyle={{
                width: "100%",
                height: "50px",
                border: "1px solid var(--secondary-color)",
                borderRadius: "8px",
                fontSize: "25px",
                color: "var(--secondary-color)",
              }}
              // inputStyle={styles.otpInput}
              value={otp}
              onChange={setOtp}
              numInputs={5}
              renderSeparator={<span>&emsp;</span>}
              renderInput={(props) => <input type="number" {...props} />}
            /> */}
          </div>
          <div className={styles.btn}>
            <SubmitButton
              title={"Verify"}
              onClick={() => {
                location?.state?.screen == "signup"
                  ? setIsSuccessFulModal(true)
                  : navigate("/createPassword");
              }}
            />
          </div>
        </div>
      </div>
      <Modal
        open={isSuccessfulModal}
        onCancel={() => setIsSuccessFulModal(false)}
        icon={
          <PiSealCheck
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        }
        title={"Email Verified successfully"}
        headingClass={styles.modalHeading}
        width={"400px"}
        buttonTitle={"Setup  your account"}
        onBtnPress={onPressVerify}
      ></Modal>
    </div>
  );
}

export default VerifyCode;
