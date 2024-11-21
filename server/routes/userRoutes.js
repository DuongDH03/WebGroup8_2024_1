const express = require('express');
const router = express.Router();
const User = require('../model/User');
const { authenticateToken } = require('./authRoutes');

// CREATE a new User == Sign Up (authRoutes)

// FIND a User by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                error: 'User not found!'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// FIND all Users
router.get('/', authenticateToken, async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(201).json(users);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// UPDATE a user by ID
router.put('/:id', authenticateToken, async (req, res) => {
    try {   
        const [updated] = await User.update(req.body, {
            where: { user_id: req.params.id }
        });
        if (updated) {
            const updatedUser = await User.findByPk(req.params.id);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({
                error: 'User not found!'
            })
        }
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})

// DELETE a user by ID
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { user_id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({
                error: 'User not found!'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;