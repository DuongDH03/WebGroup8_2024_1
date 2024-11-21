import React, { useState, useEffect } from "react";
import { fetchMovieById } from "../../../function/movie";
import { fetchSeatsByRoom } from "../../../function/seat";
import "./Tickets.css";

const Tickets = ({ movieId, roomId }) => {
  const [movie, setMovie] = useState(null);
  const [seats, setSeats] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    const getMovie = async () => {
      const result = await fetchMovieById(6);
      if (result.success) {
        setMovie(result.movie);
      } else {
        console.error(result.error);
      }
    };

    const getSeats = async () => {
      const fetchedSeats = await fetchSeatsByRoom(1);
      setSeats(fetchedSeats);
    };

    getMovie();
    getSeats();
  }, []);

  useEffect(() => {
    if (seats) {
      setSelectedTime({
        time: "10:00 AM",
        seats: seats,
      });
    }
  }, [seats]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie || !seats) {
    return <div>Loading...</div>;
  }

  const cinema = {
    name: "Cinema 1",
    location:
      "Tầng 4 & 5, TTTM The Garden, khu đô thị The Manor, đường Mễ Trì, phường Mỹ Đình 1, quận Nam Từ Liêm, Hà Nội",
    timeslots: [
      {
        time: "10:00 AM",
        seats: seats,
      }, 
    ],
  };
  
  const generateSeatLayout = () => {
    const timeSlotIndex = cinema.timeslots.findIndex(
      (t) => t.time === selectedTime.time
    );

    if (timeSlotIndex === -1) return null;

    return cinema.timeslots[timeSlotIndex].seats.map((seatType, index) => (
      <div className="seat-type" key={index}>
        <h2>
          {seatType.type} - {seatType.price} ₫
        </h2>
        <div className="seat-rows">
          {seatType.rows.map((row, rowIndex) => (
            <div className="seat-row" key={rowIndex}>
              <p className="rowname">{row.rowname}</p>
              <div className="seat-cols">
                {row.cols.map((col, colIndex) => (
                  <div className="seat-col" key={colIndex}>
                    {col.seats.map((seat, seatIndex) => (
                      <div key={seatIndex}>
                        {seat.status === "available" && (
                          <span
                            className={
                              selectedSeats.find((s) => {
                                return (
                                  s.row === row.rowname &&
                                  s.seat_id === seat.seat_id &&
                                  s.col === colIndex
                                );
                              })
                                ? "seat-selected"
                                : "seat-available"
                            }
                            onClick={() =>
                              selectDeselectSeat({
                                row: row.rowname,
                                col: colIndex,
                                seat_id: seat.seat_id,
                                price: seatType.price,
                              })
                            }
                          >
                            {seatIndex + 1}
                          </span>
                        )}
                        {seat.status === "booked" && (
                          <span className="seat-unavailable">
                            {seatIndex + 1}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <br /> <br /> <br />
            </div>
          ))}
        </div>
      </div>
    ));
  };

  const selectDeselectSeat = (seat) => {
    const isSelected = selectedSeats.find((s) => {
      return (
        s.row === seat.row && s.seat_id === seat.seat_id && s.col === seat.col
      );
    });
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((s) => s.seat_id !== seat.seat_id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div className="ticket-page bg-white">
      <div className="px-24 py-6">
        <div className="movie card border-2">
          <div className="card-body flex md:flex-row flex-col p-6 gap-6">
            <div className="md:basis-1/6">
              <img src={movie.portraitposter} className="rounded-lg"></img>
            </div>
            <div className="flex flex-col min-h-full h-full md:basis-5/6 gap-4">
              <p className="title be-vietnam-pro-black text-primary">
                {movie.title}
              </p>
              <div className="movie-formats">
                <p className="formats">
                  {movie.formats.map((format, index) => {
                    return (
                      <span
                        className="badge badge-primary badge-lg mr-1"
                        key={index}
                      >
                        {format}{" "}
                      </span>
                    );
                  })}
                </p>
              </div>
              <div className="flex flex-col gap-4">
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
                <p className="genre">Thể loại: {movie.genre}</p>
                <p className="release-date">Khởi chiếu: {movie.releasedate} | Thời lượng: {movie.duration}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="select-seat my-4">
          <div className="time-cont">
            {cinema.timeslots.map((time, index) => (
              <h3
                className={
                  selectedTime.time === time.time ? "time selected" : "time"
                }
                onClick={() => {
                  setSelectedTime(time);
                  setSelectedSeats([]);
                }}
                key={index}
              >
                {time.time}
              </h3>
            ))}
          </div>
          <div className="indicators flex flex-col gap-6">
            <div className="gap-3">
              <span className="seat-available"></span>
              <p>STANDARD</p>
            </div>
            <div className="flex flex-row gap-8">
              <div className="gap-3">
                <span className="seat-unavailable"></span>
                <p>Ghế đã bán</p>
              </div>
              <div className="gap-3">
                <span className="seat-selected"></span>
                <p>Ghế đã chọn</p>
              </div>
            </div>
          </div>
          {generateSeatLayout()}
          <div className="total-cont">
            <div className="total">
              <h2>Tổng tiền</h2>
              <h3>
                {selectedSeats.reduce((acc, seat) => acc + seat.price, 0)} ₫
              </h3>
            </div>

            <a href={`/payment/`} className="btn btn-sm btn-primary text-white">
              Chọn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
