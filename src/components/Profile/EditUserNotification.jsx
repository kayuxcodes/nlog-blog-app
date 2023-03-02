import React from "react";
import notification_active from "../../assets/notifications_active.svg";
const EditUserNotification = ({ status }) => {
  return (
    <div
      className={`text-black absolute md:w-[364px] w-[80%] min-w-[205px] max-w-[400px] ${
        status ? "bg-main" : "bg-dng"
      } flex justify-between gap-2 items-center py-3 px-4 md:py-4 md:px-6 top-[4%] left-1/2 translate-x-[-50%] md:left-auto md:top-6 md:right-16 md:translate-y-0 md:translate-x-0`}
    >
      <div>
        <span className="uppercase text-sm md:text-base font-bold ">
          {status ? "success" : "failed"}
        </span>
        <p className="text-sm md:text-base">
          {status
            ? "Edit change Successfully"
            : "Edit change failed, Please try again"}
        </p>
      </div>
      <div>
        <img className="w-7" src={notification_active} alt="" />
      </div>
    </div>
  );
};

export default EditUserNotification;
