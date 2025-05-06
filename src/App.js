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
import supabase from "./config/supabase-client";



function App() {
  const dispatch = useDispatch();
  const islogin = useSelector((state) => state.AuthReducer?.isLogin);
  const darkTheme = useSelector((state) => state.GeneralReducer.darkTheme);

  // useEffect(() => {
  //   const userData = localStorage.getItem("@user");
  //   const token = localStorage.getItem("@token");
  //   const user = JSON?.parse(userData);
  //   const storedTheme = localStorage.getItem('@theme');
    
  //   console.log("theme", storedTheme);
  //   if (userData != null && token != null) {
  //     // console.log("sdfsdfsdfseadfasdf", islogin);
  //     dispatch(getUser(user));
  //     dispatch(isLogin(true));
  //     dispatch(changeTheme(storedTheme));
  //     // dispatch(AuthMiddleware.GeneralType());
  //   } else {
  //     dispatch(getUser(null));
  //     dispatch(isLogin(false));
  //   }
  // }, []);

  useEffect(() => {
    const userData = localStorage.getItem("@user");
    const token = localStorage.getItem("@token");
    const storedTheme = localStorage.getItem('@theme');
  
    if (userData && token) {
      const user = JSON.parse(userData);
      dispatch(getUser(user));
      dispatch(isLogin(true));
      dispatch(changeTheme(storedTheme));
    } else {
      // 👇 Handle the case when user just returned from Google login
      supabase.auth.getSession().then(async ({ data: { session } }) => {
        if (session) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select()
            .eq('id', session.user.id)
            .single();
  
          if (profileData) {
            localStorage.setItem("@user", JSON.stringify(profileData));
            localStorage.setItem("@token", session.access_token);
            dispatch(getUser(profileData));
            dispatch(isLogin(true));
            dispatch(changeTheme(storedTheme));

          }
        } else {
          dispatch(getUser(null));
          dispatch(isLogin(false));
        }
      });
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
