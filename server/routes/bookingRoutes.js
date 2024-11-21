const express = require('express');
const router = express.Router();
const Booking = require('../model/Booking');

// CREATE a new booking
router.post('/', async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// READ all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ a single booking by ID
router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (booking) {
            res.status(200).json(booking);
        } else {
            res.status(404).json({ error: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE a booking by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Booking.update(req.body, {
            where: { booking_id: req.params.id }
        });
        if (updated) {
            const updatedBooking = await Booking.findByPk(req.params.id);
            res.status(200).json(updatedBooking);
        } else {
            res.status(404).json({ error: 'Booking not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE a booking by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Booking.destroy({
            where: { booking_id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
