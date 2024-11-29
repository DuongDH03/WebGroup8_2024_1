import React, { useState, useEffect } from "react";
import { fetchTicketsByUserId } from "../function/ticket";
import { getUserInfo } from "../function/auth";

const UserTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const userInfo = getUserInfo();

  useEffect(() => {
    const getTickets = async () => {
      const result = await fetchTicketsByUserId();
      if (result.success) {
        setTickets(result.tickets);
      } else {
        setError(result.error);
      }
    };

    getTickets();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (tickets.length === 0) {
    return <div>No tickets found</div>;
  }

  return (
    <div>
      <h2>Your Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.ticket_id}>
            Movie: {ticket.movie_name}, Schedule Start Time: {new Date(ticket.schedule_start_time).toLocaleString()}, Room: {ticket.room_name}, Cinema: {ticket.cinema_name}, Seat: {ticket.seat_name}, Price: {ticket.price} ₫
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTickets;