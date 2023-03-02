import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import addcircle from "../../assets/add_circle.svg";
import search from "../../assets/search.svg";
import trending from "../../assets/trending_up.svg";
import logout from "../../assets/logout.svg";
import LogoutPopup from "./LogoutPopup";
const SideBar = () => {
  const navigate = useNavigate();
  const [ConfirmLogout, setConfirmLogout] = useState(false);
  // this will remove the local storage which make the log out action
  // and then redirect the user to the login page
  const HandleLogoutButton = (e) => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/log-in", { replace: true });
    }, [1000]);
  };
  const handleCancel = () => {
    setConfirmLogout(false);
  };
  const HandleShow = () => {
    setConfirmLogout(true);
  };
  const { email } = JSON.parse(localStorage.getItem("userData"));
  const username = email.split("@")[0][0];
  return (
    <div className="fixed md:bottom-auto bottom-[4%] translate-x-[-50%] h-[60px] left-1/2 md:text-sm xl:text-base md:left-0  md:translate-x-0 md:h-full md:top-0 md:gap-10 flex md:w-[100px] w-[270px] border-primary border-[1px] justify-evenly items-center md:flex-col text-white z-10">
      <div className="flex h-full md:h-auto justify-center items-center md:flex-col gap-5 md:gap-8 md:mb-30">
        <NavLink
          to="/profile"
          className="w-9 h-9 md:w-16 md:h-16 text-black cursor-pointer rounded-full bg-main flex justify-center items-center md:text-3xl flex-col uppercase"
        >
          {username}
        </NavLink>
        <NavLink
          to="/"
          className="flex md:flex-col items-center cursor-pointer justify-center"
        >
          <img className="w-8 md:w-auto" src={trending} alt="" />
          <span className="hidden md:block">trending</span>
        </NavLink>
        <NavLink
          to="createpost"
          className="flex md:flex-col items-center cursor-pointer justify-center"
        >
          <img className="w-8 md:w-auto" src={addcircle} alt="" />
          <span className="hidden md:block">create</span>
        </NavLink>
      </div>
      <div className="flex flex-row md:flex-col justify-center items-center gap-5 md:gap-8">
        {/* <NavLink
          to="createpost"
          className="flex md:flex-col items-center cursor-pointer justify-center"
        >
          <img className="w-8 md:w-auto" src={addcircle} alt="" />
          <span className="hidden md:block">create</span>
        </NavLink> */}
        <div className="flex md:flex-col items-center cursor-pointer justify-center">
          <div onClick={HandleShow}>
            <img className="w-8 md:w-auto" src={logout} alt="" />
            <span className="hidden md:block">logout</span>
          </div>
          {ConfirmLogout && (
            <LogoutPopup
              handleSubmit={HandleLogoutButton}
              handleCancel={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;

{
  /* <NavLink
to="createpost"
className="flex md:flex-col items-center cursor-pointer justify-center"
>
<img className="w-8 md:w-auto" src={addcircle} alt="" />
<span className="hidden md:block">create</span>
</NavLink> */
}
