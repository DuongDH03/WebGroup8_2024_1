import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchAllCinemas } from "../../function/cinema";
import { fetchSchedulesByMovieId, fetchSchedulesByCinemaAndMovie } from "../../function/schedule";
import DatePicker from "react-horizontal-datepicker";
import "./MovieSchedule.css";

const MovieSchedule = ({ movieId }) => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const [cinemas, setCinemas] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [date, setDate] = useState(new Date());

  // Fetch cinemas and schedules from backend
  useEffect(() => {
    const getCinemasAndSchedules = async () => {
      const cinemaResult = await fetchAllCinemas();
      const scheduleResult = await fetchSchedulesByMovieId(movieId);

      if (cinemaResult.success) {
        setCinemas(cinemaResult.cinemas);
      } else {
        console.error(cinemaResult.error);
      }

      if (scheduleResult.success) {
        console.log(scheduleResult);

        setSchedules(scheduleResult.schedules);
      } else {
        console.error(scheduleResult.error);
      }
    };

    getCinemasAndSchedules();
  }, );

  // Filter schedules by selected date and movie ID
  const filterSchedulesByDateAndMovie = (date, movieId) => {
    const selectedDateString = date.toISOString().split('T')[0]; // the standard ISO smth... idk
    console.log(selectedDateString);
    return schedules.filter(
      (schedule) =>
        new Date(schedule.start_time).toISOString().split('T')[0] === selectedDateString
    );
  };

  const handleDateSelect = (selectedDate) => {
    setDate(new Date(selectedDate));
  };

  const schedulesForSelectedDateAndMovie = filterSchedulesByDateAndMovie(
    date,
    movieId
  );

  const handleSelectCinema = async (cinema) => {
    const scheduleResult = await fetchSchedulesByCinemaAndMovie(cinema.cinema_id, movieId);
    if (scheduleResult.success) {
      navigate(`${pathname}/tickets/${cinema.cinema_id}`, {
        state: {
          cinema,
          movieId,
          schedules: scheduleResult.schedules
        }
      });
    } else {
      console.error(scheduleResult.error);
    }
  };

  return (
    <div className="schedule-section md:px-24">
      <h2 className="schedule-title be-vietnam-pro-bold text-primary">Lịch chiếu</h2>
      <div className="schedule-date-picker">
        <DatePicker
          getSelectedDay={handleDateSelect}
          endDate={100}
          labelFormat={"MMMM"}
          color={"#d1082a"}
        />
      </div>
      <div className="schedule-container">
        {cinemas.map((cinema) => {
          const cinemaSchedules = schedulesForSelectedDateAndMovie.filter(
            (schedule) => schedule.cinema_id === cinema.cinema_id
          );

          if (cinemaSchedules.length === 0) {
            return null; // Do not render cinemas without schedules
          }

          return (
            <div className="schedule-item" key={cinema.cinema_id}>
              <div>
                <h3 className="be-vietnam-pro-semibold">{cinema.name}</h3>
                <p>{cinema.location}</p>
              </div>
              <a
                className="btn btn-sm btn-primary text-white"
                onClick={() => handleSelectCinema(cinema)}
              >
                Chọn
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieSchedule;
