const express = require('express');
const router = express.Router();
const Cinema = require('../model/Cinema');

// CREATE a new cinema
router.post('/', async (req, res) => {
    try {
        const cinema = await Cinema.create(req.body);
        res.status(201).json(cinema);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// READ all cinemas
router.get('/', async (req, res) => {
    try {
        const cinemas = await Cinema.findAll();
        res.status(200).json(cinemas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ a single cinema by ID
router.get('/:id', async (req, res) => {
    try {
        const cinema = await Cinema.findByPk(req.params.id);
        if (cinema) {
            res.status(200).json(cinema);
        } else {
            res.status(404).json({ error: 'Cinema not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE a cinema by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Cinema.update(req.body, {
            where: { cinema_id: req.params.id }
        });
        if (updated) {
            const updatedCinema = await Cinema.findByPk(req.params.id);
            res.status(200).json(updatedCinema);
        } else {
            res.status(404).json({ error: 'Cinema not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE a cinema by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Cinema.destroy({
            where: { cinema_id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Cinema not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
