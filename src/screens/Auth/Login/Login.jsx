import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Login.module.css";
import logo from "../../../assets/images/gif.gif";
import wordLogo from "../../../assets/images/wordLogo.png";
import { InputField, SubmitButton, TextComponent } from "../../../components";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { AuthMiddleware } from "../../../Store/Middlewares/AuthMiddleware";
import { showAlert } from "../../../Store/Actions/GeneralActions";

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onClickLogin = () => {
    if (!email) {
      dispatch(showAlert({ message: 'Please enter email', type: 'Warning' }))
      return;
    }
    if (!password) {
      dispatch(showAlert({ message: 'Please enter password', type: 'Warning' }))
      return;
    }

    const data = {
      email: email,
      password: password
    }
    dispatch(AuthMiddleware.login(data))
    .then((res) => {
    })
    .catch((err) => {
      console.log(err)
    })

  }

  const loginWithGoogle = () => {
    // dispatch(AuthMiddleware.loginWithGoogle())
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }


  return (
    <div className={styles.mainCont}>
      <div className={styles.leftCont}>
        <img src={logo} className={styles.logoImg} />
      </div>
      <div className={styles.rightCont}>
        <div className={styles.subRightCont}>
          <div className={styles.rightWidthCont}>
            <div className={styles.textDiv}>
             <img src={wordLogo} className={styles.short_logo} />
              <TextComponent
                className={styles.welcomeText}
                text={"Login to enjoy the code world experience."}
              />
            </div>

            {/* <div className={styles.google_btn} onClick={loginWithGoogle}>
              <img src={require('../../../assets/images/google.png')} className={styles.google_logo} />
              <TextComponent text={"Continue with Google"} className={styles.google_btn_text} />
            </div>

            <div className={styles.orDiv}>
              <div className={styles.line}></div>
              <TextComponent text={"OR"} className={styles.orText} />
              <div className={styles.line}></div>
            </div> */}

            <div className={styles.inputDiv}>
              <InputField
                className={styles.input}
                label={"Email"}
                placeholder={"Enter email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                className={styles.input}
                label={"Password"}
                placeholder={"Enter password"}
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

            </div>
            <div className={styles.btn}>
              <SubmitButton title={"Login"} onClick={onClickLogin} />
            </div>
            {/* <div className={styles.forgotText}>
              <TextComponent
                onClick={() => navigate("/forgotPassword")}
                style={{ cursor: "pointer" }}
                text={"Forgot Password"}
              />
            </div> */}
            <div className={styles.signUDiv}>
              <TextComponent text={"Don’t have an account?"} />
              <TextComponent
                style={{
                  marginLeft: "5px",
                  cursor: "pointer",
                  color: "var(--secondary-color)",
                  fontWeight: "bold",
                }}
                onClick={() => navigate("/signup")}
                text={"Signup"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
