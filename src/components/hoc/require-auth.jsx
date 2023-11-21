import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const auth = Cookies.get("auth_realworld_blog");

  if (!auth) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default RequireAuth;
