import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function Protected() {
  const { userInfo } = useSelector((state) => state.user);
  return userInfo ? <Outlet /> : <Navigate to={"/login"}/>;
}
