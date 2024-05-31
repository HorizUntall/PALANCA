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
    }

    // Curie Button
    const viewCurie = document.getElementById('curie_button');
    viewCurie.addEventListener('click', () => {
        console.log("Curie");
    });

    //Einstein Button
    const viewEinstein = document.getElementById('einstein_button');
    viewEinstein.addEventListener('click', () => {
        console.log("Einstein")
    });

    //Tesla Button
    const viewTesla = document.getElementById('tesla_button');
    viewTesla.addEventListener('click', () =>{
        console.log("Tesla")
    })

});
