import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function Signup() {
  let [errorMessage, setError] = useState(null);
  const baseUrl = "https://ecommerce.routemisr.com";
  let navg = useNavigate();
  let validYup = Yup.object({
    name: Yup.string()
      .required("name Required")
      .min(3, "min char 3")
      .max(20, "max char 20"),
    email: Yup.string().required("email Required").email("enter valid email"),
    password: Yup.string()
      .required("password Required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "password invalid"
      ),
    rePassword: Yup.string()
      .required("rePassword Required")
      .oneOf([Yup.ref("password")], "rePassword Not Match Password"),
    phone: Yup.string()
      .required("phone Required")
      .matches(/^(20)?01[1250][0-9]{8}$/, "enter valid phone"),
  });
  let initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  let registerForm = useFormik({
    initialValues,
    onSubmit: registerApi,
    validationSchema: validYup,
  });
  async function registerApi(data) {
    axios
      .post(`${baseUrl}/api/v1/auth/signup`, data)
      .then((req) => {
        console.log(req.data.message);

        if (req.data.message == "success") {
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

      <form
        onSubmit={registerForm.handleSubmit}
        className="w-7/12 mx-auto mt-5"
      >
        <h2 className="mb-3">Register Now :</h2>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            name
          </label>
          <input
            value={registerForm.values.name}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {registerForm.touched.name && registerForm.errors.name ? (
            <p className="text-red-600">{registerForm.errors.name}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            value={registerForm.values.email}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {registerForm.touched.email && registerForm.errors.email ? (
            <p className="text-red-600">{registerForm.errors.email}</p>
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
            value={registerForm.values.password}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {registerForm.touched.password && registerForm.errors.password ? (
            <p className="text-red-600">{registerForm.errors.password}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="rePassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            rePassword
          </label>
          <input
            value={registerForm.values.rePassword}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            type="password"
            name="rePassword"
            id="rePassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {registerForm.touched.rePassword && registerForm.errors.rePassword ? (
            <p className="text-red-600">{registerForm.errors.rePassword}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            phone
          </label>
          <input
            value={registerForm.values.phone}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            type="tel"
            name="phone"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {registerForm.touched.phone && registerForm.errors.phone ? (
            <p className="text-red-600">{registerForm.errors.phone}</p>
          ) : (
            ""
          )}
        </div>

        <button
          disabled={!(registerForm.isValid && registerForm.dirty)}
          type="submit"
          className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active disabled:bg-active disabled:opacity-25"
        >
          Submit
        </button>
      </form>
    </>
  );
}
