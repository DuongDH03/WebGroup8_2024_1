import React from "react";
import { useLocation } from 'react-router-dom';
import DatePicker from "react-horizontal-datepicker";
import "./MovieSchedule.css";

const MovieSchedule = () => {
  const pathname = useLocation().pathname;
  console.log(pathname);

  const movie = {
    date: new Date(),
    cinemas: [
      {
        name: "Cinema 1",
        location: "Tầng 4 & 5, TTTM The Garden, khu đô thị The Manor, đường Mễ Trì, phường Mỹ Đình 1, quận Nam Từ Liêm, Hà Nội",
      },
      {
        name: "Cinema 2",
        location: "Tầng 8 của TTTM Vincom, số 2 Phạm Ngọc Thạch, Đống Đa, Hà Nội",
      },
      {
        name: "Cinema 3",
        location: "Tầng 8, TTTM Discovery - 302 Cầu Giấy , Hà Nội",
      },
    ],
  };

  const selectedDay = (val) => {
    console.log(val);
  };

  return (
    <div className="schedule-section md:px-24">
      <h2 className="schedule-title be-vietnam-pro-bold text-primary">Lịch chiếu</h2>
      <div className="schedule-date-picker">
        <DatePicker
          getSelectedDay={selectedDay}
          endDate={100}
          selectDate={new Date()}
          labelFormat={"MMMM"}
          color={"#d1082a"}
        />
      </div>
      <div className="schedule-container">
        {movie.cinemas.map((cinema, index) => (
          <div className="schedule-item" key={index}>
            <div>
              <h3 className="be-vietnam-pro-semibold">{cinema.name}</h3>
              <p>{cinema.location}</p>
            </div>
            <a
              href={`${pathname}/tickets/${cinema.name}`}
              className="btn btn-sm btn-primary text-white"
            >
              Chọn
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSchedule;
