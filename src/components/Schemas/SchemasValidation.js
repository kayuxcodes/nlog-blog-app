import * as yup from "yup";
const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
export const SingupSchema = yup.object().shape({
  name: yup.string().required("Reqiured"),
  email: yup
    .string()
    .matches(emailRegex, { message: "email must be a valid email" })
    .required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRegex, { message: "Invalid Password" })
    .required("Required"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});
export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(emailRegex, { message: "Please Enter a valid email" })
    .required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRegex, { message: "Invalid Password" })
    .required("Required"),
});
export const CreatePostSchema = yup.object().shape({
  title: yup.string().required("Required"),
  description: yup.string().required("Required, since this the content."),
  tags: yup.string().optional(),
});
export const EditUserSchema = yup.object().shape({
  name: yup.string().required("Reqiured"),
  email: yup
    .string()
    .matches(emailRegex, { message: "email must be a valid email" })
    .required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRegex, { message: "Invalid Password" })
    .required("Required"),
});
