import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function ForgetPassword() {
  let [errorMessage, setError] = useState(null);
  let [formDisplay, setformDisplay] = useState(true);
  const baseUrl = "https://ecommerce.routemisr.com";
  let navg = useNavigate();
  let validYup = Yup.object({
    email: Yup.string().required("email Required"),
  });
  let valid2Yup = Yup.object({
    resetCode: Yup.string().required("email Required"),
  });
  let initialValues = {
    email: "",
  };
  let forgetForm = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: forgetPasswordApi,
    validationSchema: validYup,
  });
  let verifyResetCodeForm = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: verifyResetCodeApi,
    validationSchema: valid2Yup,
  });
  function verifyResetCodeApi(data) {
    axios
      .post(`${baseUrl}/api/v1/auth/verifyResetCode`, data)
      .then((req) => {
        console.log(req.data.message);

        if (req.data.status == "Success") {
          navg("/updatePassword");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err.response.data.message);
      });
  }
  function forgetPasswordApi(data) {
    axios
      .post(`${baseUrl}/api/v1/auth/forgotPasswords`, data)
      .then((req) => {
        console.log(req.data.message);

        if (req.data.statusMsg == "success") {
          setformDisplay(false);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err.response.data.message);
      });
  }
  return (
    <>
      {formDisplay ? (
        <form
          onSubmit={forgetForm.handleSubmit}
          className="w-7/12 mx-auto mt-5"
        >
          <h2 className="mb-3">Forget Password :</h2>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              value={forgetForm.values.email}
              onChange={forgetForm.handleChange}
              onBlur={forgetForm.handleBlur}
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {forgetForm.touched.email && forgetForm.errors.email ? (
              <p className="text-red-600">{forgetForm.errors.email}</p>
            ) : (
              ""
            )}
          </div>

          <button
            disabled={!(forgetForm.isValid && forgetForm.dirty)}
            type="submit"
            className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active disabled:bg-active disabled:opacity-25"
          >
            send
          </button>
        </form>
      ) : (
        <form
          onSubmit={verifyResetCodeForm.handleSubmit}
          className="w-7/12 mx-auto mt-5"
        >
          <h2 className="mb-3">reset code</h2>

          <div className="mb-5">
            <label
              htmlFor="resetCode"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your resetCode
            </label>
            <input
              value={verifyResetCodeForm.values.resetCode}
              onChange={verifyResetCodeForm.handleChange}
              onBlur={verifyResetCodeForm.handleBlur}
              type="string"
              name="resetCode"
              id="resetCode"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {verifyResetCodeForm.touched.resetCode &&
            verifyResetCodeForm.errors.resetCode ? (
              <p className="text-red-600">
                {verifyResetCodeForm.errors.resetCode}
              </p>
            ) : (
              ""
            )}
          </div>

          <button
            disabled={
              !(verifyResetCodeForm.isValid && verifyResetCodeForm.dirty)
            }
            type="submit"
            className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active disabled:bg-active disabled:opacity-25"
          >
            verify code
          </button>
        </form>
      )}
    </>
  );
}
