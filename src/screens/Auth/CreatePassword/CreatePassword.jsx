
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./CreatePassword.module.css";
import logo from "../../../assets/images/logo.png";
import { InputField, Modal, SubmitButton, TextComponent } from "../../../components";
import { LuEye, LuEyeOff } from "react-icons/lu";
import {
  IoCheckbox,
  IoCheckboxOutline,
  IoChevronBackOutline,
  IoSquare,
  IoSquareOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { TbLockCheck } from "react-icons/tb";
const CreatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);
  const [isLogout, setIslogout] = useState(false);
  const [isSuccessfulModal, setIsSuccessFulModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsSuccessFulModal(true);
  };

  const handleOk = () => {
    setIsSuccessFulModal(false);
  };

  const handleCancel = () => {
    setIsSuccessFulModal(false);
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
              text={"Create Password"}
            />
            <TextComponent
              className={styles.welcomeText}
              text={"Create a new strong password"}
            />
          </div>
          <div className={styles.inputDiv}>
            <InputField
              className={styles.input}
              label={"Password"}
              placeholder={"●●●●●●●●●●"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rightIcon={
                passwordVisible ? (
                  <LuEye size={20} color={"var(--input-icon)"} />
                ) : (
                  <LuEyeOff size={20} color={"var(--input-icon)"} />
                )
              }
              onRightIconPress={() => setPasswordVisible(!passwordVisible)}
              type={passwordVisible ? "text" : "password"}
            />
            <InputField
              className={styles.input}
              label={"Confirm Password"}
              placeholder={"●●●●●●●●●●"}
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              rightIcon={
                confirmPassVisible ? (
                  <LuEye size={20} color={"var(--input-icon)"} />
                ) : (
                  <LuEyeOff size={20} color={"var(--input-icon)"} />
                )
              }
              onRightIconPress={() =>
                setConfirmPassVisible(!confirmPassVisible)
              }
              type={confirmPassVisible ? "text" : "password"}
            />
          </div>
          <div
            className={styles.logoutCheck}
            onClick={() => setIslogout(!isLogout)}
          >
            {isLogout ? <IoCheckbox color="var(--secondary-color)"/> : <IoSquareOutline  />}
            <TextComponent
              style={{ marginLeft: "5px" }}
              text={"Logout from all devices"}
            />
          </div>
          <div className={styles.btn} onClick={showModal}>
            <SubmitButton title={"Create Passsword"} />
          </div>
        </div>
      </div>
    
     
      <Modal open={isSuccessfulModal}
      onCancel={()=>setIsSuccessFulModal(false)}
      icon={<TbLockCheck style={{width: "100%", height:"100%", objectFit: "contain"}}/>}
      title={"Password Changed Successfully!"}
      width={"400px"}
      buttonTitle={"Login to you Account"}
      onBtnPress={()=>setIsSuccessFulModal(false)}
       >
      </Modal>
    </div>
  );
};

export default CreatePassword;
