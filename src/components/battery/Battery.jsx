import React from "react";
import styles from "./Battery.module.css";
import TextComponent from "../textComponent/TextComponent";
import { IoBatteryDeadOutline } from "react-icons/io5";
import batteryicon from '../../assets/images/Battery.png';
import capIcon from '../../assets/images/Cap.png';

const BatteryStatus = ({ percentage, className, style }) => {
  // Determine battery color based on percentage
  const getBatteryColor = () => {
    if (percentage > 50) {
      return "#4caf50"; // Green
    } else if (percentage > 20) {
      return "#ffc107"; // Yellow
    }
    return "#f44336"; // Red
  };

  return (
    <div className={`${styles.batteryContainer} ${className}`} style={style}>
      {/* Display the battery percentage */}
      <TextComponent text={`${percentage }%`} className={styles.batterytext} />
      <div className={styles.batteryIcondiv}>
        <img src={batteryicon} className={styles.batteryIcon} />
        <img src={capIcon} className={styles.capIcon} />

        <div className={styles.upperBattery}>
        <div style={{width:
           `${percentage}%`, backgroundColor: getBatteryColor()}} className={styles.emptyDiv}>
                  
        </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryStatus;
