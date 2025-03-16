import React from "react";
import styles from "./InputField.module.css";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { DatePicker } from "antd";
import TextComponent from "../textComponent/TextComponent";

const InputField = (props) => {
  return (
    <div
      className={`${styles.main_input} ${props?.className}`}
      style={props?.style}
    >
      <text className={` ${styles.label} ${props?.labelClass} `}>
        <TextComponent>{props?.label}</TextComponent>
      </text>
      <div className={styles.input} style={props.inputStyle}>
        {props?.textArea ? (
          <textarea
          
            placeholder={props?.placeholder}
            className={`${styles.inner_textArea} ${props?.inputClass}`}
            style={{height: props?.rows ? null : "32px" , marginTop: "10px" }}
            name={props?.name}
            disabled={props?.disabled}
            // value={props?.value}
            onChange={props?.onChange}
            type={props?.type}
            maxLength={props?.maxLength}
            value={props?.value}
            defaultValue={props?.defaultValue}
          rows={props?.rows}  
          ></textarea>
        ) : (
          <input
            placeholder={props?.placeholder}
            className={`${styles.inner_input} ${props?.inputClass}`}
            name={props?.name}
            disabled={props?.disabled}
            // value={props?.value}
            onChange={props?.onChange}
            type={props?.type}
            maxLength={props?.maxLength}
            value={props?.value}
            defaultValue={props?.defaultValue}
            
          />
        )}

        {props?.rightIcon ? (
          <div className={styles.rightIcon} onClick={props?.onRightIconPress}>
            {props?.rightIcon}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default InputField;
