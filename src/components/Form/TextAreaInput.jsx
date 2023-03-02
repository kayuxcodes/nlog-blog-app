import { useField } from "formik";
import React from "react";
import { scrollbarStyle } from "../../util/StyleSheets";

const TextArea = (props) => {
  const [field, meta, helpers] = useField(props);
  const { error, touched } = meta;
  return (
    <div
      className={`min-h-[120px] flex flex-1 flex-col flex-wrap border-primary border-[1px] mb-6 py-3 px-4 ${
        error && touched ? "!border-dng" : ""
      }`}
    >
      <textarea
        className={`bg-primary py-1 md:py-2 outline-none resize-none text-white flex-1 md:flex-0 ${scrollbarStyle}`}
        {...field}
        {...props}
      />
      {error && touched && (
        <div className="text-white py-2 md:max-w-[280px] whitespace-nowrap truncate text-sm !text-dng">
          {error}
        </div>
      )}
    </div>
  );
};

export default TextArea;
