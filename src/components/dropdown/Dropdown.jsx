import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { LiaAngleDownSolid } from "react-icons/lia";
import TextComponent from "../textComponent/TextComponent";
import styles from "./Dropdown.module.css";

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(props.value);

  useEffect(() => {
    setSelectedValue(props.value);
  }, [props.value])
  

  const handleChange = (value) => {
    setSelectedValue(value);
    // Find the selected option object
    const selectedOption = props?.options.find(
      (option) => option.value === value
    );
    if (props?.onChange) {
      props?.onChange(selectedOption); // Pass the whole object back to the parent
    }
  };
  return (
    <div className={`${styles.main_input} ${props?.className}`}>
      {
        props?.label &&
      
      <text className={` ${styles.label} ${props?.labelClass} `}>
        <TextComponent>{props?.label}</TextComponent>
      </text>}
      <div
        className={styles.input}
        style={props.inputStyle}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Select
          value={selectedValue}
          placeholder={props?.placeholder ? props?.placeholder : null}
          open={isOpen}
          suffixIcon={null}
          style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--mobile-heading)' }}
          dropdownStyle={{
            fontFamily: 'var(--font-family)'  ,
            // backgroundColor: "var(--secondary-color)",
          }}
          className={`${styles.inner_input} ${props?.inputClass}`}
          // defaultValue={"Select role"}
          onChange={handleChange} // Use the new handleChange function
          options={props?.options?.map((option) => ({
            // label: option.value,
            label: (
              <div className={styles.dropdown_row}>
              <TextComponent
              className={styles.dropdown_text}
                style={{
                  color:
                    selectedValue == option?.value
                      ? "var(--black-color)"
                      : "var(--grey-color)",
                }}
                text={option?.value}
              />
              <TextComponent
              style={{
                color
                    : "var(--grey-color)", fontSize: '9px'
              }}
              text={option?.span}
            />
            </div>
            ), // Label to display in dropdown
            value: option.value, // Value for the onChange trigger

          }))}
        />

        <div
          className={isOpen ? styles.rightIconUp : styles.rightIconDown}
          onClick={props?.onRightIconPress}
        >
          {/* {isOpen ? <IoMdArrowDropup  /> :  */}
          <LiaAngleDownSolid />
          {/* } */}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
