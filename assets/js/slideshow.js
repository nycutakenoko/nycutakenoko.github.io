(function () {
	document.querySelectorAll('.simple-slideshow').forEach(function (root) {
		var imgs = root.querySelectorAll('.simple-slideshow-track img');
		if (imgs.length < 2) return;
		var idx = 0;
		function show(n) {
			imgs[idx].classList.remove('active');
			idx = (n + imgs.length) % imgs.length;
			imgs[idx].classList.add('active');
		}
		var prev = root.querySelector('.ss-prev');
		var next = root.querySelector('.ss-next');
		if (prev) prev.addEventListener('click', function () { show(idx - 1); });
		if (next) next.addEventListener('click', function () { show(idx + 1); });
		setInterval(function () { show(idx + 1); }, 5000);
	});
})();
