import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { json, Navigate } from "react-router-dom";
import FormSide from "../components/Form/Login/FormSide";
import SideBackground from "../components/Form/SideBackground";

import HandleStatus from "../components/Notifications/HandleStatus";

const Login = () => {
  const selector = useSelector((state) => state.usersSlice);
  const [show, setShow] = useState(false);
  const HSNotification = () => {
    if (show && selector.isLoginCompleted === "fulfilled") {
      return <HandleStatus status={true} mod={true} />;
    } else if (show && selector.isLoginCompleted === "rejected") {
      return <HandleStatus status={false} mod={true} />;
    }
  };
  // all this is to get the best User Experience
  // this will fix the notification card issue (it was shown for millisecond after the user logout)
  // the default value is (pending) if the value changed the state will update after a while
  useEffect(() => {
    if (selector.isLoginCompleted !== "pending") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [selector.isLoginCompleted]);
  return (
    <div className="grid grid-cols-4 w-full h-[100vh] relative">
      <SideBackground label="Login" />
      <FormSide />
      {HSNotification()}
    </div>
  );
};

export default Login;
