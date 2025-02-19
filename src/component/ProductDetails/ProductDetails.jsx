import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContextProvider";

export default function ProductDetails() {
  let { addUserCart, setNumsCartItems } = useContext(CartContext);
  let [relatedProduct, setRelatedProduct] = useState([]);
  let { id, category } = useParams();

  let { isLoading, data } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: function () {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    },
  });

  let product = data?.data?.data;
  function addCart(id) {
    addUserCart(id)
      .then((req) => {
        setNumsCartItems(req.data.numOfCartItems);
        toast.success(req.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  function getRelatedProduct(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProduct = data.data;
        let related = allProduct.filter(
          (product) => product.category.name == category
        );
        setRelatedProduct(related);
        console.log(related);

        console.log(allProduct);
      });
  }
  useEffect(() => {
    getRelatedProduct(category);
  }, [id, category]);
  return (
    <>
      <Toaster />
      {isLoading ? (
        <div className="bg-slate-200 flex items-center justify-center h-screen">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="w-10/12 mx-auto my-5">
          <div className="flex justify-between items-center">
            <div className="w-3/12">
              <Slider dots>
                {product?.images.map((image, i) => {
                  return (
                    <div key={i}>
                      <img src={image} className="w-full" alt="" />
                    </div>
                  );
                })}
              </Slider>
            </div>
            <div className="w-8/12">
              <h2>{product?.title}</h2>
              <p className="text-gray-500 my-5">{product?.description}</p>
              <div className="flex justify-between">
                <span>{product?.price}EGP</span>
                <span>
                  <i className="fa-solid fa-star pe-2 text-yellow-300"></i>
                  {product?.ratingsAverage}
                </span>
              </div>
              <button
                onClick={() => {
                  addCart(id);
                }}
                className="btn mt-5 "
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      )}
      {/* **********************relatedProduct******************* */}
      <div className="container w-10/12 mx-auto my-6">
        <div className="flex flex-wrap ">
          {relatedProduct.map((product) => {
            let { _id, title, imageCover, price, ratingsAverage, category } =
              product;
            let { name } = category;
            return (
              <div
                key={_id}
                className="lg:w-3/12 md:w-3/12 sm:w-6/12 w-full px-2 mb-3"
              >
                <div className="item overflow-hidden group hover:border border-active p-2">
                  <Link to={`/ProductDetails/${_id}/${product.category.name}`}>
                    <img
                      src={imageCover}
                      className="w-full object-cover"
                      alt={title}
                    />
                    <h3 className="text-active">{name}</h3>
                    <h2>{title.split(" ").slice(0, 2).join(" ")}</h2>
                    <div className="flex justify-between">
                      <span>{price}EGP</span>
                      <span>
                        <i className="fa-solid fa-star pe-2 text-yellow-300"></i>
                        {ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => addCart(_id)}
                    className="btn mt-3 translate-y-24 group-hover:translate-y-0 duration-500"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
