const express = require('express');
const router = express.Router();
const Seat = require('../model/Seat');

// CREATE a new seat
router.post('/', async (req, res) => {
    try {
        const seat = await Seat.create(req.body);
        res.status(201).json(seat);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// CREATE multiple seats
router.post('/bulk', async (req, res) => {
    try {
        const seats = await Seat.bulkCreate(req.body);
        res.status(201).json(seats);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// READ all seats
router.get('/', async (req, res) => {
    try {
        const seats = await Seat.findAll();
        res.status(200).json(seats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ a single seat by ID
router.get('/:id', async (req, res) => {
    try {
        const seat = await Seat.findByPk(req.params.id);
        if (seat) {
            res.status(200).json(seat);
        } else {
            res.status(404).json({ error: 'Seat not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE a seat by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Seat.update(req.body, {
            where: { seat_id: req.params.id }
        });
        if (updated) {
            const updatedSeat = await Seat.findByPk(req.params.id);
            res.status(200).json(updatedSeat);
        } else {
            res.status(404).json({ error: 'Seat not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE a seat by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Seat.destroy({
            where: { seat_id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Seat not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ all seats for a specific room
router.get('/room/:room_id', async (req, res) => {
    try {
        const seats = await Seat.findAll({
            where: { room_id: req.params.room_id }
        });
        res.status(200).json(seats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve seats' });
    }
});

module.exports = router;