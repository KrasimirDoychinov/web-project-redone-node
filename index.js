const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bp = require('body-parser');

dotenv.config();

// View engine
app.set('view engine', 'ejs');

// Middlewares
app.set(bp.urlencoded({ extended: true }));
app.set(bp.json());

// Mongo DB connection
const dbUri = process.env.MONGODB_URI;
mongoose
	.connect(dbUri, { useUnifiedTopology: true, useNewUrlParser: true })
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.log(err));

const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log(`Server is listening on PORT: ${PORT}`));
