import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import styles from "./BusinessProfileSetup.module.css";
import clockImg from "../../assets/images/clock.png";
import {
  Dropdown,
  InputField,
  PhoneInput,
  SubmitButton,
  TextComponent,
} from "../../components";
import { Flex, List, Progress } from "antd";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import uploadImg from "../../assets/images/uploadImg.jpg";
import uploadPFImg from "../../assets/images/uploadPFImg.jpg";
import image1 from "../../assets/images/staticImages/pf.png";
import image2 from "../../assets/images/staticImages/pf1.png";
import { IoClose } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { showAlert } from "../../Store/Actions/GeneralActions";

const BusinessProfileSetup = () => {
  const { width } = useWindowDimensions();
  const [percent, setPercent] = useState(50);
  const [companyLogo, setCompanyLogo] = useState();
  const [profilePic, setProfilePic] = useState();
  const [businessYears, setBusinessYears] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  console.log("usersssssss", users);

  const hiddenFileInput = useRef();
  const hiddenPFInput = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFileHandler = () => {
    hiddenFileInput.current.click();
  };
  const handlePFHandler = () => {
    hiddenPFInput.current.click();
  };
  const dummyUsers = [
    {
      id: 1,
      image: image1,
      name: "Alex Buckmaster",
      role: "Admin",
    },
    {
      id: 2,
      image: image2,
      name: "Chris Glasser",
      role: "Assistant",
    },
  ];
  const onClickAddHandler = () => {
    if(!profilePic || !name || !role){
      dispatch(showAlert({
        type:"error",
        message:"All fields are required"
      }))
    }else{
      let person = {
        id: users.length + 1,
        image: profilePic,
        name: name,
        role: role
      }
      setUsers([...users, person]);
      setName("");
      setRole("");
      setProfilePic("");
      setContactNo('')
      setEmail("")
   
    }
  }
  const onClickRemoveHandler = (index) =>{
    let filterArr = users.filter((item, i)=>i != index)
    setUsers(filterArr);

  }
  const onLogin = () => {
    // localStorage.setItem("@user", { role: roles.dealership });
    // localStorage.setItem("@token", roles.dealership);
    // Storage.setERole('@role',roles.dealership);
    // dispatch(isLogin(true));
    // dispatch(getUser({ role: roles.dealership }));
  };
  const renderItem = (item, index) => {
    return (
      <div className={styles.listItem}>
        <div className={styles.listImageDiv}>
          <img src={ URL.createObjectURL(item?.image)} alt="image" className={styles.listImage} />
          <div className={styles.crossIcon}
           onClick={()=>onClickRemoveHandler(index)}
           >
            <IoClose color={"var(--white-color)"} />
          </div>
          {/* <RiCloseCircleFill className={styles.crossIcon} /> */}
        </div>
        <TextComponent text={item?.name} className={styles.listName} />
        <TextComponent text={item?.role?.value} className={styles.listRole} />
      </div>
    );
  };
  return (
    <div className={styles.mainCont}>
      <div className={styles.leftCont}>
        <img src={logo} className={styles.logoImg} />
      </div>
      {/* <div></div> */}
      <div className={styles.rightCont}>
        <div className={styles.subRightCont}>
          {/* <div className={styles.rightWidthCont}> */}
          <div className={styles.textDiv}>
            <div className={styles.welcomeDiv}>
              <TextComponent
                className={styles.welcomeHeading}
                text={"Congrats your account is verified"}
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
              text={
                percent == 50 ? "Enter your business details" : "Assign Roles"
              }
            />
          </div>
          {percent == 50 ? (
            <>
              <div className={styles.uploadLogoDiv} >
                <img
                onClick={handleFileHandler}
                  src={
                    companyLogo ? URL.createObjectURL(companyLogo) : uploadImg
                  }
                  className={styles.uploadLogo}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCompanyLogo(e.target.files[0])}
                  ref={hiddenFileInput}
                  style={{ display: "none" }}
                />
              </div>
              <InputField
                placeholder={"Write here"}
                label={"Years in business"}
                type={"number"}
                value={businessYears}
                onChange={(e) => setBusinessYears(e.target.value)}
              />
              <InputField
                placeholder={"Write here"}
                label={"Description of services"}
                //   type={"number"}
                value={serviceDesc}
                onChange={(e) => setServiceDesc(e.target.value)}
              />
              <SubmitButton
                btnClass={styles.btn}
                title={"Next"}
                onClick={() => setPercent(100)}
              />
            </>
          ) : (
            <div>
              <List
                grid={{ xxl: 4, xl: 4, lg: 4, md: 3, sm: 2 }}
                dataSource={users}
                renderItem={renderItem}
                className={styles.list}
                // key={}
              />
              <div className={styles.profileDiv}>
                <div
                  className={styles.uploadprofileDiv}
                  onClick={handlePFHandler}
                >
                  <img
                    src={
                      profilePic
                        ? URL.createObjectURL(profilePic)
                        : uploadPFImg
                    }
                    className={styles.uploadLogo}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePic(e.target.files[0])}
                    ref={hiddenPFInput}
                    style={{ display: "none" }}
                  />
                </div>
                <div className={styles.profileInputs}>
                  <InputField
                    placeholder={"Write here"}
                    label={"Name"}
                    //   type={"number"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <InputField
                    placeholder={"Write here"}
                    label={"Email"}
                    //   type={"number"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <PhoneInput
                label={"Contact number"}
                placeholder={"Write here"}
                // className={styles.input}
                value={contactNo}
                onChange={setContactNo}
              />
              <div className={styles.dropdownDiv}>
                <Dropdown
                  className={styles.input}
                  label={"Role"}
                  value={role}
                  labelStyle={{ color: "#838383", fontSize: 18 }}
                  style={{ color: "black" }}
                  options={[
                    {
                      value: "Admin",
                      id: 1,
                    },
                    {
                      value: "Assistant",
                      id: 2,
                    },
                  ]}
                  onChange={(e) => setRole(e)}
                />
                <div className={styles.addBtn} onClick={onClickAddHandler}>
                  <FaCirclePlus className={styles.addIcon} />
                  <TextComponent text={"Add"} />
                </div>
              </div>
              <SubmitButton title={"Continue"} className={styles.contBtn} onClick={onLogin}/>
         
            </div>
          )}
        {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileSetup;
