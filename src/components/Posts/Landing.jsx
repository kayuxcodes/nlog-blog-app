import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPosts } from "../../redux/Slice/PostSlice";
import PostCard from "./PostCard";
import HeaderTitle from "./HeaderTitle";
import { HeightContainer, scrollbarStyle } from "../../util/StyleSheets";
import Loader from "./Loader";
const Landing = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.PostSlice);
  const usersSlice = useSelector((state) => state.usersSlice);
  useEffect(() => {
    dispatch(GetPosts());
  }, [dispatch]);
  const Posts =
    selector.posts.length !== 0 ? (
      selector.posts.map(
        ({ id, title, description, tags, date, username }, ind) => (
          <PostCard
            title={title}
            description={description}
            tags={tags}
            key={id}
            date={date}
            username={username}
            id={id}
          />
        )
      )
    ) : (
      <div className="text-center text-xl md:text-2xl font-bold ">
        No Posts Yet
      </div>
    );
  return (
    <>
      <HeaderTitle label="trending" />
      <div
        className={`w-full flex flex-col gap-5 md:gap-10 overflow-y-auto ${HeightContainer} md:h-[auto] ${scrollbarStyle}`}
      >
        {selector.isLoading ? <Loader /> : Posts}
      </div>
    </>
  );
};

export default Landing;
