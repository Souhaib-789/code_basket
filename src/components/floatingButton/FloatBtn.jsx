import React, { useState } from "react";
import { Button } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import styles from "./FloatingButton.module.css"; // Import the styles as a module
import { FiPlusCircle } from "react-icons/fi";
import TextComponent from "../textComponent/TextComponent";

const FloatingButton = ({ Buttons }) => {
  const [isVisible, setIsVisible] = useState(false); // Track visibility of extra buttons

  // Toggle visibility of additional buttons
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      {/* Main floating action button */}
      {/* <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        size="large"
        className={styles.floatingBtn} // Use styles from CSS module
        onClick={toggleVisibility}
      /> */}
      <div className={styles.floatingBtn} onClick={toggleVisibility}>
        {!isVisible ? (
          <FiPlusCircle size={18} style={{ marginRight: "5px" }} />
        ) : (
          <></>
        )}
        <TextComponent text={!isVisible ? "Add new Asset" : "Close"} />
      </div>

      {/* Additional buttons */}
      {isVisible && (
        <div className={styles.floatingButtonsContainer}>
          {Buttons?.map?.((item) => (
            <div
              className={styles.floatingBtnExtra}
              onClick={() => {
                item?.onClick?.();
                setIsVisible(false);
              }}
            >
              {/* <FiPlusCircle size={18} style={{ marginRight: "5px" }} /> */}
              <TextComponent text={item.title} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
