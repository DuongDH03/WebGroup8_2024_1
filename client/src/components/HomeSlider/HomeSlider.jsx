import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";

export const HomeSlider = () => {
  const banners = [
    {
      imgUrl:
        "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight1069ldapp-19.jpg",
    },
    {
      imgUrl:
        "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight1069ldapp-18.jpg",
    },
    {
      imgUrl:
        "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight1069ldapp-8.jpg",
    },
    {
      imgUrl:
        "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight1069ldapp-2.jpg",
    },
  ];

  return (
    <Swiper
      cssMode={true}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className="mySwiper"
    >
      {banners.map((banner, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[600px]">
              <a href="/movies/1">
                <img
                  src={banner.imgUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </a>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
