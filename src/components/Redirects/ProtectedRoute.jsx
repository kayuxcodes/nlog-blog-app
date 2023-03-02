import React from "react";
import { useSelector } from "react-redux";
import Unauthorized from "./Unauthorized";
// there is a better ways to do this, ...
// this methode cause a litle of code
// instead of creating multiple componets doing the same role
const ProtectedRoute = ({ children, state, componentName }) => {
  // an object of all component this page need
  const Components = {
    Unauthorized: Unauthorized,
  };
  // an constant to assign the component to use it bellow
  const Component = Components[componentName];
  // a selector of store
  const selector = useSelector((state) => state.usersSlice);
  // this to handle the (Unauthorized) or the (already) status
  const SELECTOR = () => {
    if (selector[state] === "fulfilled") {
      return true;
    } else {
      return false;
    }
  };
  return SELECTOR() ||
    JSON.parse(localStorage.getItem("isLoggedin")) === true ? (
    children
  ) : (
    <Component />
  );
};

export default ProtectedRoute;
