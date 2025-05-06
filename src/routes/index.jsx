import { Result } from "antd";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Login from "../screens/Auth/Login/Login";
import Signup from "../screens/Auth/SignUp/Signup";
import { ProtectedLayout } from "./ProtectedRoutes";
import { HomeLayout } from "./PublicRoutes";
import Dashboard from "../screens/Dashboard/Dashboard";
import SnippetDetail from "../screens/Dashboard/Snippets/SnippetDetail";
import Profile from "../screens/Profile/Profile";
import MyBasket from "../screens/MyBasket/MyBasket";
import About from "../screens/About/About";
import Feedback from "../screens/Feedback/Feedback";
import LandingPage from "../screens/LandingPage/LandingPage";
import PrivacyPolicy from "../screens/PrivacyPolicy/PrivacyPolicy";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />

      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/myBasket" element={<MyBasket />} />
        <Route path="/snippetDetail" element={<SnippetDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<Feedback />} />

      </Route>


      <Route path="*" element={
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
        />
      }
      />
    </>
  )
);
