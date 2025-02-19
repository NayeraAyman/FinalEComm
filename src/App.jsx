import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/Layout/Layout";
import Home from "./component/Home/Home";
import Product from "./component/Product/Product";
import Cart from "./component/Cart/Cart";
import Footer from "./component/Footer/Footer";
import Login from "./component/Login/Login";
import Notfound from "./component/Notfound/Notfound";
import Brands from "./component/Brands/Brands";
import Category from "./component/Category/Category";
import Logout from "./component/Logout/Logout";
import Signup from "./component/Signup/Signup";
import UpdatePassword from "./component/UpdatePassword/UpdatePassword";
import ForgetPassword from "./component/ForgetPassword/ForgetPassword";
import AuthContextProvider from "./Context/AuthContextProvider";
import ProtectedRouting from "./component/ProtectedRouting/ProtectedRouting";
import ProductDetails from "./component/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import CartContextProvider from "./Context/CartContextProvider";
import ShippingDetails from "./component/ShippingDetails/ShippingDetails";
import WishList from "./component/WishList/WishList";
import AllOrders from "./component/AllOrders/AllOrders";
import WishListContext from "./Context/WishListContext";
import CategoryItems from "./component/CategoryItems/CategoryItems";

export default function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRouting>
              <Home />
            </ProtectedRouting>
          ),
        },
        {
          path: "product",
          element: (
            <ProtectedRouting>
              <Product />
            </ProtectedRouting>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRouting>
              <Cart />
            </ProtectedRouting>
          ),
        },
        {
          path: "WishList",
          element: (
            <ProtectedRouting>
              <WishList />
            </ProtectedRouting>
          ),
        },
        {
          path: "AllOrders",
          element: (
            <ProtectedRouting>
              <AllOrders />
            </ProtectedRouting>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRouting>
              <Brands />
            </ProtectedRouting>
          ),
        },
        {
          path: "/category",
          element: (
            <ProtectedRouting>
              <Category />
            </ProtectedRouting>
          ),
        },
        {
          path: "category/:categoryId",
          element: (
            <ProtectedRouting>
              <CategoryItems />
            </ProtectedRouting>
          ),
        },
        {
          path: "ProductDetails/:id/:category",
          element: (
            <ProtectedRouting>
              <ProductDetails />
            </ProtectedRouting>
          ),
        },
        {
          path: "shippingDetails/:id",
          element: (
            <ProtectedRouting>
              <ShippingDetails />
            </ProtectedRouting>
          ),
        },
        { path: "footer", element: <Footer /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Signup /> },
        { path: "logout", element: <Logout /> },
        { path: "updatePassword", element: <UpdatePassword /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
  let client = new QueryClient();
  return (
    <>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools></ReactQueryDevtools>
        <WishListContext>
          <AuthContextProvider>
            <CartContextProvider>
              <RouterProvider router={router}></RouterProvider>
            </CartContextProvider>
          </AuthContextProvider>
        </WishListContext>
      </QueryClientProvider>
    </>
  );
}
