(function () {
	var toggle = document.querySelector('.nav-toggle');
	var closeBtn = document.querySelector('.nav-close');
	var nav = document.querySelector('.main-nav');
	var backdrop = document.querySelector('.nav-backdrop');
	var rootUl = nav.querySelector('.nav-root');
	var stack = [rootUl];

	function isMobile() {
		return window.matchMedia('(max-width: 900px)').matches;
	}

	// inject a back button + title into every submenu panel
	nav.querySelectorAll('.submenu').forEach(function (submenu) {
		var head = document.createElement('li');
		head.className = 'nav-panel-head';
		var backBtn = document.createElement('button');
		backBtn.type = 'button';
		backBtn.className = 'nav-back-btn';
		backBtn.setAttribute('aria-label', '返回上一層');
		backBtn.textContent = '‹';
		var title = document.createElement('span');
		title.className = 'nav-panel-title';
		title.textContent = submenu.dataset.title || '';
		head.appendChild(backBtn);
		head.appendChild(title);
		submenu.insertBefore(head, submenu.firstChild);
	});

	function enterPanel(target) {
		var current = stack[stack.length - 1];
		current.classList.add('nav-prev');
		current.classList.remove('nav-current');
		target.classList.add('nav-current');
		target.classList.remove('nav-prev');
		stack.push(target);
		target.scrollTop = 0;
	}

	function exitPanel() {
		if (stack.length <= 1) return;
		var leaving = stack.pop();
		leaving.classList.remove('nav-current');
		var prev = stack[stack.length - 1];
		prev.classList.remove('nav-prev');
		if (prev !== rootUl) prev.classList.add('nav-current');
	}

	function resetPanels() {
		while (stack.length > 1) exitPanel();
	}

	function openMenu() {
		nav.classList.add('open');
		backdrop.classList.add('open');
		toggle.setAttribute('aria-expanded', 'true');
	}

	function closeMenu() {
		nav.classList.remove('open');
		backdrop.classList.remove('open');
		toggle.setAttribute('aria-expanded', 'false');
		resetPanels();
	}

	if (toggle && nav && backdrop) {
		toggle.addEventListener('click', function () {
			if (nav.classList.contains('open')) closeMenu(); else openMenu();
		});
	}
	if (closeBtn) closeBtn.addEventListener('click', closeMenu);
	if (backdrop) backdrop.addEventListener('click', closeMenu);

	nav.addEventListener('click', function (e) {
		if (e.target.closest('.nav-back-btn')) {
			e.preventDefault();
			exitPanel();
		}
	});

	// tap-to-open submenus at any nesting level, on narrow layouts;
	// on wide layouts, desktop hover handles these instead
	nav.querySelectorAll('li').forEach(function (li) {
		var link = li.querySelector(':scope > a');
		var submenu = li.querySelector(':scope > .submenu');
		if (!link || !submenu) return;
		link.addEventListener('click', function (e) {
			if (isMobile()) {
				e.preventDefault();
				enterPanel(submenu);
			}
		});
	});
})();
