// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Scroll Animation
function checkFadeElements() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Run on page load
checkFadeElements();

// Run on scroll
window.addEventListener('scroll', checkFadeElements);

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

function runCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(runCounters, 1);
        } else {
            counter.innerText = target.toLocaleString();
        }
    });
}

// Start counters when the stats section is in view
const statsSection = document.querySelector('.stats-container');
const statsSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runCounters();
            statsSectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsSectionObserver.observe(statsSection);
}

// Image Slider
const slides = document.querySelector('.slides');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let slideIndex = 0;

// Set up the slider if it exists on the page
if (slides && prevBtn && nextBtn) {
    const slideWidth = slides.clientWidth;
    const slideCount = slides.children.length;
    
    // Clone first slide and append to end for infinite loop effect
    const firstSlideClone = slides.children[0].cloneNode(true);
    slides.appendChild(firstSlideClone);
    
    function goToSlide(index) {
        slides.style.transform = `translateX(${-index * 100}%)`;
        slideIndex = index;
    }
    
    function nextSlide() {
        if (slideIndex === slideCount) {
            // If we're on the clone, quickly reset to the first slide without animation
            slides.style.transition = 'none';
            goToSlide(0);
            // Force reflow to make the transition work again
            slides.offsetHeight;
            slides.style.transition = 'transform 0.5s ease';
            goToSlide(1);
        } else {
            goToSlide(slideIndex + 1);
        }
    }
    
    function prevSlide() {
        if (slideIndex === 0) {
            // If we're on the first slide, quickly go to the last real slide without animation
            slides.style.transition = 'none';
            goToSlide(slideCount);
            // Force reflow to make the transition work again
            slides.offsetHeight;
            slides.style.transition = 'transform 0.5s ease';
            goToSlide(slideCount - 1);
        } else {
            goToSlide(slideIndex - 1);
        }
    }
    
    // Event listeners for buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto slide on hover
    slides.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slides.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Handle transition end for infinite loop
    slides.addEventListener('transitionend', () => {
        if (slideIndex === slideCount) {
            slides.style.transition = 'none';
            goToSlide(0);
            // Force reflow
            slides.offsetHeight;
            slides.style.transition = 'transform 0.5s ease';
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to nav items based on scroll position
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Add active class to home when at the top
    if (scrollPosition < 100) {
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#') {
                link.classList.add('active');
            }
        });
    }
});