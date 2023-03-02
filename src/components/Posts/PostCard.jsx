import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import TagCard from "./TagCard";
const PostCard = ({ id, username, date, title, description, tags }) => {
  const [widthSize, setWidthSize] = useState(window.innerWidth);
  const Tags = tags.map((ele, ind) => <TagCard label={ele} key={ind} />);
  useEffect(() => {
    const handleWindowResize = () => {
      setWidthSize(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  const formattedDescription = (width) => {
    // this to handle the words of description that will be showin' to the ui
    // to look good in all screens
    if (width <= 640) {
      return description.split(" ").slice(0, 25).join(" ");
    } else if (width > 640 && width <= 768) {
      return description.split(" ").slice(0, 50).join(" ");
    } else {
      return description.split(" ").slice(0, 100).join(" ");
    }
  };

  return (
    <div className="w-full flex gap-0 md:gap-2 md:flex-row flex-col-reverse">
      {/* meta date data */}
      <div className="md:p-0 py-5 px-3 flex justify-between md:flex-col gap-6">
        <div className="flex items-center md:flex-col md:items-end gap-1 font-medium">
          <span className="md:block inline text-right uppercase md:text-4xl">
            {date?.day}
          </span>
          <span className="md:block inline text-right uppercase md:text-4xl ">
            {date?.month}
          </span>
          <span className="inline md:hidden text-right uppercase md:text-4xl ">
            {date?.year}
          </span>
        </div>
        <div
          className={`w-fit md:h-full md:w-full md:flex-1 md:[writing-mode:vertical-rl] md:rotate-180 flex justify-end items-end`}
        >
          <span className="block font-[200]">@{username}</span>
        </div>
      </div>
      {/* meta content data  */}
      <div className="w-full px-4 flex flex-col">
        <div className="font-header text-primary text-2xl md:text-4xl">
          {title}
        </div>
        <div className="mt-4 mb-3 text-base md:text-lg flex-1">
          {formattedDescription(widthSize)}
          <Link
            to={`${import.meta.env.VITE_WEBSITE_URL}/${id}`}
            className="font-[200] text-primary "
          >
            ...read more
          </Link>
        </div>
        <div className="flex gap-3 flex-wrap">{Tags}</div>
      </div>
    </div>
  );
};

export default PostCard;
