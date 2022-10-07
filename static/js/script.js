addEventListener('DOMContentLoaded', function () {
	document.querySelector('body').classList.remove('preload');
});

document.querySelectorAll('.clickable-td').forEach((x) => {
	x.addEventListener('click', function (e) {
		e.currentTarget.querySelector('a').click();
	});
});

document.querySelector('.new-thread-btn').addEventListener('click', (e) => {
	const threadCreateForm = document.querySelector('.thread-create');
	e.currentTarget.innerHTML =
		e.currentTarget.innerHTML === 'Create new' ? 'Close' : 'Create new';
	threadCreateForm.classList.toggle('active-thread');
});

document.querySelector('.up').addEventListener('click', async (e) => {
	const test = await fetch('http://localhost:3000/api/votes', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			postId: '633e9867e6b5f84ecf804e44',
			voteType: 'upvote',
		}),
	});

	console.log(test);
});
