import "./App.css";
import {useEffect } from "react";
import { getUser, isLogin } from "./Store/Actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import AlertComp from "./components/alert/Alert";
import Loading from "./components/loadingComp/Loading";



function App() {
  const dispatch = useDispatch();
  const islogin = useSelector((state) => state.AuthReducer?.isLogin);

  useEffect(() => {
    const userData = localStorage.getItem("@user");
    const token = localStorage.getItem("@token");
    const user = JSON.parse(userData);
    // console.log("tokennnnnn", token);
    if (userData != null && token != null) {
      // console.log("sdfsdfsdfseadfasdf", islogin);
      dispatch(getUser(user));
      dispatch(isLogin(true));
      // dispatch(AuthMiddleware.GeneralType());
    } else {
      dispatch(getUser(null));
      dispatch(isLogin(false));
    }
  }, []);

  return islogin == null ? (
    <></>
  ) : (
    <>
      <AlertComp />
      <Loading />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
