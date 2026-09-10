const menuToggle = document.querySelector('.menu-toggle');
const navPrincipal = document.querySelector('.nav-principal');

if (menuToggle && navPrincipal) {
	menuToggle.addEventListener('click', () => {
		const isOpen = navPrincipal.classList.toggle('is-open');
		menuToggle.setAttribute('aria-expanded', String(isOpen));
	});

	navPrincipal.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => {
			navPrincipal.classList.remove('is-open');
			menuToggle.setAttribute('aria-expanded', 'false');
		});
	});
}
