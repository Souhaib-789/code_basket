import React from "react";
import PhonesInput from 'react-phone-number-input/input'
import styles from './phoneInput.module.css';
const PhoneInput = (props) => {
const onChangeText = (e) =>{
  setTimeout(()=>{
      props?.onChange(e)
  }, 10)
}
  return (
    <div className={`${styles.phoneLabel} ${props?.className}`} style={props?.style}>
      <label
      className={styles.label}
    //    style={{ color: "#838383", fontSize: 18, fontWeight: 600 }}
       >
        {props?.label}
      </label>
      <div className={styles.phoneInput}>
        <PhonesInput
          style={{
            outline: "none",
            border: 0,
            width: "100%",
          }}
          placeholder={props?.placeholder}
          className={styles.PhoneNumber}
          defaultCountry="US"
          value={props?.value}
          maxLength={16}
          onChange={(e)=>onChangeText(e)}
        />
      </div>
    </div>
  );
};

export default PhoneInput;
