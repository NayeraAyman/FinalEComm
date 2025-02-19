import axios from "axios";
import React, { useEffect, useState } from "react";

export default function RecentProduct() {
  let [recentProduct, setRecentProduct] = useState([]);
  const getRecentProducts = () => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((data) => {
        console.log(data?.data);
        setRecentProduct(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getRecentProducts();
  }, []);
  return (
    <>
      <div className="container p-10">
        <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {recentProduct.map((product) => (
            <div className="product shadow-xl p-2">
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full"
              />
              <h2>{product.title.split(" ").slice(0, 2).join("")}</h2>
              <span className="text-active font-bold">
                {product.category.name}
              </span>
              <div className="flex justify-between items-center">
                <span>{product.price}EGP</span>
                <span>
                  {product.ratingsAverage}{" "}
                  <i className="fa-solid fa-star text-yellow-300"></i>
                </span>
              </div>
              <button className="btn">Add To Cart</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
