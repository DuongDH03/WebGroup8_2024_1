import React, { useEffect, useState } from "react";
import { fetchMovieByName, fetchMovieById } from "../../function/movie";
import MovieSchedule from "./MovieSchedule";
import "./MovieDetails.css";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      const result = await fetchMovieById(7);
      if (result.success) {
        setMovie(result.movie);
      } else {
        console.error(result.error);
      }
    };

    getMovie();
  }, []);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-page container bg-base-100">
      <div
        className="top"
        style={{
          backgroundImage: `url(${movie.wideposter})`,
        }}
      >
        <div className="overlay md:py-12 p-4">
          <div className="md:px-24">
            <div className="banner">
              <div className="left flex md:flex-row flex-col">
                <div
                  className="movie-poster md:basis-1/3"
                >
                  <img src={movie.portraitposter} alt={movie.title} className="h-full"></img>
                </div>
                <div className="movie-details min-h-full h-full md:basis-2/3">
                  <p className="title be-vietnam-pro-black text-primary">
                    {movie.title}
                  </p>
                  <div className="movie-formats">
                    <p className="formats">
                      { movie.ageLimit && <span class="badge badge-lg badge-primary mr-1">{movie.ageLimit}</span> }
                      { movie.type && <span class="badge badge-lg badge-neutral mr-1">{movie.type}</span> }
                      { movie.formats.map((format, index) => {
                        return (
                          <span
                            className="badge badge-outline badge-lg mr-1"
                            key={index}
                          >
                            {format}{" "}
                          </span>
                        );
                      })}
                    </p>
                  </div>
                  <div className="movie-info flex flex-col">
                    <p className="about italic">{movie.about}</p>
                    <p className="crew">
                      Đạo diễn:{" "}
                      {movie.crew.map((member, index) => (
                        <span key={member._id}>
                          {member.name}
                          {index < movie.crew.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                    <p className="cast">
                      Diễn viên:{" "}
                      {movie.cast.map((actor, index) => (
                        <span key={actor._id}>
                          {actor.name}
                          {index < movie.cast.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                    <p className="duration">Thời lượng: {movie.duration}</p>
                    <p className="genre">Thể loại: {movie.genre}</p>
                    <p className="release-date">
                      Khởi chiếu: {movie.releasedate}
                    </p>
                  </div>
                  <a href="#movie-schedule" className="sm:max-sm:flex sm:max-sm:items-center sm:max-sm:justify-center">
                    <button className="btn btn-lg btn-primary text-white md:px-10 px-40 h-12 min-h-12 ">
                      Đặt vé
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="trailer pt-12">
              <iframe
                width="640"
                height="360"
                src={movie.trailer_url}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div id="movie-schedule">
        <MovieSchedule />
      </div>
    </div>
  );
};

export default MovieDetails;
