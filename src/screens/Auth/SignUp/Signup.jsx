import React, { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/gif.gif";
import { InputField, SubmitButton, TextComponent } from "../../../components";
import styles from "./Signup.module.css";
import { showAlert } from "../../../Store/Actions/GeneralActions";
import { validateEmail } from "../../../utilities/validators";
import { AuthMiddleware } from "../../../Store/Middlewares/AuthMiddleware";

const Signup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setbio] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);


  const onClickSignup = () => {
    if (!Name) {
      dispatch(showAlert({ message: "Please enter your name", type: 'Warning' }))
    } else if (!email) {
      dispatch(showAlert({ message: "Please enter your email", type: 'Warning' }))
    }
    else if (validateEmail(email) === false) {
      dispatch(showAlert({ message: "Please enter a valid email", type: 'Warning' }))
    }
    else if (!bio) {
      dispatch(showAlert({ message: "Please enter your bio", type: 'Warning' }))
    }
    else if (!password) {
      dispatch(showAlert({ message: "Please enter your password" , type: 'Warning'}))
    }
    else if (!confirmPass) {
      dispatch(showAlert({ message: "Please confirm your password" , type: 'Warning'}))
    }
    else if (password != confirmPass) {
      dispatch(showAlert({ message: "Password and confirm password does not match", type: 'Warning' }))
    }
    else {
      dispatch(AuthMiddleware.signUp({ email, password, Name, bio }))
        .then(() => navigate('/'))
        .catch((error) => console.log(error))
    }
  }

  return (
    <div className={styles.mainCont}>
      <div className={styles.leftCont}>
        <img src={logo} className={styles.logoImg} />
      </div>
      <div className={styles.rightCont}>
        <div className={styles.subRightCont}>
          <div className={styles.backDiv} onClick={() => navigate("/")}>
            <IoChevronBackOutline />
            <TextComponent text={"Back"} />
          </div>
          <div className={styles.textDiv}>
            <TextComponent className={styles.welcomeHeading} text={"Create your account"} />

          </div>
          <div className={styles.input}>
            <InputField
              className={styles.input}
              label={"Full Name"}
              placeholder={"Enter name"}
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />

            <InputField
              className={styles.input}
              label={"Email"}
              placeholder={"Enter email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
              className={styles.input}
              label={"Bio"}
              placeholder={"Enter bio"}
              value={bio}
              onChange={(e) => setbio(e.target.value)}
            />
            <div className={styles.twoInputsDivs}>
              <InputField
                className={styles.twoInputs}
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
                className={styles.twoInputs}
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
          </div>
          {/* <div className={styles.logoutCheck}>
            {signupCheck ? (
              <IoCheckbox
                color="var(--secondary-color)"
                style={{ cursor: "pointer" }}
                onClick={() => setSignupCheck(!signupCheck)}
              />
            ) : (
              <IoSquareOutline
                style={{ cursor: "pointer" }}
                onClick={() => setSignupCheck(!signupCheck)}
              />
            )}
            <TextComponent
              style={{ marginLeft: "5px" }}
              text={"By signing up, I agree to the "}
            >
              <text className={styles.link}>Terms and Conditions</text>
              <text> & </text>
              <text className={styles.link}>Privacy Policy.</text>
            </TextComponent>
          </div> */}

          <div className={styles.btn}>
            <SubmitButton title={"Sign up"} onClick={onClickSignup} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
