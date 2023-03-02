import React from "react";
import { Link } from "react-router-dom";

const TagCard = ({ label }) => {
  return (
    <Link
      to=""
      className="text-xs border-primary border-[1px] font-medium text-primary py-1 px-5 lowercase rounded-xl"
    >
      #{label}
    </Link>
  );
};

export default TagCard;
