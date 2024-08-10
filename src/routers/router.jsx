import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main/main.jsx";
import LoignManager from "../pages/TokenManager/LoginManager/LoginManager.jsx";
import TokenManager from "../pages/TokenManager/TokenManager";
import Page_404 from "../pages/404/404.jsx";
import SignUp from "../pages/TokenGenerator/TokenGenerator";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/TokenManager",
    element: <LoignManager />,
  },
  {
    path: "TokenManager/:tokenAddress",
    element: <TokenManager />,
  },
  {
    path: "/tokenGenerator",
    element: <SignUp />,
  },
  { path: "*", element: <Page_404 /> },
]);
