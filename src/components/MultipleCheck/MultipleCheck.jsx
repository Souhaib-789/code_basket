import React, { useEffect, useState } from "react";
import styles from "./multipleCheck.module.css";
// import { pickersLayoutClasses } from '@mui/x-date-pickers-pro/PickersLayout';
import { Popover } from "antd";
import {
  FaCaretDown,
  FaCaretUp
} from "react-icons/fa";
import SubmitButton from "../submitButton/SubmitButton";
import TextComponent from "../textComponent/TextComponent";

const MultipleCheck = ({ data = [] }) => {
  const [value, setValue] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, []);

  const content = (
    <div style={{ backgroundColor: "white !important", padding: "10px",borderRadius:15 }}>
      {data.map((item) => {
        return (
          <div
            key={item.id}
            style={{
              display: "flex",
              // justifyContent: "space-between",
              padding: "10px 0px",
              gap: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              if (value?.find((val) => item.name == val.name)) {
                setValue(value.filter((val) => val.name !== item.name));
              } else {
                setValue([...value, item]);
              }
            }}
          >
            <input
              type="checkbox"
              checked={value?.find((val) => item.name == val.name) ? true : false}
            />
            <TextComponent text={item.name} />
          </div>
        );
      })}
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
            text={`${value?.[0] ? value?.[0]?.name : "Select"}`}
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

export default MultipleCheck;
