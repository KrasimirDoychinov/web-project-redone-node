const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bp = require('body-parser');
dotenv.config();

// View engine
app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', './layout.ejs');
app.set('view engine', 'ejs');

// Middlewares
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use('/user', require('./routes/userRoutes'));
app.use('/', require('./routes/homeRoutes'));
// Mongo DB connection
const dbUri = process.env.MONGODB_URI;
mongoose
	.connect(dbUri, { useUnifiedTopology: true, useNewUrlParser: true })
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is listening on PORT: ${PORT}`));
