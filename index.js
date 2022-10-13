const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const cloudinary = require('cloudinary').v2;

const { populateDb } = require('./utils/populateDb');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bp = require('body-parser');
const { getNews } = require('./services/newsServices');
const { getThreadsByMostViews } = require('./services/threadServices');
const { getAllAvatars } = require('./services/imageService');
const Post = require('./models/Post');
dotenv.config();

// Cloudinary
cloudinary.config({
	cloud_name: 'detha4545',
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
});

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
app.use(async (req, res, next) => {
	res.locals.data = {};
	res.locals.user = req.session['user'];
	res.locals.news = await getNews();
	res.locals.hottest = await getThreadsByMostViews();
	res.locals.isLoggedIn = res.locals.user !== undefined;
	res.locals.data.error = req.query.error;
	next();
});

app.use((req, res, next) => {
	res.header('Cache-Control', 'no-store');
	next();
});
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use('/auth', require('./routes/authRoutes'));
app.use('/user', require('./routes/userRoutes'));
app.use('/baseThread', require('./routes/baseThreadRoutes'));
app.use('/thread', require('./routes/threadRoutes'));
app.use('/post', require('./routes/postRoutes'));
app.use('/api', require('./routes/apiRoutes'));
app.use('/', require('./routes/homeRoutes'));
// Mongo DB connection
const dbUri = process.env.MONGODB_URI;
mongoose
	.connect(dbUri, { useUnifiedTopology: true, useNewUrlParser: true })
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is listening on PORT: ${PORT}`));
