const express = require('express');
const router = express.Router();
const Schedule = require('../model/Schedule');
const Movie = require('../model/Movie');
const Cinema = require('../model/Cinema');
const Room = require('../model/Room');

// CREATE a new schedule
router.post('/', async (req, res) => {
    const { cinema_id, movie_id, room_name, start_time, end_time } = req.body;
    try {
        // Check if cinema exists
        const cinema = await Cinema.findByPk(cinema_id);
        if (!cinema) {
            return res.status(404).json({ error: 'Cinema not found' });
        }

        // Check if movie exists
        const movie = await Movie.findByPk(movie_id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Check if room exists and belongs to the cinema
        const room = await Room.findOne({ where: { room_name, cinema_id } });
        if (!room) {
            return res.status(404).json({ error: 'Room not found in the specified cinema' });
        }

        // Create schedule
        const schedule = await Schedule.create({ cinema_id, movie_id, room_id:room.room_id, start_time, end_time });
        res.status(201).json(schedule);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// READ all schedules
router.get('/', async (req, res) => {
    try {
        const schedules = await Schedule.findAll();
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ a schedule by ID
router.get('/:id', async (req, res) => {
    try {
        const schedule = await Schedule.findByPk(req.params.id);
        if (schedule) {
            res.status(200).json(schedule);
        } else {
            res.status(404).json({ error: 'Schedule not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE a schedule by ID
router.put('/:id', async (req, res) => {
    const { cinema_id, movie_id, room_id, start_time, end_time } = req.body;
    try {
        // Check if cinema exists
        const cinema = await Cinema.findByPk(cinema_id);
        if (!cinema) {
            return res.status(404).json({ error: 'Cinema not found' });
        }

        // Check if movie exists
        const movie = await Movie.findByPk(movie_id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Update schedule
        const [updated] = await Schedule.update({ cinema_id, movie_id, room_id, start_time, end_time }, {
            where: { schedule_id: req.params.id }
        });
        if (updated) {
            const updatedSchedule = await Schedule.findByPk(req.params.id);
            res.status(200).json(updatedSchedule);
        } else {
            res.status(404).json({ error: 'Schedule not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE a schedule by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Schedule.destroy({
            where: { schedule_id: req.params.id }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Schedule not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;