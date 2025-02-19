import React from "react";
import img1 from "../../assets/images/Amazon_Pay_logo.svg.png";
import img2 from "../../assets/images/MasterCard_Logo.svg.png";
import img3 from "../../assets/images/Paypal.png";
import img4 from "../../assets/images/App-Store.png";
import img5 from "../../assets/images/google-play-6647242_1280.webp";
export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 text-start">
      <div className=" mx-auto px-8">
        <h2 className="text-lg font-semibold">Get the FreshCart app</h2>
        <p className="text-gray-600 text-sm">
          We will send you a link, open it on your phone to download the app.
        </p>
        <div className="mt-4 flex justify-around">
          <input
            type="email"
            placeholder="Email .."
            className="border w-9/12 border-gray-300 px-4 py-2 rounded focus:outline-none"
          />
          <button className="bg-green-500 w-2/12 text-white px-4 py-2 rounded hover:bg-green-600">
            Share App Link
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="mt-6 flex justify-start items-center space-x-6">
            <span className="text-gray-600">Payment Partners</span>
            <img src={img1} alt="Amazon Pay" className="h-6" />
            <img src={img2} alt="Mastercard" className="h-6" />
            <img src={img3} alt="PayPal" className="h-6" />
          </div>
          <div className="mt-6 flex items-center">
            <p className="text-gray-600 me-3">Get deliveries with FreshCart</p>
            <div className="mt-2 flex justify-center space-x-4">
              <img src={img4} alt="App Store" className="h-11" />
              <img src={img5} alt="Google Play" className="h-10" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
