import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CategoryItems() {
  const [AllSubcategory, setAllSubcategory] = useState([]);
  const [loading, setLoading] = useState(false);
  let { category } = useParams();

  function getAllSpecificonCategory(categoryid) {
    if (!categoryid) return setLoading(true);
    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryid}/subcategories`
      )
      .then((res) => {
        console.log("Response Data:", res.data.data);
        setAllSubcategory(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }

  useEffect(() => {
    console.log("Category ID:", category);
    if (category) {
      getAllSpecificonCategory(category);
    }
  }, [category]);

  return (
    <div className="container w-8/12 mx-auto my-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      {loading ? (
        <p className="text-center w-full">Loading......</p>
      ) : AllSubcategory.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {AllSubcategory.map((subcategory) => (
            <div
              key={subcategory._id}
              className="w-2/12 border p-4 rounded-lg shadow-md"
            >
              <img
                src={subcategory.imageCover}
                alt={subcategory.name}
                className="w-full h-[300px]"
              />
              <h5 className="text-center mt-2 font-semibold">
                {subcategory.name}
              </h5>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center w-full">no Data</p>
      )}
    </div>
  );
}
