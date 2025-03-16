// import React from "react";
// import styles from "./ModalComponent.module.css";
// import { Modal } from "antd";
// import { TbLockCheck } from "react-icons/tb";
// import TextComponent from "../textComponent/TextComponent";
// import SubmitButton from "../submitButton/SubmitButton";
// const ModalComponent = ({
//   open,
//   onCancel,
//   className,
//   icon,
//   image,
//   imageClass,
//   width,
//   title,
//   headingClass,
//   textClass,
//   buttonTitle,
//   onBtnPress,
//   text,
//   btnClass,
//   twoButton,
//   onClickOkButton,
//   onClickCancelButton,
//   okBtnTitle,
//   cancelBtnTitle,
//   btnDiv,
//   okbtnClass,
//   cancelbtnClass,
//   children,
//   btnStyle,
//   leftBtnIcon,
//   closable
// }) => {
//   return (
//     <Modal
//       open={open}
//       onCancel={onCancel}
//       footer={false}
//       width={width ? width : "40%"}
//       className={`${className} ${styles.modalCont}`}
//       closable={closable ? closable : true}
//       //   className=""
//     >
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         {icon && 
//         <div className={`${imageClass} ${styles.imageBox}`}>
//           {icon ? (
//             icon
//           ) : // <TbLockCheck className={styles.image} />
//           image ? (
//             <img src={lock} className={styles.image} />
//           ) : null}
//         </div>
//         }
//         {title && (
//           <TextComponent
//           id={"title"}
//             text={title}
//             className={`${headingClass} ${styles.heading}`}
//           />
//         )}
//         {text && <TextComponent text={text} className={textClass} />}
//         {children}

//         {buttonTitle ? (
//           <SubmitButton
//             secondaryBtn
//             title={buttonTitle}
//             onClick={onBtnPress}
//             btnClass={`${styles.btn} ${btnClass}`}
//           />
//         ) : twoButton ? (
//           <div className={`${btnDiv} ${styles.btnDiv}`}>
//             <SubmitButton
//             leftIcon={leftBtnIcon}
//               title={okBtnTitle}
//               onClick={onClickOkButton}
//               btnClass={`${styles.btn} ${cancelbtnClass}`}
//               style={btnStyle}

//             />
//             <SubmitButton
//               secondaryBtn
//               title={cancelBtnTitle}
//               onClick={onClickCancelButton}
//               btnClass={`${styles.secondaryBtn} ${okbtnClass}`}
//               style={btnStyle}
//             />
//           </div>
//         ) : null}
//       </div>
//     </Modal>
//   );
// };

// export default ModalComponent;
