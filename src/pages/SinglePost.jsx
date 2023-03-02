import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Posts/Loader";
import { GetSinglePost } from "../redux/Slice/PostSlice";
import { HeightContainer, scrollbarStyle } from "../util/StyleSheets";
import ArrowLeft from "../assets/arrow-left.svg";
const SinglePost = () => {
  const PARAM = useParams();
  const selector = useSelector((state) => state.PostSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    // this will dispatch the action to fetch the data from this paramID
    dispatch(GetSinglePost(PARAM.id));
  }, []);
  // this all the data we got from the response
  const { title, description, id, date, username, tags } = selector.SPost;
  const navigate = useNavigate();
  const GoBackAction = (e) => {
    // this to handle the (goback) or (go to previus page) action
    navigate(-1);
  };
  return selector.isSPost ? (
    <Loader />
  ) : (
    <div className={`w-full px-4 ${HeightContainer}`}>
      <img
        className="w-6 cursor-pointer mb-4 "
        src={ArrowLeft}
        onClick={GoBackAction}
      />
      <div className="mb-4">
        <p className="font-header text-primary text-2xl md:text-4xl mb-4">
          {title}
        </p>
        <div className="flex flex-col md:flex-row text-light font-[200] lowercase">
          <span className="">
            written by @<Link>{username}</Link>
          </span>
          <span>
            on {date?.day} {date?.month} {date?.year}
          </span>
        </div>
      </div>
      <div className={`h-[65%] md:h-full overflow-y-auto ${scrollbarStyle}`}>
        <p className="h-full">{description}</p>
      </div>
    </div>
  );
};

export default SinglePost;
