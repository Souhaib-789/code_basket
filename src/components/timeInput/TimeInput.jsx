import React, { useState } from "react";
import styles from "./TimeInput.module.css";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { DatePicker, TimePicker } from "antd";
import TextComponent from "../textComponent/TextComponent";
import { GrFormClose } from "react-icons/gr";

const TimeInput = (props) => {

  return (
    <div className={`${styles.main_input} ${props?.className}`}>
      <text className={` ${styles.label} ${props?.labelClass} `}>
        <TextComponent>{props?.label}</TextComponent>
      </text>
        <TimePicker
        style={{border: "1px solid var(--border-color)", boxShadow: "none"}}
          placeholder={props?.placeholder ? props?.placeholder : "Select Time"}
          value={props?.value}
          defaultValue={props?.defaultValue}
          use12Hours
          format="hh:mm a"
          onChange={props?.onChange}
          suffixIcon={props?.icon}
          
          className={`${styles.inner_input} ${props?.inputClass}`}
          inputReadOnly
          clearIcon={
            <div className={styles.clearIconBtn}>
              <GrFormClose
                className={styles.clearIcon}
                style={{ color: "var(--secondary-color)" }}
              />
            </div>
          }
        />

    </div>
  );
};

export default TimeInput;
