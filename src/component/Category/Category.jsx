import React from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../Hooks/useApi";

export default function Category() {
  const { data, isLoading } = useApi("categories");
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="bg-slate-200 flex items-center justify-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="container w-8/12 mx-auto my-6">
      <div className="flex flex-wrap gap-8">
        {data?.data?.data?.map((category) => (
          <div
            key={category._id}
            className="w-2/12 cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => navigate(`/category/${category._id}`)}
          >
            <img
              src={category.image}
              className="h-48 w-full object-cover rounded object-top"
              alt={category.name}
            />
            <h5 className="text-center mt-2 font-semibold">{category.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}
