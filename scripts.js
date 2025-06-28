window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.remove('transparent-header');
        header.classList.add('scrolled');
    } else {
        header.classList.add('transparent-header');
        header.classList.remove('scrolled');
    }
});

// Параллакс эффект для кнопок
document.querySelectorAll('nav a').forEach(link => {
    const text = link.querySelector('span');
    const letters = text.textContent.split('');

    text.innerHTML = letters.map(letter =>
        `<span class="letter" style="transition-delay: ${Math.random()*0.1}s">${letter}</span>`
    ).join('');

    link.addEventListener('mouseenter', () => {
        link.querySelectorAll('.letter').forEach(letter => {
            letter.style.transform = 'translateY(-100%) rotateX(90deg)';
        });
    });

    link.addEventListener('mouseleave', () => {
        link.querySelectorAll('.letter').forEach(letter => {
            letter.style.transform = 'translateY(0) rotateX(0)';
        });
    });
});



// Анимация появления при скролле
document.addEventListener('DOMContentLoaded', function() {
    const hrSection = document.querySelector('.hr-infographic');
    const hrImage = document.querySelector('.hr-image');
    const hrTitle = document.querySelector('.hr-title');
    const hrDescription = document.querySelector('.hr-description');
    const hrFeatureCards = document.querySelectorAll('.hr-feature-card');

    // Загрузка изображения
    if (hrImage) {
        const img = new Image();
        img.src = hrImage.src;
        img.onload = function() {
            hrImage.classList.add('hr-image-loaded');
        };
    }

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Анимация заголовка и описания
                hrTitle.classList.add('hr-title-visible');
                hrDescription.classList.add('hr-description-visible');

                // Анимация карточек
                hrFeatureCards.forEach(card => {
                    card.classList.add('hr-feature-card-visible');
                });

                // Параллакс эффект
                document.addEventListener('mousemove', handleParallax);
            }
        });
    }, observerOptions);

    if (hrSection) {
        observer.observe(hrSection);
    }

    function handleParallax(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const hrImageWrapper = document.querySelector('.hr-image-wrapper');
        if (hrImageWrapper) {
            hrImageWrapper.style.transform = `rotateY(${x * 20 - 10}deg) rotateX(${y * -10 + 5}deg)`;
        }
    }

    // Плавное появление карточек при наведении
    hrFeatureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease-out';
        });
    });
});




document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileNav = document.querySelector('.mobile-nav');

    mobileMenuButton.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Lazy load animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('hr-image')) {
                    entry.target.classList.add('hr-image-loaded');
                }
                if (entry.target.classList.contains('hr-title')) {
                    entry.target.classList.add('hr-title-visible');
                }
                if (entry.target.classList.contains('hr-description')) {
                    entry.target.classList.add('hr-description-visible');
                }
                if (entry.target.classList.contains('hr-feature-card')) {
                    entry.target.classList.add('hr-feature-card-visible');
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hr-image, .hr-title, .hr-description, .hr-feature-card').forEach(el => {
        observer.observe(el);
    });

    // Prevent scrolling when mobile menu is open
    document.addEventListener('scroll', function(e) {
        if (document.body.classList.contains('no-scroll')) {
            e.preventDefault();
            window.scrollTo(0, 0);
        }
    }, { passive: false });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuButton.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
});
