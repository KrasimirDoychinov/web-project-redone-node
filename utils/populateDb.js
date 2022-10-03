const User = require('../models/User');
const bcrypt = require('bcrypt');

async function populateUsers() {
	async function createUser(name, password) {
		const newUser = new User({
			name,
			password,
		});

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(newUser.password, salt);

		newUser.password = hash;
		newUser.save().catch((err) => console.log(err));
	}
	if (!(await User.findOne({ name: 'admin' }))) {
		await createUser('admin', 'test123');
	}

	if (!(await User.findOne({ name: 'user' }))) {
		await createUser('user', 'test123');
	}
}

async function populateDb() {
	await populateUsers();
}

module.exports = {
	populateDb,
};
