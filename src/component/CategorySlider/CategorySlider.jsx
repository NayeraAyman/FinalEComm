import React from "react";
import Slider from "react-slick";
import useApi from "../../Hooks/useApi";

export default function CategorySlider() {
  let { data } = useApi("categories");
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: false,
    autoplay: true,
  };
  return (
    <>
      <div className="container w-10/12 mx-auto my-6">
        <div className="my-5">
          <Slider {...settings}>
            {data?.data?.data?.map((category) => {
              return (
                <div key={category._id}>
                  <img
                    src={category.image}
                    className="h-48 w-full object-cover object-top"
                    alt=""
                  />
                  <h5 className="text-center">{category.name}</h5>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}
