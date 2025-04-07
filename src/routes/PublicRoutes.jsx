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
 
  return (
    <div>
      <Outlet />
    </div>
  );
};
