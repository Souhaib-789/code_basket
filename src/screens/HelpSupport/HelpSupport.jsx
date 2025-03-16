import React, { useEffect, useRef, useState } from "react";
import styles from "./HelpSupport.module.css";
import {
  InputField,
  PhoneInput,
  SubmitButton,
  TextComponent,
} from "../../components";
import logo from "../../assets/images/staticImages/logo.png";
import { Button, Drawer, List, Space } from "antd";
import { IoCloseCircleSharp, IoSend } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import userImage from "../../assets/images/staticImages/pf.png";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { BsChatLeftDotsFill } from "react-icons/bs";
const HelpSupport = () => {
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [message, setMessage] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);

  const [height, setHeight] = useState(0);
  const { width } = useWindowDimensions();
  //   const contentRef = useRef(null);

  //   useEffect(() => {
  //     if (openDrawer) {
  //       // Set the height to the scrollHeight of the content
  //       setHeight(contentRef.current.scrollHeight);
  //     } else {
  //       // Collapse the height back to 0
  //       setHeight(0);
  //     }
  //   }, [openDrawer]);
  const dummyChats = [
    {
      id: 1,
      user_id: 2,
      message:
        "User: Hi there! I need help with my account. Can you assist me?",
      image: userImage,
    },
    {
      id: 2,
      user_id: 1,
      message: "Of course! What seems to be the issue?",
    },
    {
      id: 3,
      user_id: 2,
      message:
        "I'm having trouble logging in. It keeps saying my password is incorrect.",
      image: userImage,
    },
    {
      id: 4,
      user_id: 1,
      message: "Of course! Let's try resetting your password.",
    },
    {
      id: 5,
      user_id: 2,
      message: "Thank you! I really appreciate your help.",
      image: userImage,
    },
   
    
  ];
  const renderChats = (item, index) => {
    return (
      <>
        {item?.user_id == 1 ? (
          <div className={styles.listItem1} key={index}>
            <img src={logo} />
            <TextComponent
              text={item?.message}
              className={styles.listMessage1}
            />
          </div>
        ) : (
          <div className={styles.listItem2} key={index}>
            <TextComponent
              text={item?.message}
              className={styles.listMessage2}
            />
            <img src={item?.image} />
          </div>
        )}
      </>
    );
  };
  return (
    <div className={styles.mainCont}>
      <div className={styles.contactUs}>
        <TextComponent
          text={"Contact us"}
          style={{
            fontFamily: "Urbanist-bold",
            fontSize: "var(--heading2-font-size)",
          }}
        />
        <TextComponent
          style={{
            fontFamily: "Urbanist-semibold",
            color: "var(--light-grey)",
            marginTop: "10px",
          }}
          text={"Send us your queries"}
        />
        <InputField
          label={"Email"}
          style={{ marginTop: "30px" }}
          placeholder={"Enter your contact email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PhoneInput
          label={"Contact number"}
          placeholder={"Enter your contact number"}
          value={contactNo}
          onChange={setContactNo}
        />
        <InputField
          label={"Your Message"}
          placeholder={"Write your message"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          textArea
          rows={6}
        />
        <SubmitButton title={"Send"} style={{ marginTop: "10px" }} />
      </div>
      <div className={styles.supportDiv}>
        <TextComponent
          text={"Phone Support"}
          style={{
            fontFamily: "Urbanist-bold",
            fontSize: "var(--heading2-font-size)",
          }}
        />
        <TextComponent
          style={{
            marginTop: "10px",
            fontFamily: "Urbanist-bold",
            fontSize: "var(--dashboard_tabs-font-size)",
          }}
          text={`${"(636) 296-7838"} | ${"(978) 444-4055"}`}
        />
        {!openDrawer ? (
          <>
            {width > 500 ? (
              <div className={styles.liveChatDiv}>
                <div className={styles.liveChat_upper}>
                  <img src={logo} />
                  <TextComponent
                    style={{ fontFamily: "Urbanist-bold" }}
                    text={"Phoenix Support"}
                  />
                </div>
                <SubmitButton
                  onClick={() => setOpenDrawer(true)}
                  title={"Start live chat"}
                  btnClass={styles.liveChatBtn}
                  secondaryBtn
                />
              </div>
            ) : (
              <BsChatLeftDotsFill className={styles.chatIcon}  onClick={() => setOpenDrawer(true)}/>
            )}
          </>
        ) : (
          <div
            className={styles.chatDiv}
            // style={{
            //   height: `${height}px`,
            //   transition: "height 0.3s ease-in-out",
            // }}
          >
            <div className={styles.chat_header}>
              <div className={styles.chat_headerLeft}>
                <img src={logo} />
                <TextComponent
                  text={"Phoenix Support"}
                  style={{ fontFamily: "Urbanist-bold" }}
                />
                <TextComponent
                  text={"● Live chat"}
                  className={styles.chat_liveChat}
                />
              </div>
              <div
                className={styles.chat_headerRight}
                onClick={() => setOpenDrawer(false)}
              >
                <IoCloseCircleSharp size={25} color={"var(--light-grey)"} />
              </div>
            </div>

            <div
              //  ref={contentRef}
              className={styles.content}
            >
              <List dataSource={dummyChats} renderItem={renderChats} />
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeBox_left}>
                <GrAttachment />
              </div>
              <div className={styles.typeBox_middle}>
                <input placeholder="type..." />
              </div>
              <div className={styles.typeBox_right}>
                <IoSend size={18} color={"var(--secondary-color)"} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpSupport;
