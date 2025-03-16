import React from "react";
import styles from "./steps.module.css";
import { GoCheckCircleFill, GoCircle } from "react-icons/go";
import { LuCircleDot } from "react-icons/lu";

const Steps = ({ steps, currentStep }) => {
  return (
    <div className={styles.stepContainer}>
      {steps.map((step, index) => (
        <div key={index} className={styles.step}>
          {index + 1 < currentStep ? (
            <GoCheckCircleFill color="var(--secondary-color)" size={35} />
          ) : index + 1 == currentStep ? (
            <LuCircleDot size={35} color="var(--secondary-color)" />
          ) : (
            <GoCircle size={35} color="var(--border2-color)" />
          )}
          {index < steps.length - 1 && (
            <div
              className={
                index + 1 < currentStep
                  ? styles.stepLineActive
                  : styles.stepLine
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Steps;
