const express = require('express');
const axios = require('axios');
const Review = require('../models/Review');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/search', async (req, res) => {
  const { by_city, by_name, by_type } = req.query;
  const response = await axios.get('https://api.openbrewerydb.org/breweries', {
    params: { by_city, by_name, by_type }
  });
  res.render('home', { breweries: response.data });
});

router.get('/brewery/:id', async (req, res) => {
  const { id } = req.params;
  const breweryResponse = await axios.get(`https://api.openbrewerydb.org/breweries/${id}`);
  const reviews = await Review.find({ breweryId: id }).populate('userId');
  res.render('brewery', { brewery: breweryResponse.data, reviews });
});

router.post('/brewery/:id/review', async (req, res) => {
  const { id } = req.params;
  const { rating, description } = req.body;
  const token = req.cookies.token;
  const decoded = jwt.verify(token, 'secretKey');
  const newReview = new Review({ userId: decoded.userId, breweryId: id, rating, description });
  await newReview.save();
  res.redirect(`/brewery/${id}`);
});

module.exports = router;
