(function () {
	var overlay = document.createElement('div');
	overlay.className = 'lightbox-overlay';
	overlay.innerHTML =
		'<button type="button" class="lightbox-close" aria-label="關閉">&times;</button>' +
		'<button type="button" class="lightbox-prev" aria-label="上一張">&#8249;</button>' +
		'<img alt="">' +
		'<button type="button" class="lightbox-next" aria-label="下一張">&#8250;</button>';
	document.body.appendChild(overlay);

	var imgEl = overlay.querySelector('img');
	var closeBtn = overlay.querySelector('.lightbox-close');
	var prevBtn = overlay.querySelector('.lightbox-prev');
	var nextBtn = overlay.querySelector('.lightbox-next');

	var items = [];
	var index = 0;

	function show(i) {
		index = (i + items.length) % items.length;
		imgEl.src = items[index].getAttribute('href');
	}

	function open(group, i) {
		items = group;
		show(i);
		overlay.classList.add('open');
	}

	function close() {
		overlay.classList.remove('open');
		imgEl.src = '';
	}

	document.querySelectorAll('.gallery').forEach(function (gallery) {
		var links = Array.prototype.slice.call(gallery.querySelectorAll('.gallery-item'));
		links.forEach(function (link, i) {
			link.addEventListener('click', function (e) {
				e.preventDefault();
				open(links, i);
			});
		});
	});

	closeBtn.addEventListener('click', close);
	prevBtn.addEventListener('click', function () { show(index - 1); });
	nextBtn.addEventListener('click', function () { show(index + 1); });
	overlay.addEventListener('click', function (e) {
		if (e.target === overlay) close();
	});
	document.addEventListener('keydown', function (e) {
		if (!overlay.classList.contains('open')) return;
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowLeft') show(index - 1);
		if (e.key === 'ArrowRight') show(index + 1);
	});
})();
