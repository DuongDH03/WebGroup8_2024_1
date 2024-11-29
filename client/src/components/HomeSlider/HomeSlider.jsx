import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { fetchFeaturedMovies } from "../../function/movie";

export const HomeSlider = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);

  useEffect(() => {
    const getFeaturedMovies = async () => {
      const result = await fetchFeaturedMovies();
      if (result.success) {
        setFeaturedMovies(result.movies.map(movie => ({
          title: movie.title,
          wide_poster_url: movie.wide_poster_url,
          movie_id: movie.movie_id,
        })));
        console.log(result);
      } else {
        console.error(result.error);
      }
    };

    getFeaturedMovies();
  }, []);

  return (
    <Swiper
      cssMode={true}
      loop={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      mousewheel={true}
      keyboard={true}
      modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
      className="mySwiper"
    >
      {featuredMovies.map((movie) => (
        <SwiperSlide key={movie.movie_id}>
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[600px]">
            <a href={`/movies/${movie.movie_id}`}>
              <img
                src={movie.wide_poster_url}
                alt={movie.title || "Featured Movie"}
                className="w-full h-full object-cover"
              />
            </a>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
