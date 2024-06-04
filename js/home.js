// home.js

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navbarMenu = document.querySelector('.navbar-menu');

    mobileMenu.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
    });

    // navbar transparency
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 100) {
            navbar.classList.remove("navbar-transparent");
        } else {
            navbar.classList.add("navbar-transparent");
        }
    });

    // Initialize the navbar as transparent
    if (window.scrollY <= 50) {
        navbar.classList.add("navbar-transparent");
    };

    // Parallax
    let title = document.getElementById('asilakon_title');
    let hub = document.getElementById('graduates_hub_title');

    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;
        const viewStudents = document.querySelector('.view_students');

        title.style.marginTop = scrollPosition * 1.5 + 'px';
        hub.style.marginTop = scrollPosition * -0.5 + 'px';

        // viewStudents.forEach(object => {
        //     object.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        // });

        document.getElementById('background_label').style.transform = `translateY(${scrollPosition * 0.2}px)`;
        // document.getElementById('curie_button').style.transform = `translateY(${scrollPosition * 0.01}px)`;
        // document.getElementById('einstein_button').style.transform = `translateY(${scrollPosition * 0.01}px)`;
        // document.getElementById('tesla_button').style.transform = `translateY(${scrollPosition * 0.01}px)`;

    });
});


function scrollToSection(target) {
    document.getElementById(target).scrollIntoView({
        behavior: 'smooth'
    });
}

function nextAndscroll(page, target) {
    window.location.href= page;
    document.getElementById(target).scrollIntoView({
        behavior: 'smooth'
    });
}