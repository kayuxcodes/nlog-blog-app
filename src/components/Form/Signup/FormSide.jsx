import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../Inputs/CustomInput";
import { SingupSchema } from "../../Schemas/SchemasValidation";
import { CreatesUsers } from "../../../redux/Slice/usersSlice";
import SubmitInput from "../SubmitInput";
const FormSide = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.usersSlice);
  const navigate = useNavigate();
  const handleSubmit = (values, action) => {
    const { password, name, email } = values;
    const data = {
      password,
      name,
      email,
    };
    dispatch(CreatesUsers(data));
    setTimeout(() => {
      // this will navigate the user into login page
      navigate("/log-in", { replace: true });
    }, [3000]);
  };
  return (
    <div className="flex justify-center items-center w-full col-span-full md:col-span-3 bg-primary">
      <div className="w-[90%] md:w-[70%]">
        <div className="text-center md:text-left">
          <span className="block font-header text-white text-5xl mb-2">
            Welcome
          </span>
          <p className="text-light font-light text-sm md:text-2xl">
            Let's sign you up quickly
          </p>
        </div>
        <div className="mt-6">
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmpassword: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={SingupSchema}
          >
            {(props) => (
              <Form>
                <CustomInput
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                />
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
                <CustomInput
                  name="confirmpassword"
                  type="password"
                  placeholder="Enter your password"
                />
                <div className="flex justify-between flex-wrap gap-8 ">
                  <SubmitInput
                    label="submit"
                    isSubmitting={props.isSubmitting}
                  />

                  <p className="text-white md:text-xl max-w-[280px] w-[250px] whitespace-nowrap">
                    already have an account?
                    {/* Must be an (a) tag to reload to reset store when mount */}
                    <Link className="text-primary block" to="/log-in">
                      log-in
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
