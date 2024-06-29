const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const breweryRoutes = require('./routes/breweries');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/breweryDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.use(authRoutes);
app.use(breweryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
