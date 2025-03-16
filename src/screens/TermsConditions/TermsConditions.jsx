import React from "react";
import styles from "./TermsConditions.module.css";
import { TextComponent } from "../../components";
const TermsConditions = () => {
  const dummyItem = [
    {
      id: 1,
      title: "User Agreement",
      text: "To access specific features of our services, you might need to set up an account. It's your duty to keep your account details secure and accurate. If you notice any unauthorized activity on your account, please notify us right away. We hold the right to suspend or terminate accounts that breach these Terms or engage in questionable behavior.",
    },
    {
      id: 2,
      title: "Conditions",
      text: "As a user, you have the responsibility to provide accurate and up-to-date information when using our services. This includes ensuring that your personal details, such as your name, email address, and phone number, are correct and valid. Additionally, it is important to understand and acknowledge our use of cookies and tracking technologies to improve your overall experience.",
    },
    {
      id: 3,
      title: "Agreement",
      text: "You are prohibited from sharing your account credentials with others. Please ensure that your login details and password are kept confidential and not disclosed to anyone else. This helps maintain the security of your account and protects your personal information from unauthorized access.",
    },
    {
      id: 4,
      title: "Privacy Policy",
      text: "Protecting your personal information is a top priority for us. We are committed to safeguarding your data and ensuring that it is used appropriately. By using our services, you agree to our privacy policy and the collection of certain information to enhance your user experience.",
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

export default TermsConditions;
