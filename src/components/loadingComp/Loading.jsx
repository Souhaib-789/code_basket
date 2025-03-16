import React from "react";
import { Alert, Spin } from 'antd';
import { useSelector } from "react-redux";
import TextComponent from "../textComponent/TextComponent";
import { LoadingOutlined } from "@ant-design/icons";

const Loading = () => {
  const loading = useSelector((state) => state.GeneralReducer.loading);
  const antIcon = <LoadingOutlined color="white"/>
  return loading ? (
    <div className="loadingClass">
      <Spin indicator={antIcon} />
      <TextComponent text='Loading ...' style={{color:'var(--white-color)',fontSize:'20px',fontWeight:'bold',marginTop:15 }}/>
    </div>
  ) : (
    <></>
  );
};

export default Loading;
