import React, { Fragment } from "react";
import ReactDOM from "react-dom";
const Modal = ({ handleSubmit, handleCancel }) => {
  return ReactDOM.createPortal(
    <div className="flex justify-center items-center absolute w-full left-0 md:w-[calc(100%-100px)] top-0 h-full bg-black/40 md:left-[100px]">
      <div className="text-white bg-primary mx-5 md:m-0 py-7 px-9 md:py-10 md:px-16 rounded-xl">
        <p className="text-xl md:text-2xl text-primary text-center uppercase font-medium mb-5">
          Hope to see you soon
        </p>
        <p className="text-sm md:text-md text-white text-center">
          Are you sure you want to log out?
        </p>
        <div className="mt-5 flex justify-center gap-14 mx-auto select-none">
          <span
            onClick={handleSubmit}
            className="bg-main text-black uppercase font-bold py-1 px-5 cursor-pointer rounded-sm text-sm md:text-base"
          >
            Yes
          </span>
          <span
            onClick={handleCancel}
            className="bg-main text-black uppercase font-bold py-1 px-5 cursor-pointer rounded-sm text-sm md:text-base"
          >
            No
          </span>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
