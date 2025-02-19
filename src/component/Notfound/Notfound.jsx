import React from "react";
import img1 from "../../assets/images/error.svg";
export default function Notfound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img src={img1} alt="" />
      <p className="text-xl text-gray-700 mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Go Home
      </a>
    </div>
  );
}
