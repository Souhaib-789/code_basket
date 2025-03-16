import React from "react";
import styles from "./SearchInput.module.css";
import { CiSearch } from "react-icons/ci";
import TextComponent from "../textComponent/TextComponent";
const SearchInput = (props) => {
  return (
    <div className={styles.input}>
      <div style={{display:'flex', flexDirection: "row", alignItems: "center", width: "100%"}}>
        <CiSearch className={styles.searchIcon} />
        <input
          placeholder={"Search"}
          className={`${styles.inner_input} ${props?.inputClass}`}
          disabled={props?.disabled}
          // value={props?.value}
          onChange={props?.onChange}
          type={props?.type}
          value={props?.value}
          defaultValue={props?.defaultValue}
        />
      </div>
      {props?.rightIcon ? (
        <div className={styles.rightIcon} onClick={props?.onRightIconPress}>
          {props?.rightIcon}
        </div>
      ) : null}
    </div>
  );
};

export default SearchInput;
