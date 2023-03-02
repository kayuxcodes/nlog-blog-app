import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Landing from "../components/Posts/Landing";
import SideBar from "../components/Posts/SideBar";
import ProtectedRoute from "../components/Redirects/ProtectedRoute";
const Posts = () => {
  return (
    <div className="h-[100vh] bg-primary relative">
      <SideBar />
      <div className="md:w-[calc(100%-100px)] items-center md:items-start top-0 left-0 w-full h-full px-4 py-10 md:p-16 fixed md:left-[100px] text-white  flex flex-col">
        <Outlet />
      </div>
    </div>
  );
};
export default Posts;
