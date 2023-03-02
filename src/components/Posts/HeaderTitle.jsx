import React from "react";

const HeaderTitle = ({ label }) => {
  return (
    <div className="flex flex-col w-fit items-center mb-6 text-base md:text-xl">
      <div className="w-5 h-1 bg-main"></div>
      <p className="">{label}</p>
    </div>
  );
};

export default HeaderTitle;
