import { Result } from "antd";
import { createBrowserRouter,  createRoutesFromElements,  Route} from "react-router-dom";
import Login from "../screens/Auth/Login/Login";
import Signup from "../screens/Auth/SignUp/Signup";
import { ProtectedLayout } from "./ProtectedRoutes";
import { HomeLayout } from "./PublicRoutes";
import UploadSnippet from "../screens/UploadSnippet/UploadSnippet";
import Dashboard from "../screens/Dashboard/Dashboard";
import SnippetDetail from "../screens/Dashboard/Snippets/SnippetDetail";
import Profile from "../screens/Profile/Profile";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/accountSetup" element={<AccountSetup />} /> */}
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/uploadSnippet" element={<UploadSnippet />} />
        <Route path="/snippetDetail" element={<SnippetDetail />} />
        <Route path="/profile" element={<Profile />} />

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
