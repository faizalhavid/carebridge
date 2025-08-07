import * as yup from "yup";

export const userManagementSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    fullName: yup.string().required("Name is required"),
    address: yup.string().required("Address is required"),
    password: yup.string().required("Password is required"),
});
