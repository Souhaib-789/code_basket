import React, { useEffect, useState } from "react";
import styles from "./switch.module.css"; // Import the CSS Module for styling

const Switch = ({
  label,
  onChange,
  disabled = false,
  size = "medium",
  isChecked,
  activeColor,
  inactiveColor,
}) => {
  const [checked, setChecked] = useState(isChecked);
  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  // Handle toggle, only if not disabled
  const handleToggle = () => {
    if (disabled) return;

    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked); // Call the onChange prop if it's passed
    }
  };

  // Define size classes
  const sizeClass =
    size === "small"
      ? styles.switchSmall
      : size === "large"
      ? styles.switchLarge
      : styles.switchMedium;

  return (
    <div className={styles.switchContainer}>
      {label && <span className={styles.switchLabel}>{label}</span>}
      <div
        style={{ backgroundColor: checked ? activeColor : inactiveColor }}
        className={`${styles.switch} ${
          checked ? styles.switchOn : styles.switchOff
        } ${sizeClass}`}
        onClick={handleToggle}
      >
        <div
          className={`${styles.switchKnob} ${
            checked ? styles.knobOn : styles.knobOff
          }`}
        />
      </div>
    </div>
  );
};

export default Switch;
