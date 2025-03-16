
import React, { useEffect, useState } from "react";
import "./override.css"; // Use CSS module for styling
import styles from "./rangePicker.module.css";
// import { pickersLayoutClasses } from '@mui/x-date-pickers-pro/PickersLayout';
import { Button, Popover } from "antd";
import dayjs from "dayjs";
import {
  FaCaretDown,
  FaCaretLeft,
  FaCaretRight,
  FaCaretUp,
} from "react-icons/fa";
import TextComponent from "../textComponent/TextComponent";
import SubmitButton from "../submitButton/SubmitButton";

const RangePicker = () => {
  const [value, setValue] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, []);

  const content = (
    <div style={{ backgroundColor: "white", padding: "10px", width: "340px" }}>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0px",
        }}
      >
        <SubmitButton
          title="Clear"
          secondaryBtn
          btnClass={styles.clearBtn}
          onClick={() => {
            setOpen(false);
          }}
        />
        <SubmitButton
          title="Apply"
          btnClass={styles.applyBtn}
          onClick={() => {
            setOpen(false);
          }}
        />
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <Popover
        open={open}
        placement="bottom"
        style={{ padding: "0px" }}
        content={content}
        trigger="click"
      >
        <div onClick={() => setOpen(!open)} className={styles.rangePicker}>
          <TextComponent
          className={styles.rangePickerText}
            text={`${
              value?.[0]
                ? value?.[0].format("MMM DD, YYYY")
                : "Select Start Date"
            } - ${
              value?.[1] ? value?.[1].format("MMM DD, YYYY") : "Select End Date"
            }`}
          />
          {open ? (
            <FaCaretDown size={25} color="var(--secondary-color)" />
          ) : (
            <FaCaretUp size={25} color="var(--secondary-color)" />
          )}
        </div>
      </Popover>
    </div>
  );
};

export default RangePicker;
