import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isSignedIn, getUserInfo } from "../../../function/auth";
import { fetchMovieById } from "../../../function/movie";
import { fetchSeatsByRoom } from "../../../function/seat";
import "./Tickets.css";

const Tickets = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieId, cinema, schedules } = location.state;

  const [movie, setMovie] = useState(null);
  const [seatsBySchedule, setSeatsBySchedule] = useState({});
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState(null);

  console.log(isSignedIn());
  if (!isSignedIn()) {
    navigate("/auth/signin");
  }

  useEffect(() => {
    const fetchMovie = async () => {
      const result = await fetchMovieById(movieId);
      if (result.success) {
        setMovie(result.movie);
      } else {
        console.error(result.error);
        setError("Failed to fetch movie details.");
      }
    };

    const fetchSeats = async () => {
      const seatsMap = {};
      for (const schedule of schedules) {
        const seatResult = await fetchSeatsByRoom(schedule.room_id);
        if (seatResult.success) {
          seatsMap[schedule.schedule_id] = seatResult.seats;
        } else {
          console.error(`Failed to fetch seats for room ${schedule.room_id}`);
        }
      }
      setSeatsBySchedule(seatsMap);

      if (schedules.length > 0 ) {
        setSelectedSchedule(schedules[0]);
        setSelectedSeats([]);
      }
    };

    fetchMovie();
    fetchSeats();
  }, [movieId, schedules]);

  const selectDeselectSeat = (seat) => {
    const isSelected = selectedSeats.find(
      (s) =>
        s.row === seat.row &&
        s.seat_id === seat.seat_id &&
        s.col === seat.col
    );
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((s) => s.seat_id !== seat.seat_id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleProceedToPayment = () => {
    const totalPrice = selectedSeats.reduce((acc, seat) => acc + seat.price, 0);
    const userInfo = getUserInfo();
    console.log(localStorage.user);
    const paymentData = {
      user_id: userInfo.id,
      cinema,
      schedule: selectedSchedule,
      movie,
      seats: selectedSeats,
      totalPrice,
    };
    localStorage.setItem("paymentData", JSON.stringify(paymentData));
    navigate("/payment");
  };

  const generateSeatLayout = () => {
    if (!selectedSchedule || !seatsBySchedule[selectedSchedule.schedule_id]) {
      return null;
    }

    const seats = seatsBySchedule[selectedSchedule.schedule_id];

    return seats.map((seatType, index) => (
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
                              selectedSeats.find(
                                (s) =>
                                  s.row === row.rowname &&
                                  s.seat_id === seat.seat_id &&
                                  s.col === colIndex
                              )
                                ? "seat-selected"
                                : "seat-available"
                            }
                            onClick={() =>
                              selectDeselectSeat({
                                row: row.rowname,
                                col: colIndex,
                                seat_id: seat.seat_id,
                                price: seatType.price,
                                seat_col: seat.seat_col
                              })
                            }
                          >
                            {seat.seat_col}
                          </span>
                        )}
                        {seat.status === "booked" && (
                          <span className="seat-unavailable">
                            {seat.seat_col}
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie || !cinema || Object.keys(seatsBySchedule).length === 0) {
    return <div>Loading...</div>;
  }

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
                  {movie.formats.map((format, index) => (
                    <span
                      className="badge badge-primary badge-lg mr-1"
                      key={index}
                    >
                      {format}
                    </span>
                  ))}
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
                <p className="release-date">
                  Khởi chiếu: {movie.releasedate} | Thời lượng: {movie.duration}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="select-seat my-4">
          <div className="time-cont">
            {schedules.map((schedule) => (
              <h3
                className={
                  selectedSchedule?.schedule_id === schedule.schedule_id
                    ? "time selected"
                    : "time"
                }
                onClick={() => {
                  setSelectedSchedule(schedule);
                  setSelectedSeats([]);
                }}
                key={schedule.schedule_id}
              >
                {new Date(schedule.start_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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

            <button onClick={handleProceedToPayment} className="btn btn-sm btn-primary text-white">
              Chọn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
