const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../model/Booking');
const Ticket = require('../model/Ticket');

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
      totalMoneyPaid: amount,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;