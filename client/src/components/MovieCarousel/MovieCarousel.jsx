import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { fetchUpcomingMovies, fetchGenreById } from "../../function/movie";

import MovieCard from "../Movie/MovieCard";

const MovieCarousel = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const getUpcomingMovies = async () => {
      const result = await fetchUpcomingMovies();
      if (result.success) {
        const moviesWithGenres = await Promise.all(result.movies.map(async (movie) => {
          const genreResult = await fetchGenreById(movie.genre_id);
          if (genreResult.success) {
            return {
              title: movie.title,
              imageUrl: movie.potrait_poster_url,
              _id: movie.movie_id,
              genre: genreResult.genre.genre_name,
            };
          } else {
            console.error(genreResult.error);
            return movie;
          }
        }));
        setUpcomingMovies(moviesWithGenres);
      } else {
        console.error(result.error);
      }
    };

    getUpcomingMovies();
  }, []);

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
          320: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {upcomingMovies.map((movie) => (
          <SwiperSlide key={movie._id} className="flex items-center justify-center mb-12">
            <MovieCard {...movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieCarousel;
