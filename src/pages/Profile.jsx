import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubmitInput from "../components/Form/SubmitInput";
import CustomInput from "../components/Inputs/CustomInput";
import HeaderTitle from "../components/Posts/HeaderTitle";
import EditUserNotification from "../components/Profile/EditUserNotification";
import { EditUserSchema } from "../components/Schemas/SchemasValidation";
import { EditUser } from "../redux/Slice/usersSlice";
const Profile = () => {
  const isUserEdit = useSelector((state) => state.usersSlice.isUserEdit);
  const [ShowNotification, setShowNotification] = useState(true);
  const dispatch = useDispatch();
  const [LSuserData, setLSuserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const username = LSuserData.email.split("@")[0];
  const email = LSuserData.email;
  const name = LSuserData.name;
  const password = LSuserData.password;
  const initialValues = {
    email,
    name,
    password,
  };
  // const userData = JSON.parse(localStorage.getItem("userData"));
  const handleSubmit = (values, action) => {
    // this to check if the values is not equal to initvalues before edit the userdata
    if (
      initialValues.name !== values.name ||
      initialValues.email !== values.name ||
      initialValues.password !== values.password
    ) {
      // this to understan  d what should be updated
      const formattedData = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      const newValues = {
        ...LSuserData,
        ...formattedData,
      };
      localStorage.setItem("userData", JSON.stringify(newValues));
      // this will update the state after the localstorage get updated
      setLSuserData(JSON.parse(localStorage.getItem("userData")));
      dispatch(EditUser(newValues));
    }
  };
  useEffect(() => {
    if (isUserEdit !== "pending") {
      setTimeout(() => {
        setShowNotification(false);
      }, [3000]);
    }
  }, [isUserEdit]);
  return (
    <>
      {ShowNotification &&
        (isUserEdit === "fulfilled" ? (
          <EditUserNotification status="true" />
        ) : isUserEdit === "rejected" ? (
          <EditUserNotification status={false} />
        ) : null)}
      <div className="w-full flex flex-col items-center md:items-start">
        <HeaderTitle label="Profile" />
        <div className="w-full">
          <div className="mx-auto text-2xl w-16 h-16 md:w-16 md:h-16 text-black cursor-pointer rounded-full bg-main flex justify-center items-center md:text-3xl flex-col uppercase">
            {username[0]}
          </div>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={EditUserSchema}
              onSubmit={handleSubmit}
            >
              {(props) => (
                <Form>
                  <div className="mt-10">
                    <div className="mb-4">
                      <span className="uppercase block mb-3">name:</span>
                      <CustomInput
                        name="name"
                        type="text"
                        placeholder="Enter a new name"
                      />
                    </div>
                    <div className="mb-4">
                      <span className="uppercase block mb-3">email:</span>
                      <CustomInput
                        name="email"
                        type="text"
                        placeholder="Enter a new email"
                      />
                    </div>
                    <div className="mb-4">
                      <span className="uppercase block mb-3">password:</span>
                      <CustomInput
                        name="password"
                        type="password"
                        placeholder="Enter a new password"
                      />
                    </div>
                    <SubmitInput label="save" />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
