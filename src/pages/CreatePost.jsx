import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubmitInput from "../components/Form/SubmitInput";
import TextArea from "../components/Form/TextAreaInput";
import CustomInput from "../components/Inputs/CustomInput";
import CreatePostsNotification from "../components/Notifications/CreatePostsNotification";
import HandleStatus from "../components/Notifications/HandleStatus";
import HeaderTitle from "../components/Posts/HeaderTitle";
import { CreatePostSchema } from "../components/Schemas/SchemasValidation";
import { InsertPost } from "../redux/Slice/PostSlice";
import { HeightContainer } from "../util/StyleSheets";
const CreatePost = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.PostSlice);
  // this to hide the component after a while
  const [HideComponent, setHideComponent] = useState(false);
  useEffect(() => {
    // this to handle the create post notification
    // to reset the state and show the component on each post
    if (selector.createStatus === "pending") {
      setHideComponent(false);
    }
  }, [HideComponent, selector.createStatus]);
  setTimeout(() => {
    // a timeout to hide any component after a while
    // this to check the pending status first,
    // and set the state for just (fulfielled or rejected) conditions
    if (selector.createStatus !== "pending") {
      setHideComponent(true);
    }
  }, [3000]);
  // fix the code and whene the user add a post should be show the message again
  const initialValues = {
    title: "",
    description: "",
    tags: "",
  };
  const HandleSubmit = (values, action) => {
    const HandleTags = values.tags.split(",").map((ele) => ele.trim());
    const formattedValues = { ...values, tags: HandleTags };
    dispatch(InsertPost(formattedValues));
    action.resetForm();
  };
  // this will handle the status of the createPostComponent
  // whatever the post created successfully or not
  const CPNotificaion = () => {
    if (selector.createStatus === "fulfilled") {
      return <CreatePostsNotification status={true} />;
    } else if (selector.createStatus === "rejected") {
      return <CreatePostsNotification status={false} />;
    }
  };
  return (
    <>
      {!HideComponent && CPNotificaion()}
      <HeaderTitle label="Create Post" />
      <div className="h-full w-full flex flex-col justify-center">
        <Formik
          initialValues={initialValues}
          validationSchema={CreatePostSchema}
          onSubmit={HandleSubmit}
        >
          {(props) => (
            <Form className={`${HeightContainer} md:h-full flex flex-col`}>
              <CustomInput
                name="title"
                type="text"
                placeholder="Enter a title"
              />
              <TextArea
                name="description"
                type="text"
                placeholder="Enter a description"
              />
              <CustomInput
                name="tags"
                type="text"
                placeholder="Enter a tags (separated by commas)"
              />
              <SubmitInput
                extraClasses="w-full md:w-fit mb-10 md:mb-0"
                label="create"
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreatePost;
