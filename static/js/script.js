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
		e.currentTarget.innerHTML === 'Create new thread'
			? 'Close'
			: 'Create new thread';
	threadCreateForm.classList.toggle('active-thread');
});
