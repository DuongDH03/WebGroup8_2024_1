import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Import navigation styles
import { Swiper, SwiperSlide } from "swiper/react";
import {  Autoplay, Pagination, Navigation } from "swiper/modules"; // Import Navigation

import MovieCard from "../Movie/MovieCard";

const MovieCarousel = () => {
  const Movies = [
      {
        title: "MUFASA: THE LION KING: VUA SƯ TỬ",
        imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-22.jpg",
        _id: "",
        genre: "Family"
      },
      {
        title: "THE LORD OF THE RINGS: THE WAR OF THE ROHIRRIM",
        imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-23.jpg",
        _id: "",
        genre: "Action"
      },
      {
        title: "KRAVEN THE HUNTER: THỢ SĂN THỦ LĨNH",
        imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-17.jpg",
        _id: "",
        genre: "Action"
      },
      {
        title: "MOANA 2: HÀNH TRÌNH CỦA MOANA",
        imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/10/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-2.png",
        _id: "",
        genre: "Animation"
      },
      {
        title: "WOODWALKERS: NGƯỜI HÓA THÚ",
        imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/10/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-33.jpg",
        _id: "",
        genre: "Fantasy"
      },
      {
        title: "THÁM TỬ KIÊN: KỲ ÁN KHÔNG ĐẦU",
        imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/09/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-5.jpg",
        _id: "",
        genre: "Thriller"
      },
      {
        title: "SONIC THE HEDGEHOG: NHÍM SONIC 3",
        imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/08/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-9.png",
        _id: "",
        genre: "Action"
      },
      {
        title: "CÔNG TỬ BẠC LIÊU",
        imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-19.jpg",
        _id: "",
        genre: "Drama"
      },
      {
        title: "NHÀ GIA TIÊN",
        imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp.png",
        _id: "",
        genre: "Mystery"
      },
      {
        title: "OPERATION UNDEAD: CHIẾN ĐỊA TỬ THI",
        imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-21.jpg",
        _id: "",
        genre: "Horror"
      }
  ];

  return (
    <div className="sliderout space-y-6  py-6">
      <div className="flex w-full justify-center items-center my-4">
        <div className="badge badge-lg badge-primary h-12">
          <h1 className="text-2xl font-bold text-center uppercase px-6 py-2">
            Phim sắp chiếu
          </h1>
        </div>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={5}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          "@1.50": {
            slidesPerView: 5,
            spaceBetween: 5,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {Movies.map((movie) => (
          <SwiperSlide key={movie._id} className="mb-12">
            <MovieCard {...movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieCarousel;
