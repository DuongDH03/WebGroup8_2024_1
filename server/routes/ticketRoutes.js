const express = require('express');
const router = express.Router();
const Ticket = require('../model/Ticket');
const Booking = require('../model/Booking');
const Schedule = require('../model/Schedule');
const Movie = require('../model/Movie');
const Cinema = require('../model/Cinema');
const Room = require('../model/Room');
const Seat = require('../model/Seat');

// CREATE a new ticket
router.post('/', async (req, res) => {
    try {
        const ticket = await Ticket.create(req.body);
        res.status(201).json(ticket);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// CREATE multiple tickets
router.post('/bulk', async (req, res) => {
    try {
      const tickets = await Ticket.bulkCreate(req.body);
      res.status(201).json(tickets);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// READ all tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.findAll();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ a single ticket by ID
router.get('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);
        if (ticket) {
            res.status(200).json(ticket);
        } else {
            res.status(404).json({ error: 'Ticket not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// FINDS ALL tickets of an User
router.get('/user/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const tickets = await Ticket.findAll({
            include: [
                {
                    model: Booking,
                    where: { user_id },
                    include: [
                        {
                            model: Schedule,
                            include: [
                                { model: Movie, attributes: ['title'] },
                                { model: Cinema, attributes: ['name'] },
                                { model: Room, attributes: ['room_name'] }
                            ]
                        }
                    ]
                },
                { model: Seat, attributes: ['seat_row', 'seat_col'] }
            ]
        });

        const formattedTickets = tickets.map(ticket => ({
            ticket_id: ticket.ticket_id,
            price: ticket.price,
            movie_name: ticket.Booking.Schedule.Movie.title,
            schedule_start_time: ticket.Booking.Schedule.start_time,
            room_name: ticket.Booking.Schedule.Room.room_name,
            cinema_name: ticket.Booking.Schedule.Cinema.name,
            seat_name: `${ticket.Seat.seat_row}${ticket.Seat.seat_col}`
        }));

        res.status(200).json(formattedTickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE a ticket by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Ticket.update(req.body, {
            where: { ticket_id: req.params.id }
        });
        if (updated) {
            const updatedTicket = await Ticket.findByPk(req.params.id);
            res.status(200).json(updatedTicket);
        } else {
            res.status(404).json({ error: 'Ticket not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE a ticket by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Ticket.destroy({
            where: { ticket_id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Ticket not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
