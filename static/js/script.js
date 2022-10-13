const host = 'http://localhost:3000/api/';

addEventListener('DOMContentLoaded', function () {
	document.querySelector('body').classList.remove('preload');

	document.querySelectorAll('textarea').forEach((x) => {
		x.style.height = 'auto';
		x.style.height = x.scrollHeight + 'px';

		x.addEventListener('input', (e) => {
			e.currentTarget.style.height = 'auto';
			e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
		});
	});
});
