import React, { useContext, useState } from "react";
import axios from "axios";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";

import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContextProvider";
import toast, { Toaster } from "react-hot-toast";
import Product from "../Product/Product";
export default function Home() {
  let [page, setPage] = useState("1");
  let { addUserCart, setNumsCartItems } = useContext(CartContext);
  function getAllProducts() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?limit=10&page=${page}`
    );
  }
  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", page],
    queryFn: getAllProducts,
  });
  console.log(data?.data?.metadata?.numberOfPages);

  if (isError) {
    return <h2 className="text-red-600">{error.response.data.message}</h2>;
  }
  return (
    <>
      <Toaster />

      {isLoading ? (
        <div className="bg-slate-200 flex items-center justify-center h-screen">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="">
          <MainSlider />
          <CategorySlider />
          <Product />
        </div>
      )}
    </>
  );
}
