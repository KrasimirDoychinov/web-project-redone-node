const User = require('../components/user/User');
const BaseThread = require('../components/baseThread/BaseThread');
const { createUser } = require('../components/user/userServices');
const { createBaseThread } = require('../components/baseThread/baseThreadServices');
const { scrapeNews } = require('../components/utils/scrapeServices');
const News = require('../components/news/News');
const { getUnique } = require('../components/news/newsServices');
const scrapeService = require('../components/utils/scrapeServices');
const newsService = require('../components/news/newsServices');
const userService = require('../components/user/userServices');
const baseThreadService = require('../components/baseThread/baseThreadServices');

const populateUsers = async function () {
	if (!(await User.findOne({ name: 'admin' }))) {
		console.log('Populating admin...');
		await userService.create('admin', 'test123');
		console.log('Admin populated!');
	}

	if (!(await User.findOne({ name: 'user' }))) {
		console.log('Populating user...');
		await userService.create('user', 'test123');
		console.log('User populated!');
	}
};

const populateBaseThreads = async function () {
	if (!(await BaseThread.find({})).length) {
		console.log('Populating Base Threads...');
		await baseThreadService.create(
			'Other',
			"This is where you can talk about anything you want. It doesn't need to be just SWTOR or Star Wars. You can post about other games, cars, IT discussions, politics, and everything that can't be found on the other threads.",
			'https://cdn-www.swtor.com/sites/all/files/en/forums/forum_8.png'
		);
		await baseThreadService.create(
			'RP',
			"If you want to RP on the site this is the place for you. This is the RP section of the forums where you can find all the forum RP you've ever wanted. You can also post about in-game RP and so on.",
			'https://cdn-www.swtor.com/sites/all/files/en/forums/forum_423.png'
		);
		await baseThreadService.create(
			'PVP',
			'This is the place to discuss everything PVP related. From questions about gear, stats, guides, discussions and everything else related to PVP in SWTOR. You can also post about PVP guilds, recruitment and more.',
			'https://cdn-www.swtor.com/sites/all/files/en/forums/forum_76.png'
		);
		await baseThreadService.create(
			'PVE',
			'This is the place to talk about PVE. Best gear and stats for flashpoints, operations. You can post guides about PVE content here from leveling guides to FP and OP guides. You can also post about PVE guild recruitment and give information about your guild here.',
			'https://cdn-www.swtor.com/sites/all/files/en/forums/forum_88.png'
		);
		await baseThreadService.create(
			'Fashion',
			'This is the place to show of your character to other people. You can post cool, more modified images of your character. Here you can ask about items and how to combine them to make a cooler character in-game.',
			'https://cdn-www.swtor.com/sites/all/files/en/forums/forum_245.png'
		);
		console.log('Base Threads populated!');
	}
};

const populateNews = async function () {
	const data = await scrapeService.scrapeNews();
	const uniqueData = await newsService.unique(data);
	await News.insertMany(uniqueData);
};

const populateDb = async function () {
	await populateUsers();
	await populateBaseThreads();
	await populateNews();
};

module.exports = {
	populateDb,
};
