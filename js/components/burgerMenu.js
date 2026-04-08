export function initBurger() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const body = document.body;

    if (!burger || !nav) return;

    const closeMenu = () => {
        burger.classList.remove('active');
        nav.classList.remove('active');
        body.classList.remove('no-scroll');
    };

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });

    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 760) {
            closeMenu();
        }
    });
}