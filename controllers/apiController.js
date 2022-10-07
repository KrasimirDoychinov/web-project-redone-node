const { vote } = require('../services/voteService');

const votes = async function (req, res) {
	const { postId, voteType } = req.body;
	console.log('test');
	try {
		const newVotes = await vote(postId, voteType);
		res.send({ success: true, newVotes });
	} catch (error) {
		res.send({ success: false, erorr });
	}
};

module.exports = {
	votes,
};
