const express = require('express');
const router = express.Router();
const  Room  = require('../model/Room'); 

// CREATE a new Room
router.post('/', async (req, res) => {
    try {
        const { cinema_id, room_name } = req.body;
        const newRoom = await Room.create({ cinema_id, room_name });
        res.status(201).json(newRoom);
    } catch (error) {
        console.error(error);  
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// READ all Rooms
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.findAll();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve rooms' });
    }
});

// READ a specific Room by ID
router.get('/:id', async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);
        if (room) {
            res.status(200).json(room);
        } else {
            res.status(404).json({ error: 'Room not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve room' });
    }
});

// FIND all room by the Cinema ID
router.get('/cinema/:cinema_id', async (req, res) => {
    try {
        const rooms = await Room.findAll({
            where: { cinema_id: req.params.cinema_id }
        });
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve rooms' });
    }
});

// UPDATE a Room by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Room.update(req.body, {
            where: { room_id: req.params.id }
        });
        if (updated) {
            const updatedRoom = await Room.findByPk(req.params.id);
            res.status(200).json(updatedRoom);
        } else {
            res.status(404).json({ error: 'Room not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update room' });
    }
});

// DELETE a Room by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Room.destroy({
            where: { room_id: req.params.id }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Room not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete room' });
    }
});

module.exports = router;
