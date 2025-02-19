import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContextProvider";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getUserCart,
    deleteUserCart,
    setNumsCartItems,
    clearUserCart,
    updateCartItemCount,
  } = useContext(CartContext);
  let [cartData, setCartData] = useState(null);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    getCartData();
  }, []);
  function getCartData() {
    setLoading(true);
    getUserCart()
      .then((req) => {
        console.log(req.data.data);
        setCartData(req.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  function removeItem(id) {
    deleteUserCart(id)
      .then((Req) => {
        console.log(Req);
        setNumsCartItems(Req.data.numOfCartItems);
        setCartData(Req.data.data);
        toast.success("Product Deleted");
      })
      .catch((err) => {});
  }
  function updateCount(id, count) {
    document.getElementById(id).innerHTML =
      ' <i class="fa-solid fa-spinner fa-spin text-active"></i>  ';
    updateCartItemCount(id, count).then((req) => {
      console.log(req);
      setCartData(req.data.data);
      document.getElementById(id).innerHTML = count;
    });
  }
  function clearItems() {
    clearUserCart().then((req) => {
      console.log(req);
      if (req.data.message == "success") {
        setCartData(null);
        setNumsCartItems(null);
      }
    });
  }
  if (loading) {
    return (
      <div className="bg-slate-200 flex items-center justify-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <>
      <Toaster />
      {cartData?.products.length > 0 ? (
        <div className="w-11/12 mx-auto my-5">
          <div className="bg-gray-200">
            <h1 className="text-2xl">Shop Cart</h1>
            <div className="flex justify-between">
              <h2 className="text-2xl text-active">
                Total Cart Price : {cartData.totalCartPrice} EGP
              </h2>
              <button
                onClick={clearItems}
                className="bg-red-600 text-white px-3 py-2 rounded me-8"
              >
                Clear Cart
              </button>
            </div>

            <div className="divide-y-2  divide-gray-300">
              {cartData.products.map((item) => {
                return (
                  <div key={item._id} className="flex items-center p-3">
                    <div className="w-10/12">
                      <div className="flex justify-around">
                        <div className="w-1/12">
                          <img
                            src={item.product.imageCover}
                            className="w-full"
                            alt=""
                          />
                        </div>
                        <div className="w-10/12">
                          <h2>{item.product.title}</h2>
                          <h2 className="text-active my-3">
                            Price : {item.price}EGP
                          </h2>
                          <button
                            onClick={() => {
                              removeItem(item.product._id);
                            }}
                            className="border border-red-500 px-5 py-2 rounded text-red-500 hover:bg-red-500 hover:text-white"
                          >
                            <i className="fa-solid fa-trash-can mr-2"></i>Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="w-2/12">
                      <i
                        onClick={() => {
                          updateCount(item.product._id, item.count + 1);
                        }}
                        className="fa-solid cursor-pointer rounded  border border-active p-2 fa-plus "
                      ></i>

                      <span id={item.product._id} className="mx-2">
                        {item.count}
                      </span>

                      <i
                        onClick={() => {
                          updateCount(item.product._id, item.count - 1);
                        }}
                        className="fa-solid cursor-pointer rounded border border-active p-2 fa-minus"
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link
              to={"/shippingDetails/" + cartData._id}
              className="btn text-center block"
            >
              Pay <i className="fa-brands fa-cc-visa"></i>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-red-400 text-center">No Data</div>
      )}
    </>
  );
}
