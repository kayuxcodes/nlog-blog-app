import React from "react";
import notification_active from "../../assets/notifications_active.svg";
const CreatePostsNotification = ({ status }) => {
  // this to change between the content msg
  // this have some changes with styling (for truncate and the notification icon)
  const msgs = {
    success: "Post created successfully.",
    failed: "Failed to create, Please try again.",
  };
  return (
    <div
      className={`text-black absolute md:w-[364px] w-[80%] min-w-[205px] max-w-[400px] ${
        status ? "bg-main" : "bg-dng"
      } flex justify-between gap-2 items-center py-2 px-4 md:py-4 md:px-6 top-[10%] left-1/2 translate-x-[-50%] md:left-auto md:top-6 md:right-16 md:translate-y-0 md:translate-x-0`}
    >
      <div className="flex-1 md:max-w-full max-w-[80%]">
        <span className="uppercase text-sm md:text-base font-bold">
          {status ? "Success" : "Failed"}
        </span>
        <p className="text-sm md:text-base truncate w-full">
          {status ? msgs.success : msgs.failed}
        </p>
      </div>
      <div>
        <img className="w-7" src={notification_active} alt="" />
      </div>
    </div>
  );
};

export default CreatePostsNotification;
