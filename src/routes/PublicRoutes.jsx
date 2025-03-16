import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Storage from "../utilities/AsyncStorage";
import styles from "./layoutstyle.module.css";
import { Button, Result } from "antd";

export const HomeLayout = () => {
  const isLogin = useSelector((state) => state.AuthReducer.isLogin);



  const navigate = useNavigate();

  if (isLogin == true) {
    return (
      <Navigate
        to={"/dashboard"
        }
      />
    );
  }
  return (
    <div className={styles.publiclayoutContainer}>
      <Outlet />
    </div>
  );
};

export const RolesLayout = ({ roles }) => {
  // const navigate = useNavigate();
  // if (!roles?.includes(role)) {
  //   return (
  //     <Result
  //       style={{ width: "100%", padding: "0px !important" }}
  //       status="403"
  //       title="403"
  //       subTitle="Sorry, you are not authorized to access this page."
  //       extra={
  //         <Button type="primary" onClick={() => navigate(-1)}>
  //           Go Back
  //         </Button>
  //       }
  //     />
  //   );
  // }
  return (
    <div>
      <Outlet />
    </div>
  );
};
