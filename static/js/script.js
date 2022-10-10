const host = 'http://localhost:3000/api/';

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
		const container = e.currentTarget.parentElement.parentElement.parentElement;
		const postId = container.dataset.id;
		const res = await fetch(`${host}/votes`, {
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
		if (!data.success) {
			alert('There was an error');
			return;
		}
		container.querySelector('#post-votes').innerHTML = data.newVotes;
	});
});

document.querySelectorAll('.edit-btn').forEach((x) => {
	x.addEventListener('click', (e) => {
		const container = e.currentTarget.parentElement.parentElement.parentElement;
		const saveBtn = container.querySelector('.save-btn');
		const textarea = container.parentElement.querySelector(
			'.thread-post-content > textarea'
		);

		textarea.disabled = textarea.disabled === true ? false : true;
		e.currentTarget.innerHTML = textarea.disabled ? 'Edit' : 'Close';
		saveBtn.classList.toggle('hidden');
	});
});

document.querySelectorAll('.save-btn').forEach((x) => {
	x.addEventListener('click', async (e) => {
		const id = e.currentTarget.dataset.id;
		const container = e.currentTarget.parentElement.parentElement.parentElement;
		const editBtn = container.querySelector('.edit-btn');
		const textarea = container.parentElement.querySelector(
			'.thread-post-content > textarea'
		);

		const endpoint = e.currentTarget.dataset.endpoint;
		e.currentTarget.classList.toggle('hidden');
		const res = await fetch(`${host}/${endpoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: id,
				description: textarea.value,
			}),
		});
		const data = await res.json();
		if (!data.success) {
			alert('There was an error');
			return;
		}
		textarea.disabled = textarea.disabled === true ? false : true;
		editBtn.innerHTML = textarea.disabled ? 'Edit' : 'Close';
	});
});
