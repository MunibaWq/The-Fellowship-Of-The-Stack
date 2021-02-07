const express = require("express");
const router = new express.Router();
const pool = require("../db");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
router.post('/stripe/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'cad'
    }
    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({error: stripeErr})
        } else {
            res.status(200).send({success: stripeRes})
        }
    })
})

module.exports = router;