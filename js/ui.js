document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navbarMenu = document.querySelector('.navbar-menu');

    mobileMenu.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
    });

    // Homepage All Grad Pic Slide animation
    const upperImage = document.getElementById('upper');
    const lowerImage = document.getElementById('lower');
    const groupPictureWrapper = document.querySelector('.group_picture-wrapper');

    if (upperImage && lowerImage) {
        let imagesLoaded = 0;

        function checkImagesLoaded(){
            imagesLoaded += 1;
            if (imagesLoaded === 2) {
                // Both images are loaded, add the animated class
                groupPictureWrapper.classList.add('animated');
            }
        }

        // Check if the images are already cached
        if (upperImage.complete) {
            checkImagesLoaded();
        } else {
            upperImage.addEventListener('load', checkImagesLoaded);
        }

        if (lowerImage.complete) {
            checkImagesLoaded();
        } else {
            lowerImage.addEventListener('load', checkImagesLoaded);
        }

    }

    // navbar transparency
    const navbar = document.querySelector(".navbar");
    let homescreen = document.getElementById('homescreen');

    if (homescreen) {
        window.addEventListener("scroll", function() {
            if (window.scrollY > 100) {
                navbar.classList.remove("navbar-transparent");
            } else {
                navbar.classList.add("navbar-transparent");
            }
        });
    }

    // Parallax
    let title = document.getElementById('asilakon_title');
    let hub = document.getElementById('graduates_hub_title');

    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;
        // const viewStudents = document.querySelector('.view_students');

        if (title) {
            title.style.marginTop = scrollPosition * 1.5 + 'px';
        }
        if (hub) {
            hub.style.marginTop = scrollPosition * -0.5 + 'px';

        }   


        // viewStudents.forEach(object => {
        //     object.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        // });
        let backgroundLabel = document.getElementById('background_label');
        if (backgroundLabel) {
            backgroundLabel.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        } 
        // document.getElementById('curie_button').style.transform = `translateY(${scrollPosition * 0.01}px)`;
        // document.getElementById('einstein_button').style.transform = `translateY(${scrollPosition * 0.01}px)`;
        // document.getElementById('tesla_button').style.transform = `translateY(${scrollPosition * 0.01}px)`;

    });
});