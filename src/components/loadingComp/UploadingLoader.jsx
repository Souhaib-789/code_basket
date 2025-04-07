import React from "react";
import TextComponent from "../textComponent/TextComponent";
import Lottie from "lottie-react";
import ROCKET from '../../assets/animations/rocket.json'
import { useSelector } from "react-redux";

const UploadingLoader = () => {
    const loading = useSelector((state) => state.GeneralReducer.uploadingLoading);

    return loading ? (
        <div className="loadingClass">
            <div className="loadingInnerClass">
            <Lottie animationData={ROCKET} loop={true} style={{width: '70%', height: '70%'}} />
            <TextComponent text='Uploading ...' style={{ color: 'var(--black-color)', fontSize: '20px'}} />
            </div>
        </div>
    )
    : 
    (
        <></>
    );
};

export default UploadingLoader;
