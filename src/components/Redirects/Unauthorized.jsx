import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="bg-primary h-[100vh] flex items-center justify-center">
      <div className="h-[30rem] px-5 text-white max-w-[500px]">
        <h1 className="text-4xl md:text-5xl text-primary font-bold text-center mb-10">
          Oops...
        </h1>
        <p>
          we notice that you tried to access Unauthorized page, Please Login to
          access this pages.
        </p>
        <div className="text-center mt-8">
          <p>
            Try to Login{" "}
            <Link className="text-primary font-medium" to="/log-in">
              here
            </Link>
          </p>
          <p className="">
            You don't have an account?{" "}
            <Link className="text-primary font-medium" to="/sign-up">
              create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
