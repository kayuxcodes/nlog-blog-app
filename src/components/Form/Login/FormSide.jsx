import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../Inputs/CustomInput";
import { LoginSchema } from "../../Schemas/SchemasValidation";
import { currentUser, GetUsers } from "../../../redux/Slice/usersSlice";
import SubmitInput from "../SubmitInput";
const FormSide = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.usersSlice);
  const navigate = useNavigate();
  useEffect(() => {
    // this will make a first request to get all the users
    dispatch(GetUsers());
  }, [dispatch]);
  const handleSubmit = (values, action) => {
    // this block to check if the user successfully login or not
    try {
      const data = selector.data.data;
      const args = selector.data.args;
      let user;
      const auth = data.find((ele) => {
        if (ele.password === values.password && ele.email === values.email) {
          user = {
            auth: true,
            data: ele,
          };
        }
      });
      // the payload here for show the success message
      // and redirect the user to the home page if his authorized
      if (user && user.auth) {
        dispatch(GetUsers(true));
        dispatch(currentUser(user.data));
        // clear the localstorage before assign a new values
        localStorage.clear();
        // assign the new values here
        localStorage.setItem("isLoggedin", JSON.stringify(true));
        localStorage.setItem("userData", JSON.stringify(user.data));
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        throw Error("Authentication failed");
      }
    } catch (error) {
      dispatch(GetUsers(false));
      localStorage.setItem("isLoggedin", JSON.stringify(false));
    }
  };
  // this will remove the previous userdata from the storage
  // to never show the data if the loggin failed
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("isLoggedin")) === false) {
      localStorage.removeItem("userData");
    }
  }, [localStorage.getItem]);
  return (
    <div className="flex justify-center items-center w-full col-span-full md:col-span-3 bg-primary">
      <div className="w-[90%] md:w-[70%]">
        <div className="text-center md:text-left">
          <span className="block font-header text-white text-5xl mb-2">
            Welcome
          </span>
          <p className="text-light font-light text-sm md:text-2xl">
            Let's log you in quickly
          </p>
        </div>
        <div className="mt-6">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={LoginSchema}
          >
            {(props) => (
              <Form>
                <CustomInput
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                />
                <CustomInput
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
                <div className="flex justify-between flex-wrap gap-8 ">
                  <SubmitInput label="login" />
                  <p className="text-white md:text-xl max-w-[280px]  w-[225px] whitespace-nowrap">
                    don't have an account?
                    <Link className="text-primary block" to="/sign-up">
                      sign-up
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default FormSide;
