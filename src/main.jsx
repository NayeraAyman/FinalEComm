import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/flowbite/dist/flowbite.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import App from "./App.jsx";
import WishlistContext from "./Context/WishListContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
