"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isSignedIn } from "../function/auth";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { fetchPaymentData, createPaymentIntent } from "../function/payment";
import { createBooking, createTickets } from "../function/book";
import "../components/Payment/payment.css";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);

const CheckoutForm = ({ paymentData }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  console.log(isSignedIn());
  if (!isSignedIn()) {
    navigate("/auth/signin");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
    } else {
      const clientSecret = await createPaymentIntent(paymentData.totalPrice);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setIsPaid(true);

          const bookingData = {
            user_id: paymentData.user_id,
            schedule_id: paymentData.schedule.schedule_id,
            total_price: paymentData.totalPrice,
            booking_date: new Date(),
          };

          const bookingResult = await createBooking(bookingData);

          if (bookingResult.success) {
            const ticketsData = paymentData.seats.map((seat) => ({
              booking_id: bookingResult.booking.booking_id,
              seat_id: seat.seat_id,
              cinema_id: paymentData.cinema.cinema_id,
              price: seat.price,
            }));

            const ticketsResult = await createTickets(ticketsData);

            if (ticketsResult.success) {
              alert("Thanh toán thành công!");
              window.location.href = "/";
            } else {
              setError(ticketsResult.error);
            }
          } else {
            setError(bookingResult.error);
          }
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || isPaid} className={`pay-button ${isPaid ? "paid" : ""}`}>
        {isPaid ? "Đã thanh toán" : "Thanh toán ngay"}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export const PaymentPage = () => {
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const data = fetchPaymentData();
    setPaymentData(data);
  }, []);

  if (!paymentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h1>Thanh toán vé xem phim</h1>
        <p>Hoàn tất đơn hàng của bạn ngay bây giờ</p>
      </div>
      <div className="payment-content">
        <div className="movie-details">
          <h2>Thông tin phim</h2>
          <p>
            <strong>Tên phim:</strong> {paymentData.movie.title}
          </p>
          <p>
            <strong>Ngày chiếu:</strong> {new Date(paymentData.schedule.start_time).toDateString()}
          </p>
          <p>
            <strong>Ngôn ngữ:</strong> {paymentData.movie.language}
          </p>
          <p>
            <strong>Thể loại:</strong> {paymentData.movie.genre}
          </p>
          <p>
            <strong>Giá vé:</strong> {paymentData.totalPrice} ₫
          </p>
        </div>
        <div className="screen-selection">
          <h2>Rạp chiếu phim</h2>
          <select value={paymentData.cinema.name} disabled className="screen-select">
            <option value={paymentData.cinema.name}>
              {paymentData.cinema.name} - {paymentData.cinema.location}
            </option>
          </select>
        </div>
        <div className="seats-details">
          <h2>Ghế đã chọn</h2>
          {paymentData.seats.map((seat, index) => (
            <p key={index}>
              <strong>Ghế:</strong> {seat.row}{seat.seat_col} - {seat.price} ₫
            </p>
          ))}
        </div>
      </div>
      <div className="payment-footer">
        <Elements stripe={stripePromise}>
          <CheckoutForm paymentData={paymentData} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
