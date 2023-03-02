import React from "react";

const SubmitInput = ({ label, extraClasses, isSubmitting }) => {
  return (
    <>
      <input
        className={`text-black cursor-pointer bg-main py-3 px-6 md:py-4 md:px-12 md:text-xl uppercase font-bold mr-10  hover:bg-black hover:text-primary transition-[background-color_color] duration-[0.3s] disabled:opacity-30 disabled:pointer-events-none ${
          extraClasses ? extraClasses : ""
        }`}
        type="submit"
        value={label}
        disabled={isSubmitting}
      />
    </>
  );
};

export default SubmitInput;
