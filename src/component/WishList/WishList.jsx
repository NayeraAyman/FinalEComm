import React, { useContext } from "react";
import { WishlistContext } from "../../Context/WishListContext";

export default function WishList() {
  let { wishList, removeFromWishList } = useContext(WishlistContext);
  return (
    <>
      <div className="container w-10/12 mx-auto my-6">
        <h2 className="text-active font-bold text-center">
          Favourits List.....
        </h2>
        <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4 ">
          {wishList.length === 0 && <p>no favourit items</p>}
          {wishList.map((item) => (
            <div key={item.id}>
              <img src={item.imageCover} alt="" />
              <span>{item.category.name}</span>
              <div className="flex justify-between items-center">
                <span>{item.price}EGP</span>
                <span>
                  {item.ratingsAverage}{" "}
                  <i className="fa-solid fa-star text-yellow-300"></i>
                </span>
              </div>
              <button
                onClick={() => removeFromWishList(item.id)}
                className="btn font-thin mt-3"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
