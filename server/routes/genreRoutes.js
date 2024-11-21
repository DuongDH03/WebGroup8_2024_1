const express = require('express');
const router = express.Router();
const Genre = require('../model/Genre');

// CREATE a new genre
router.post('/', async (req, res) => {
    try {
        const genre = await Genre.create(req.body);
        res.status(201).json(genre);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// READ all genres
router.get('/', async (req, res) => {
    try {
        const genres = await Genre.findAll();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ a single genre by ID
router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findByPk(req.params.id);
        if (genre) {
            res.status(200).json(genre);
        } else {
            res.status(404).json({ error: 'Genre not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE a genre by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Genre.update(req.body, {
            where: { genre_id: req.params.id }
        });
        if (updated) {
            const updatedGenre = await Genre.findByPk(req.params.id);
            res.status(200).json(updatedGenre);
        } else {
            res.status(404).json({ error: 'Genre not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE a genre by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Genre.destroy({
            where: { genre_id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Genre not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;