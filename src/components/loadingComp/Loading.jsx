import React from "react";
import { useSelector } from "react-redux";
import TextComponent from "../textComponent/TextComponent";
import Lottie from "lottie-react";
import LOADER from '../../assets/animations/loader.json'

const Loading = () => {
  const loading = useSelector((state) => state.GeneralReducer.loading);
  return loading ? (
    <div className="loadingClass">
      <div className="loadingInnerClass">
        <Lottie animationData={LOADER} loop={true} style={{ width: '70%', height: '70%' }} />
        <TextComponent text='Loading ... Please wait !' style={{ color: 'var(--light-text)', fontSize: '20px', fontWeight: 'bold' }} />
      </div>
    </div>

  ) : (


    <></>
  );
};

export default Loading;
