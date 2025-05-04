import "./App.css";
import { useEffect } from "react";
import { getUser, isLogin } from "./Store/Actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import AlertComp from "./components/alert/Alert";
import Loading from "./components/loadingComp/Loading";
import UploadingLoader from "./components/loadingComp/UploadingLoader";
import { changeTheme } from "./Store/Actions/GeneralActions";



function App() {
  const dispatch = useDispatch();
  const islogin = useSelector((state) => state.AuthReducer?.isLogin);
  const darkTheme = useSelector((state) => state.GeneralReducer.darkTheme);

  useEffect(() => {
    const userData = localStorage.getItem("@user");
    const token = localStorage.getItem("@token");
    const user = JSON.parse(userData);
    const storedTheme = localStorage.getItem('@theme');
    
    console.log("theme", storedTheme);
    if (userData != null && token != null) {
      // console.log("sdfsdfsdfseadfasdf", islogin);
      dispatch(getUser(user));
      dispatch(isLogin(true));
      dispatch(changeTheme(storedTheme));
      // dispatch(AuthMiddleware.GeneralType());
    } else {
      dispatch(getUser(null));
      dispatch(isLogin(false));
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkTheme);
  }, [darkTheme]);

  return islogin == null ? (
    <></>
  ) : (
    <>
      <AlertComp />
      <Loading />
      <UploadingLoader />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
