const express = require('express');
const router = express.Router();
const Movie = require('../model/Movie');
const Crew = require('../model/Crew');
const HasCrew = require('../model/HasCrew');


// CREATE a new movie
router.post('/', async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// FIND all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// FIND a movie by ID
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (movie) {
            res.status(200).json(movie);
        } else {
            res.status(404).json({
                error: 'Movie not found!'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// FIND a movie by name
router.get('/name/:name', async (req, res) => {
    try {
        const movie = await Movie.findOne({ where: { movie_name: req.params.name } });
        if (movie) {
            res.status(200).json(movie);
        } else {
            res.status(404).json({
                error: 'Movie not found!'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// UPDATE a Movie by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Movie.update(req.body, {
            where: { movie_id: req.params.id}
        });
        if (updated) {
            const updatedMovie = await Movie.findByPk(req.params.id);
            res.status(200).json(updatedMovie);
        } else {
            res.status(404).json({
                error: 'Movie not found!'
            });
        }
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// DELETE a Movie by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Movie.destroy({
            where: {movie_id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({
                error: 'Movie not found!'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// CREATE a new movie
router.post('/', async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// FIND all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// CREATE a new crew member
router.post('/crew', async (req, res) => {
    const { crew_name, crew_role } = req.body;
    if (!['Director', 'Actor'].includes(crew_role)) {
        return res.status(400).json({ error: 'Invalid crew role. Must be either Director or Actor.' });
    }
    try {
        const crew = await Crew.create({ crew_name, crew_role });
        res.status(201).json(crew);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// ASSOCIATE a crew member with a movie
router.post('/:movieId/crew/:crewId', async (req, res) => {
    const { movieId, crewId } = req.params;
    try {
        const movie = await Movie.findByPk(movieId);
        const crew = await Crew.findByPk(crewId);
        if (!movie || !crew) {
            return res.status(404).json({ error: 'Movie or Crew not found!' });
        }
        const hasCrew = await HasCrew.create({ movie_id: movieId, crew_id: crewId });
        res.status(201).json(hasCrew);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// GET all crew members for a movie by ID
router.get('/:movieId/crew', async (req, res) => {
    try {
        const { movieId } = req.params;

        // Find the movie and include the associated crew members
        const movie = await Movie.findByPk(movieId, {
          include: {
            model: Crew,
            through: { attributes: [] }, // Exclude attributes from the join table
          },
        });

        if (!movie) {
          return res.status(404).json({ error: 'Movie not found' });
        }

        // Return the crew members
        res.json(movie.Crews);
      } catch (error) {
        console.error('Error fetching crew members:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
});

// GET all movies with status "showing"
router.get('/status/showing', async (req, res) => {
    try {
        const movies = await Movie.findAll({
            where: {
                status: 'showing',
            },
        });

        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movies with status "showing":', error);
        res.status(500).json({ message: 'An error occurred while fetching movies.' });
    }
});

// GET all movies with status "upcoming"
router.get('/status/upcoming', async (req, res) => {
    try {
        const movies = await Movie.findAll({
            where: {
                status: 'upcoming'
                }
        });
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET all featured movies
router.get('/featured/true', async (req, res) => {
    try {
        const movies = await Movie.findAll({
            where: {
                isFeatured: true,
            },
        });

        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching featured movies:', error);
        res.status(500).json({ message: 'An error occurred while fetching featured movies.' });
    }
});


module.exports = router;
