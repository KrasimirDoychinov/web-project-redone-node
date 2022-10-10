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

document.querySelectorAll('.vote').forEach((x) => {
	x.addEventListener('click', async (e) => {
		const type = e.currentTarget.dataset.type;
		const container = e.currentTarget.parentElement.parentElement;
		const postId = container.dataset.id;
		console.log(postId);
		console.log(type);
		const res = await fetch('http://localhost:3000/api/votes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				postId: postId,
				voteType: type,
			}),
		});

		const data = await res.json();
		container.querySelector('#post-votes').innerHTML = data.newVotes;
	});
});
// document.querySelectorAll('.up').forEach((x) => {
// 	x.addEventListener('click', async (e) => {
// 		const container = e.currentTarget.parentElement.parentElement;
// 		const postId = container.dataset.id;
// 		const res = await fetch('http://localhost:3000/api/votes', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({
// 				postId: postId,
// 				voteType: 'upvote',
// 			}),
// 		});

// 		const data = await res.json();
// 		container.querySelector('#post-votes').innerHTML = data.newVotes;
// 	});
// });

// document.querySelectorAll('.down').forEach((x) => {
// 	x.addEventListener('click', async (e) => {
// 		const container = e.currentTarget.parentElement.parentElement;
// 		const postId = container.dataset.id;
// 		const res = await fetch('http://localhost:3000/api/votes', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({
// 				postId: postId,
// 				voteType: 'downvote',
// 			}),
// 		});

// 		const data = await res.json();
// 		container.querySelector('#post-votes').innerHTML = data.newVotes;
// 	});
// });
