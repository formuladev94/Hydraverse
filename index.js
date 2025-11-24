// FUNCIONALIDAD DE LA BARRA DE NAVEGACIÓN ////

document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - document.querySelector('.navbar').offsetHeight,
                behavior: 'smooth'
            });
        }
    });
});


// FUNCIONALIDAD DEL MENU HAMBURGUESA ////

document.addEventListener('DOMContentLoaded', function() {

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {

            navLinks.classList.toggle('active');

            menuToggle.classList.toggle('open');

        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('open');
                }
            });
        });
    }
});