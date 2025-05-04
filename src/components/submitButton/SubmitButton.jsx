import React, { useState } from "react";
import styles from "./SubmitButton.module.css";
import TextComponent from "../textComponent/TextComponent";

//   inputIcon:InputIcon,
const SubmitButton = (props) => {
  const [touched, setTouched] = useState(false);
  const btnTouched = () => {
    setTouched(!touched);
  };
  const btnRelease = () => {
    setTouched(false);
  };
  return (
    <button
      onMouseDown={btnTouched}
      onMouseUp={btnRelease}
      disabled={props?.disabled}
      className={`${
        touched && props?.secondaryBtn
          ? styles.secontouchbtn
          : touched && !props?.secondaryBtn
          ? styles.touchbtn
          : props.secondaryBtn
          ? styles.secondaryBtn         
          : styles.btn
      } ${props?.btnClass}`}
      onClick={props?.onClick}
      style={props?.style}
    >
      {props.leftIcon && <div style={{display: "flex", alignItems:"center", marginRight: "10px"}}>{props.leftIcon}</div>}
      <TextComponent
        className={`${props?.textClass} ${
          props.secondaryBtn ? styles.seconbtnText : styles.btnText
        }`}
        style={props?.textStyle}
      >
        {props?.title}
      </TextComponent>
      {props.rightIcon}
    </button>
  );
};

export default SubmitButton;
