import React from "react";
import useApi from "../../Hooks/useApi";

export default function Brands() {
  let { data, isLoading } = useApi("brands");
  if (isLoading) {
    return (
      <div className="bg-slate-200 flex items-center justify-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }
  return (
      <div className="container w-10/12 mx-auto my-6">
        <div className="flex flex-wrap">
          {data?.data?.data?.map((brand) => {
            return (
              <div key={brand._id} className="w-3/12">
                <img
                  src={brand.image}
                  className="h-48 w-full object-cover object-top"
                  alt=""
                />
                <h5 className="text-center">{brand.name}</h5>
              </div>
            );
          })}
        </div>
      </div>
    
  );
}
