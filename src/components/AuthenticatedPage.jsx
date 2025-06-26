import React from "react";
import { Navigate, Outlet } from "react-router";
import useUserAuthStatus from "./../hooks/useUserAuthStatus";
import { toast } from "react-toastify";

const AuthenticatedPage = () => {
  const { userLoggedIn, checkUserStatus } = useUserAuthStatus();

  if (checkUserStatus) {
    return <></>;
  }

  return userLoggedIn ? <Outlet /> : <Navigate to="/signIn" />;
};

export default AuthenticatedPage;