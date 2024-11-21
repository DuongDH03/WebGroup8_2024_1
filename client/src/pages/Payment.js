"use client";
import React, { useState } from "react";
import "../components/Payment/payment.css";

export const PaymentPage = () => {
  const movie = {
    moviename: "Venom",
    date: new Date(),
    language: "Vietnamese",
    type: "Science Fiction/Action",
    cost: "200.000VND",
    screens: [
      { name: "Screen 1", location: "Lotte Cinema, Hanoi" },
      { name: "Screen 2", location: "Lotte Cinema, Hanoi" },
      { name: "Screen 3", location: "Lotte Cinema, Hanoi" },
    ],
  };

  const [selectedScreen, setSelectedScreen] = useState("");
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = () => {
    if (!selectedScreen) {
      alert("Vui lòng chọn màn hình chiếu!");
      return;
    }
    setIsPaid(true);
    alert("Thanh toán thành công!");
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h1>Thanh toán vé xem phim</h1>
        <p>Hoàn tất đơn hàng của bạn ngay bây giờ</p>
      </div>
      <div className="payment-content">
        {/* Movie Details Section */}
        <div className="movie-details">
          <h2>Thông tin phim</h2>
          <p>
            <strong>Tên phim:</strong> {movie.moviename}
          </p>
          <p>
            <strong>Ngày chiếu:</strong> {movie.date.toDateString()}
          </p>
          <p>
            <strong>Ngôn ngữ:</strong> {movie.language}
          </p>
          <p>
            <strong>Thể loại:</strong> {movie.type}
          </p>
          <p>
            <strong>Giá vé:</strong> {movie.cost}
          </p>
        </div>

        {/* Screen Selection Section */}
        <div className="screen-selection">
          <h2>Chọn màn hình chiếu</h2>
          <select
            value={selectedScreen}
            onChange={(e) => setSelectedScreen(e.target.value)}
            className="screen-select"
          >
            <option value="">-- Chọn màn hình --</option>
            {movie.screens.map((screen, index) => (
              <option key={index} value={screen.name}>
                {screen.name} - {screen.location}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Payment Button */}
      <div className="payment-footer">
        <button
          onClick={handlePayment}
          disabled={isPaid}
          className={`pay-button ${isPaid ? "paid" : ""}`}
        >
          {isPaid ? "Đã thanh toán" : "Thanh toán ngay"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
