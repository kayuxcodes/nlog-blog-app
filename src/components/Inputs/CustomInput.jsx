import { useField } from "formik";
import React from "react";

const CustomInput = (props) => {
  const [field, meta, helpers] = useField(props);
  const { error, touched } = meta;
  return (
    <div
      className={`flex justify-between items-center flex-wrap border-primary border-[1px] mb-6 py-3 px-4 ${
        error && touched ? "!border-dng" : ""
      }`}
    >
      <input
        className="bg-primary py-1 md:py-2 outline-none text-white flex-1"
        {...field}
        {...props}
      />
      {error && touched && (
        <div className="text-white md:max-w-[280px] whitespace-nowrap truncate text-sm !text-dng">
          {error}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
