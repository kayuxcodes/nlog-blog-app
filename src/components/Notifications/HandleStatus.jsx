import React from "react";
import { useSelector } from "react-redux";
import notification_active from "../../assets/notifications_active.svg";
const HandleStatus = ({ status, mod }) => {
  const selector = useSelector((state) => state.usersSlice);
  // this to change between the content msg
  // for signup and login components
  const logIn = {
    success: "Authentication Successfull.",
    failed: "Authentication failed, Please try again.",
  };
  const SignUp = {
    success: "You can Log-in now.",
    failed: "Sign-Up failed, Please try again.",
  };
  if (selector.error.status) {
    logIn.failed = selector.error.message;
  }
  const component = mod ? logIn : SignUp;
  const card = status ? "success" : "failed";
  return (
    <div
      className={`text-black absolute md:w-[364px] w-[80%] min-w-[205px] max-w-[400px] ${
        status ? "bg-main" : "bg-dng"
      } flex justify-between gap-2 items-center py-3 px-4 md:py-4 md:px-6 top-[4%] left-1/2 translate-x-[-50%] md:left-auto md:top-6 md:right-16 md:translate-y-0 md:translate-x-0`}
    >
      <div>
        <span className="uppercase text-sm md:text-base font-bold ">
          {card}
        </span>
        <p className="text-sm md:text-base">
          {status ? component.success : component.failed}
        </p>
      </div>
      <div>
        <img className="w-7" src={notification_active} alt="" />
      </div>
    </div>
  );
};
export default HandleStatus;
