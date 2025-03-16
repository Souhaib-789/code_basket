import { Button, Flex, Progress } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./AccountSetup.module.css";
import logo from "../../../assets/images/logo.png";
import { InputField, PhoneInput, SubmitButton, TextComponent } from "../../../components";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { message, Upload } from 'antd';
const fileTypes = ["JPG", "PDF", "GIF"];
const AccountSetup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [percent, setPercent] = useState(50);
  const [identificationNo, setIdentificationNo] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [file, setFile] = useState(null);
  const { width } = useWindowDimensions();

  const hiddenFileInput = useRef();
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: true,
  // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log("uploading",info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};
  return (
    <div className={styles.mainCont}>
      <div className={styles.leftCont}>
        <img src={logo} className={styles.logoImg} />
      </div>
      <div className={styles.rightCont}>
        <div className={styles.subRightCont}>
          <div className={styles.textDiv}>
            <div className={styles.welcomeDiv}>
              <TextComponent
                className={styles.welcomeHeading}
                text={"Welcome!"}
              />
              <Flex gap={10} vertical style={{ marginLeft: "10px" }}>
                <Progress
                  showInfo={false}
                  trailColor={"var(--light-blue)"}
                  strokeLinecap={"round"}
                  strokeColor={"var(--secondary-color)"}
                  percent={percent}
                  steps={2}
                  size={{ width: width < 500 ? 50 : 100, height: 8 }}
                  className={styles.progressBar}
                  //   style={{width: "100px", height: "6px", borderRadius: "10px"}}
                />
              </Flex>
            </div>
            <TextComponent
              className={styles.welcomeText}
              text={"Enter your business details"}
            />
          </div>
          {percent == 50 ? (
            <div className={styles.inputDiv}>
              <InputField
                label={"Business Name"}
                placeholder={"Write here"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputField
                label={"Business Email"}
                placeholder={"Write here"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <InputField
                label={"Primary Contact Number"}
                placeholder={"Write here"}
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
              /> */}
              <PhoneInput
                label={"Primary Contact Number"}
                placeholder={"Write here"}
                className={styles.input}
                value={contactNo}
                onChange={setContactNo}


              />
              <InputField
                label={"Business Address"}
                placeholder={"Write here"}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          ) : (
            <div className={styles.inputDiv}>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  {/* <InboxOutlined /> */}
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger>
              {/* <img
                src={documentbox}
                style={{ cursor: "pointer" }}
                onClick={handleClick}
              />
              <input
                type="file"
                accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                ref={hiddenFileInput}
                style={{ display: "none" }}
              /> */}
              <TextComponent
                text={" business license and tax ID certificate"}
                className={styles.documentText}
              />
              <InputField
                className={styles.input}
                label={"Tax Identification Number"}
                placeholder={"Write here"}
                value={identificationNo}
                onChange={(e) => setIdentificationNo(e.target.value)}
                maxLength={15}
              />
              <InputField
                className={styles.input}
                label={"Business License Number"}
                placeholder={"Write here"}
                value={licenseNo}
                onChange={(e) => setLicenseNo(e.target.value)}
                maxLength={25}
              />
              {/* <FileUploader handleChange={(file)=>setFile(file)} name="file" types={fileTypes} /> */}
            </div>
          )}
          <div className={styles.btn}>
            {percent == 50 ? (
              <SubmitButton onClick={() => setPercent(100)} title={"Next"} />
            ) : (
              <SubmitButton
                title={"Next"}
                onClick={() => navigate("/businessProfileSetup")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSetup;
