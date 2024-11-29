import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../Movie/MovieCard";
import { fetchShowingMovies, fetchGenreById } from "../../function/movie";


const ITEMS_PER_PAGE = 10;

export const NowShowing = () => {
  const [nowShowingMovies, setNowShowingMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const getNowShowingMovies = async () => {
      const result = await fetchShowingMovies();
      if (result.success) {
        const moviesWithGenres = await Promise.all(result.movies.map(async (movie) => {
          const genreResult = await fetchGenreById(movie.genre_id);
          if (genreResult.success) {
            return {
              title: movie.title,
              imageUrl: movie.potrait_poster_url,
              _id: movie.movie_id,
              genre: genreResult.genre.genre_name,
              ageLimit: movie.age_limit,
              type: movie.type,
              format: movie.formats.join(", ")
            };
          } else {
            console.error(genreResult.error);
            return movie;
          }
        }));
        setNowShowingMovies(moviesWithGenres);
      } else {
        console.error(result.error);
      }
    };


    getNowShowingMovies();
  }, []);

  const totalPages = Math.ceil(nowShowingMovies.length / ITEMS_PER_PAGE);

  const handleChangePage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/movies/${id}`); // Navigate to the MovieDetails page with the ID
  };

  const currentMovies = nowShowingMovies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6 py-6">
      <div className="flex w-full justify-center items-center my-4">
        <div className="badge badge-lg badge-primary h-12">
          <h1 className="text-2xl font-bold text-center uppercase px-6 py-2">
            Phim đang chiếu
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {currentMovies.map((movie) => (
          <div
            key={movie.id}
            className="flex items-center justify-center"
            onClick={() => handleCardClick(movie._id)}
          >
            <MovieCard {...movie} />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={() => handleChangePage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`btn btn-sm ${
            currentPage === 1 ? "btn-disabled" : "btn-outline"
          }`}
        >
          ‹
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handleChangePage(index + 1)}
            className={`btn btn-sm ${
              currentPage === index + 1 ? "btn-primary" : "btn-outline"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`btn btn-sm ${
            currentPage === totalPages ? "btn-disabled" : "btn-outline"
          }`}
        >
          ›
        </button>
      </div>
    </div>
  );
};
