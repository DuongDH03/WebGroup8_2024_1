const express = require('express');
const router = express.Router();
const Ticket = require('../model/Ticket');

// CREATE a new ticket
router.post('/', async (req, res) => {
    try {
        const ticket = await Ticket.create(req.body);
        res.status(201).json(ticket);
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
