import React from "react";
import background from "../../assets/sidebackgound_form.png";
const SideBackground = ({ label }) => {
  return (
    <div className="hidden md:block w-full col-span-1 h-full border-r-[4px] border-primary">
      <div className="relative w-full h-full">
        <img
          className="absolute top-0 left-0 w-full object-cover h-full"
          src={background}
          alt="Background"
        />
        <span
          className={`absolute top-1/2 left-1/2 [transform:translate(-50%,-50%)rotate(180deg)] text-6xl text-white font-bold [writing-mode:vertical-rl]`}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export default SideBackground;
