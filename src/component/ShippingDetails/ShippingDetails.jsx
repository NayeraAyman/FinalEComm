import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useParams } from "react-router-dom";

export default function ShippingDetails() {
  let { id } = useParams();
  let headerOptions = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };
  let shippingFormik = useFormik({
    initialValues: {
      city: "",
      details: "",
      phone: "",
    },
    onSubmit: checkOutSession,
  });
  function checkOutSession(values) {
    let data = {
      shippingAddress: values,
    };
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:5173`,
        data,
        headerOptions
      )
      .then((req) => {
        window.open(req.data.session.url, "_self");
        console.log(req.data.session.url);
      });
  }
  return (
    <div className="w-7/12 mx-auto">
      <h1 className="mb-3 mt-3">ShippingDetails</h1>
      <form onSubmit={shippingFormik.handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="details"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your details
          </label>
          <input
            value={shippingFormik.values.details}
            onChange={shippingFormik.handleChange}
            onBlur={shippingFormik.handleBlur}
            type="text"
            name="details"
            id="details"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {shippingFormik.touched.details && shippingFormik.errors.details ? (
            <p className="text-red-600">{shippingFormik.errors.details}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your city
          </label>
          <input
            value={shippingFormik.values.city}
            onChange={shippingFormik.handleChange}
            onBlur={shippingFormik.handleBlur}
            type="text"
            name="city"
            id="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {shippingFormik.touched.city && shippingFormik.errors.city ? (
            <p className="text-red-600">{shippingFormik.errors.city}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your phone
          </label>
          <input
            value={shippingFormik.values.phone}
            onChange={shippingFormik.handleChange}
            onBlur={shippingFormik.handleBlur}
            type="tel"
            name="phone"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {shippingFormik.touched.phone && shippingFormik.errors.phone ? (
            <p className="text-red-600">{shippingFormik.errors.phone}</p>
          ) : (
            ""
          )}
        </div>
        <button type="submit" className="btn mb-3">
          Check Out
        </button>
      </form>
    </div>
  );
}
