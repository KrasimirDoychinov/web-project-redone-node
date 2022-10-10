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

document.querySelectorAll('.up').forEach((x) => {
	x.addEventListener('click', async (e) => {
		const postId = e.currentTarget.parentElement.parentElement.dataset.id;
		const res = await fetch('http://localhost:3000/api/votes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				postId: postId,
				voteType: 'upvote',
			}),
		});

		const data = await res.json();
		document.querySelector('#post-votes').innerHTML = data.newVotes;
	});
});

document.querySelectorAll('.down').forEach((x) => {
	x.addEventListener('click', async (e) => {
		const postId = e.currentTarget.parentElement.parentElement.dataset.id;
		const res = await fetch('http://localhost:3000/api/votes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				postId: postId,
				voteType: 'downvote',
			}),
		});

		const data = await res.json();
		document.querySelector('#post-votes').innerHTML = data.newVotes;
	});
});
