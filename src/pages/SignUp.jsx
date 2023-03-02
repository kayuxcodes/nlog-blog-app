import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SideBackground from "../components/Form/SideBackground";
import FormSide from "../components/Form/Signup/FormSide";
import HandleStatus from "../components/Notifications/HandleStatus";
const SignUp = () => {
  const selector = useSelector((state) => state.usersSlice);
  const [Show, setShow] = useState(true);
  // an notification component
  const HSNotification = () => {
    if (selector.completed === "fulfilled") {
      return <HandleStatus status={true} mod={false} />;
    } else if (selector.completed === "rejected") {
      return <HandleStatus status={false} mod={false} />;
    }
  };
  // this will hide the notification component what ever the post is success or failed
  useEffect(() => {
    if (selector.completed !== "pending") {
      setTimeout(() => {
        setShow(false);
      }, [2000]);
    }
  }, [selector.completed]);

  return (
    <div className="grid grid-cols-4 w-full h-[100vh] relative">
      <SideBackground label="Sign Up" />
      <FormSide />
      {Show && HSNotification()}
    </div>
  );
};

export default SignUp;
