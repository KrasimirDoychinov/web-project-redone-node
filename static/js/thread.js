document.querySelectorAll('.clickable-td').forEach((x) => {
	x.addEventListener('click', function (e) {
		e.currentTarget.querySelector('a').click();
	});
});

document.querySelector('.create-new-btn').addEventListener('click', (e) => {
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
			'.thread-post-content > .description'
		);

		const tinyMce = container.parentElement.querySelector(
			'.thread-post-content .tox-tinymce'
		);

		textarea.classList.toggle('hidden');
		tinyMce.classList.toggle('show-tinymce');
		e.currentTarget.innerHTML = !textarea.classList.contains('hidden')
			? 'Edit'
			: 'Close';
		saveBtn.classList.toggle('hidden');
	});
});

document.querySelectorAll('.save-btn').forEach((x) => {
	x.addEventListener('click', async (e) => {
		const id = e.currentTarget.dataset.id;
		const container = e.currentTarget.parentElement.parentElement.parentElement;
		const editBtn = container.querySelector('.edit-btn');
		const textarea = container.parentElement.querySelector(
			'.thread-post-content > .description'
		);

		const tinyMce = container.parentElement.querySelector(
			'.thread-post-content .tox-tinymce'
		);

		const tinyMceTextarea = container.parentElement.querySelector(
			'.thread-post-content .tinymce'
		);

		const tinyMceTextareaValue = tinymce.get(tinyMceTextarea.id).getContent();

		const endpoint = e.currentTarget.dataset.endpoint;
		e.currentTarget.classList.toggle('hidden');
		const res = await fetch(`${host}/${endpoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: id,
				description: tinyMceTextareaValue,
			}),
		});

		const data = await res.json();
		if (!data.success) {
			alert('There was an error');
			return;
		}

		textarea.classList.toggle('hidden');
		tinyMce.classList.toggle('show-tinymce');
		textarea.innerHTML = tinyMceTextareaValue;
		editBtn.innerHTML = !textarea.classList.contains('hidden')
			? 'Edit'
			: 'Close';
	});
});

document.querySelectorAll('.delete-btn').forEach((x) => {
	x.addEventListener('click', (e) => {
		const container =
			e.currentTarget.parentElement.querySelector('.agree-container');

		container.classList.toggle('hidden');
		e.currentTarget.innerHTML = container.classList.contains('hidden')
			? 'Delete'
			: 'Close';
	});
});

document.querySelector('.extra-info-btn').addEventListener('click', (e) => {
	const extraInfoMain = document.querySelector('.extra-info-main');
	e.currentTarget.classList.toggle('rotate-180');
	extraInfoMain.classList.toggle('hidden');
});
