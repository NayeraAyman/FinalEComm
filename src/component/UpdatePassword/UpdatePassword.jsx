import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function UpdatePassword() {
  let [errorMessage, setError] = useState(null);
  const baseUrl = "https://ecommerce.routemisr.com";
  let navg = useNavigate();
  let validYup = Yup.object({
    email: Yup.string().required("email Required").email("enter valid email"),
    newPassword: Yup.string()
      .required("newpassword Required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "newpassword invalid"
      ),
  });
  let initialValues = {
    email: "",
    newPassword: "",
  };
  let loginForm = useFormik({
    initialValues,
    onSubmit: updatePasswordApi,
    validationSchema: validYup,
  });
  async function updatePasswordApi(data) {
    axios
      .put(`${baseUrl}/api/v1/auth/resetPassword`, data)
      .then((req) => {
        console.log(req.data.message);

        if (req.data.token) {
          navg("/login");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err.response.data.message);
      });
  }
  return (
    <>
      {errorMessage ? (
        <div
          className="p-4 w-7/12 mx-auto mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {errorMessage}
        </div>
      ) : (
        ""
      )}

      <form onSubmit={loginForm.handleSubmit} className="w-7/12 mx-auto mt-5">
        <h2 className="mb-3">Update Password :</h2>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            value={loginForm.values.email}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {loginForm.touched.email && loginForm.errors.email ? (
            <p className="text-red-600">{loginForm.errors.email}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            password
          </label>
          <input
            value={loginForm.values.newPassword}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            type="password"
            name="newPassword"
            id="newPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {loginForm.touched.newPassword && loginForm.errors.newPassword ? (
            <p className="text-red-600">{loginForm.errors.newPassword}</p>
          ) : (
            ""
          )}
        </div>
        <button
          disabled={!(loginForm.isValid && loginForm.dirty)}
          type="submit"
          className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active disabled:bg-active disabled:opacity-25"
        >
          Update Password
        </button>
      </form>
    </>
  );
}
