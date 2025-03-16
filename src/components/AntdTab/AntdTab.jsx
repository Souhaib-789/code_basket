import React, { useRef } from "react";
import styles from "./antdTab.module.css";
import { Carousel, Col, Row, Tabs } from "antd";
import TextComponent from "../textComponent/TextComponent";
import { useState } from "react";
import SubmitButton from "../submitButton/SubmitButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const AntdTab = ({
  items,
  centered,
  titleClass,
  rightItems,
  destroyInactiveTabPane,
}) => {
  const [ActiveTab, setActiveTab] = useState("1");
  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
      animated
      destroyInactiveTabPane={destroyInactiveTabPane}
      activeKey={ActiveTab}
      // onTabClick={details}
      renderTabBar={(props) => {
        return (
          <>
            <div className={`${styles.tabsMainCont}`}>
              <div className={`${styles.tabsCont}`}>
                {props.panes.map((tab) => (
                  <div
                    key={tab.props.tabKey}
                    className={`${styles.tabCol} ${
                      props.activeKey == tab.props.tabKey && styles.activeTab
                    }`}
                    onClick={() => {
                      setActiveTab(tab.props.tabKey);
                    }}
                  >
                    <TextComponent
                      text={tab.props.tab}
                      className={`${styles.tabText} ${titleClass}`}
                    />
                  </div>
                ))}
              </div>

              {rightItems && (
                <div className={styles.rightDiv}>{rightItems}</div>
              )}
            </div>
          </>
        );
      }}
    />
  );
};

export default AntdTab;
