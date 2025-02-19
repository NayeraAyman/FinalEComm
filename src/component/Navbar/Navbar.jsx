import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logoImg from "../../assets/images/freshcart-logo.svg";
import { AuthContext } from "../../Context/AuthContextProvider";
import { CartContext } from "../../Context/CartContextProvider";
export default function Navbar() {
  let { token, setToken } = useContext(AuthContext);
  let { numsCartItems } = useContext(CartContext);
  let navg = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navg("/login");
  }

  return (
    <>
      <nav className="bg-white border-gray-200 shadow ">
        <div className="max-w-screen-xl flex flex-nowrap items-center mx-10 p-4">
          <Link
            to="/"
            className="flex items-center ms-9 space-x-3 rtl:space-x-reverse"
          >
            <img src={logoImg} className="h-8" alt="Flowbite Logo" />
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex ms-auto items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className="hidden w-full mx-auto md:flex justify-between "
            id="navbar-default"
          >
            {token ? (
              <ul className="font-medium  inline-flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink
                    to=""
                    className={(x) =>
                      x.isActive
                        ? "block py-2 px-3 text-active"
                        : "block py-2 px-3"
                    }
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/product"
                    className={(x) =>
                      x.isActive
                        ? "block py-2 px-3 text-active"
                        : "block py-2 px-3"
                    }
                    aria-current="page"
                  >
                    Product
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/brands"
                    className={(x) =>
                      x.isActive
                        ? "block py-2 px-3 text-active"
                        : "block py-2 px-3"
                    }
                    aria-current="page"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/category"
                    className={(x) =>
                      x.isActive
                        ? "block py-2 px-3 text-active"
                        : "block py-2 px-3"
                    }
                    aria-current="page"
                  >
                    Category
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cart"
                    className={(x) =>
                      x.isActive
                        ? "block py-2 px-3 text-active"
                        : "block py-2 px-3"
                    }
                    aria-current="page"
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/WishList"
                    className={(x) =>
                      x.isActive
                        ? "block py-2 px-3 text-active"
                        : "block py-2 px-3"
                    }
                    aria-current="page"
                  >
                    WishList
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/AllOrders"
                    className={(x) =>
                      x.isActive
                        ? "block py-2 px-3 text-active"
                        : "block py-2 px-3"
                    }
                    aria-current="page"
                  >
                    AllOrders
                  </NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="font-medium ms-auto w-1/2 justify-end items-center space-x-4 inline-flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="https://www.facebook.com"
                  target="blank"
                  className={(x) =>
                    x.isActive
                      ? "block py-2 px-3 text-active"
                      : "block py-2 px-3"
                  }
                  aria-current="page"
                >
                  <i class="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="blank"
                  className={(x) =>
                    x.isActive
                      ? "block py-2 px-3 text-active"
                      : "block py-2 px-3"
                  }
                  aria-current="page"
                >
                  <i class="fa-brands fa-twitter"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="blank"
                  className={(x) =>
                    x.isActive
                      ? "block py-2 px-3 text-active"
                      : "block py-2 px-3"
                  }
                  aria-current="page"
                >
                  <i class="fa-brands fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="blank"
                  className={(x) =>
                    x.isActive
                      ? "block py-2 px-3 text-active"
                      : "block py-2 px-3"
                  }
                  aria-current="page"
                >
                  <i class="fa-brands fa-instagram"></i>
                </a>
              </li>
            </ul>
            <ul className="font-medium ms-3 me-4  justify-end  inline-flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {token ? (
                <>
                  <li className="flex items-center relative text-active">
                    <i className="fa-solid fa-cart-shopping ms-6 me-6"></i>
                    <span className="absolute  rounded-full w-5 h-5 text-active -top-1 end-3 flex items-center justify-center">
                      {numsCartItems}
                    </span>
                  </li>
                  <li onClick={logout}>
                    <NavLink
                      to="/logout"
                      className={(x) =>
                        x.isActive
                          ? "block py-2 px-3 text-active"
                          : "block py-2 px-3"
                      }
                      aria-current="page"
                    >
                      Logout
                    </NavLink>
                  </li>{" "}
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className={(x) =>
                        x.isActive
                          ? "block py-2 px-3 text-active"
                          : "block py-2 px-3"
                      }
                      aria-current="page"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className={(x) =>
                        x.isActive
                          ? "block py-2 px-3 text-active"
                          : "block py-2 px-3"
                      }
                      aria-current="page"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
