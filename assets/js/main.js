// Formspree Contact Form Submission
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const action = form.action;

        formStatus.innerHTML = 'Gönderiliyor...';
        formStatus.className = 'text-center mt-4 text-gray-600';

        fetch(action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                formStatus.innerHTML = "Teşekkürler! Mesajınız başarıyla gönderildi.";
                formStatus.className = 'text-center mt-4 text-green-600';
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.innerHTML = "Oops! Bir şeyler ters gitti ve mesajınız gönderilemedi.";
                        formStatus.className = 'text-center mt-4 text-red-600';
                    }
                })
            }
        }).catch(error => {
            formStatus.innerHTML = "Oops! Bir şeyler ters gitti ve mesajınız gönderilemedi.";
            formStatus.className = 'text-center mt-4 text-red-600';
        });
    });
}

// Gallery Lightbox
const galleryImages = document.querySelectorAll('.gallery-item');
if (galleryImages.length > 0) {
    galleryImages.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const imageUrl = item.querySelector('img').src;
            basicLightbox.create(`
                <img src="${imageUrl}" style="max-width: 90vw; max-height: 90vh;">
            `).show();
        });
    });
}

// Create therapy particles
const particlesContainer = document.getElementById('particles-container');
const numParticles = 30;

for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.classList.add('therapy-particle');
    
    // Random size between 3 and 8px (much smaller)
    const size = Math.random() * 8 + 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random opacity (much more subtle)
    particle.style.opacity = Math.random() * 0.15 + 0.05;
    
    particlesContainer.appendChild(particle);
    
    // Animate particles
    animateParticle(particle);
}

function animateParticle(particle) {
    let x = parseFloat(particle.style.left);
    let y = parseFloat(particle.style.top);
    let xSpeed = (Math.random() - 0.5) * 0.2;
    let ySpeed = (Math.random() - 0.5) * 0.2;
    
    function move() {
        x += xSpeed;
        y += ySpeed;
        
        // Bounce off edges
        if (x <= 0 || x >= 100) xSpeed *= -1;
        if (y <= 0 || y >= 100) ySpeed *= -1;
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        requestAnimationFrame(move);
    }
    
    move();
}

// Hide/show dark mode button on scroll
let lastScrollTop = 0;
const darkModeBtn = document.getElementById('darkModeToggle');
window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        darkModeBtn.style.transform = 'translateY(-50px)';
    } else {
        // Scrolling up
        darkModeBtn.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Add animation to timeline items when they come into view
const timelineItems = document.querySelectorAll('.timeline-item');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.6s ease';
    observer.observe(item);
});

// Back to top button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.remove('opacity-0', 'invisible');
        backToTopBtn.classList.add('opacity-100', 'visible');
    } else {
        backToTopBtn.classList.remove('opacity-100', 'visible');
        backToTopBtn.classList.add('opacity-0', 'invisible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check local storage - default to light mode
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    darkModeIcon.classList.replace('fa-moon', 'fa-sun');
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
    
    if (isDark) {
        darkModeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        darkModeIcon.classList.replace('fa-sun', 'fa-moon');
    }
}); 