import React from "react";
import { useNavigate } from 'react-router-dom';
import "./MovieCard.css";

const MovieCard = (data) => {
  const navigate = useNavigate();
  const { title, imageUrl, _id, genre, ageLimit, type, format } = data;

  return (
    <div
      className="card card-compact bg-base-100 shadow-xl md:w-64 w-[264px] m-2"
      onClick={() => {
        navigate(`/movies/${_id}`);
      }}
    >
    <figure>
      <img
        src={imageUrl}
        alt={title}
        className="w-[264px] h-[250px] md:h-[350px] object-cover transition-transform duration-300 hover:scale-105"
      />
    </figure>
    <div className="card-body">
      <div className="flex flex-row justify-start gap-2">
        { ageLimit && <div className="badge badge-lg badge-primary text-xs tracking-[-0.125em]">{ageLimit}</div> }
        { type && <div className="badge badge-lg badge-neutral text-xs tracking-[-0.125em] w-fit">{type}</div> }
        { format && <div className="badge badge-lg badge-outline text-xs tracking-[-0.125em]">{format}</div> }
      </div>
      <h2
        className="card-title text-lg text-primary font-bold truncate"
        title={title}
      >
        {title}
      </h2>
      <p className="text-sm truncate">Thể loại: <span className="italic text-primary">{genre}</span></p>
    </div>
  </div>
  );
};

export default MovieCard;
