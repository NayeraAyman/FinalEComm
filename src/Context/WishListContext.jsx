import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();
export default function WishListContext({ children }) {
  const [wishList, setWishList] = useState([]);
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  console.log("Stored Token:", localStorage.getItem("token"));

  const getWishList = async () => {
    try {
      const { data } = axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { headers: headers }
      );
      setWishList(data?.data || []);
      localStorage.setItem("wishlist", JSON.stringify(data?.data || []));
    } catch (error) {
      console.log(error);
    }
  };
  const addToWishList = async (product) => {
    try {
      await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: product.id },
        { headers: headers }
      );
      let updatedList = [...wishList, product];
      setWishList(updatedList);
      localStorage.setItem("wishlist", JSON.stringify(updatedList));
    } catch (err) {
      console.log(err);
    }
  };
  const removeFromWishList = async (productId) => {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: headers }
      );
      let filteredProduct = wishList.filter((item) => item.id !== productId);
      setWishList(filteredProduct);
      localStorage.setItem("wishlist", JSON.stringify(filteredProduct));
    } catch (err) {
      console.log(err);
    }
  };
  const isInWishList = (productId) => {
    return wishList.some((item) => item.id == productId);
  };
  useEffect(() => {
    const storedFav = localStorage.getItem("wishlist");
    if (storedFav) {
      setWishList(JSON.parse(storedFav));
    } else {
      getWishList();
    }
  }, []);
  return (
    <WishlistContext.Provider
      value={{ wishList, addToWishList, removeFromWishList, isInWishList }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
