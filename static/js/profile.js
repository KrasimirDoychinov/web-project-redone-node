document.querySelector('.profile-img').addEventListener('click', (e) => {
	const images = document.querySelector('.images');

	e.currentTarget.classList.toggle('hidden');
	images.classList.toggle('hidden');
});

document.querySelectorAll('.avatar-img').forEach((x) => {
	x.addEventListener('click', async (e) => {
		const avatar = document.querySelector('.profile-img');
		const images = document.querySelector('.images');
		const headerImg = document.querySelector('.header-img');

		const url = e.currentTarget.getAttribute('src');
		const res = await fetch(`${host}/updateAvatar`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				url,
			}),
		});

		const data = await res.json();
		if (!data.success) {
			alert('There was an error');
			console.log(data.error);
			return;
		}

		avatar.setAttribute('src', url);
		headerImg.setAttribute('src', url);

		avatar.classList.toggle('hidden');
		images.classList.toggle('hidden');
	});
});
