const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

const { populateDb } = require('./utils/populateDb');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bp = require('body-parser');
dotenv.config();

// Checks and populates the DB with neede documents
populateDb();

// View engine
app.use('/static', express.static(__dirname + '/static'));
app.use(expressLayouts);
app.set('layout', './layout/layout.ejs');
app.set('view engine', 'ejs');

// Session
const oneDay = 1000 * 60 * 60 * 24;
app.use(
	sessions({
		secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
		saveUninitialized: true,
		cookie: { maxAge: oneDay },
		resave: false,
	})
);
app.use(cookieParser());

// Middlewares
app.use((req, res, next) => {
	res.locals.data = {};
	res.locals.user = req.session['user'];
	res.locals.isLoggedIn = res.locals.user !== undefined;
	res.locals.data.error = req.query.error;
	next();
});
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use('/user', require('./routes/userRoutes'));
app.use('/baseThread', require('./routes/baseThreadRoutes'));
app.use('/thread', require('./routes/threadRoutes'));
app.use('/post', require('./routes/postRoutes'));
app.use('/', require('./routes/homeRoutes'));

// Mongo DB connection
const dbUri = process.env.MONGODB_URI;
mongoose
	.connect(dbUri, { useUnifiedTopology: true, useNewUrlParser: true })
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is listening on PORT: ${PORT}`));
