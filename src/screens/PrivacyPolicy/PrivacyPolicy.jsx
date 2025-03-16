import React from "react";
import styles from "./PrivacyPolicy.module.css";
import { TextComponent } from "../../components";
const PrivacyPolicy = () => {
  const dummyItem = [
    {
      id: 1,
      title: "Rights",
      text: "We may collect certain types of information to provide and improve our services. This includes personal details such as your name, email address, and phone number, as well as usage data that helps us understand how you interact with our website or app. Additionally, we may use cookies and similar tracking technologies to enhance your experience and analyze website traffic.",
    },
    {
      id: 2,
      title: "Responsibilities",
      text: "As a user, you have the responsibility to provide accurate and up-to-date information when using our services. This includes ensuring that your personal details, such as your name, email address, and phone number, are correct and valid. Additionally, it is important to understand and acknowledge our use of cookies and tracking technologies to improve your overall experience.",
    },
    {
      id: 3,
      title: "Prohibitions",
      text: "You are prohibited from sharing your account credentials with others. Please ensure that your login details and password are kept confidential and not disclosed to anyone else. This helps maintain the security of your account and protects your personal information from unauthorized access.",
    },
    {
      id: 4,
      title: "Limitations",
      text: "There are certain limitations to our services that you should be aware of. These limitations may include restrictions on the amount of data you can store, the number of users who can access the service, or the duration of access granted. It is important to understand these limitations to make the most out of our services.",
    },
  ];
  return (
    <div className={styles.mainCont}>
      {dummyItem?.map((item, index) => (
        <div className={styles.listItem}>
          <TextComponent text={item?.title} style={{color: "var(--secondary-color)", fontFamily: "Urbanist-bold", marginBottom: "10px", fontSize: "20px"}} />
          <TextComponent text={item?.text} style={{ fontSize: "16px"}}/>
        </div>
      ))}
    </div>
  );
};

export default PrivacyPolicy;
