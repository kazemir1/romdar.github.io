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



document.addEventListener('DOMContentLoaded', function() {
    // Данные
    const processData = {
        1: {
            title: "АНАЛИЗ ДОЛЖНОСТИ",
            icon: '<i class="fas fa-search"></i>',
            text: "ТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекст"
        },
        2: {
            title: "ОПИСАНИЕ СОТРУДНИКА",
            icon: '<i class="fas fa-user-tie"></i>',
            text: "ТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекст"
        },
        3: {
            title: "РАЗРАБОТКА МЕТОДОВ ОТБОРА",
            icon: '<i class="fas fa-filter"></i>',
            text: "ТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекст"
        },
        4: {
            title: "ПЕРЕДАЧА ИНСТРУМЕНТОВ ОТБОРА",
            icon: '<i class="fas fa-tools"></i>',
            text: "ТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекст"
        },
        5: {
            title: "СИСТЕМА АДАПТАЦИИ",
            icon: '<i class="fas fa-user-plus"></i>',
            text: "ТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекст"
        },
        6: {
            title: "СИСТЕМА ОБУЧЕНИЯ И РАЗВИТИЯ",
            icon: '<i class="fas fa-graduation-cap"></i>',
            text: "ТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекст"
        },
        7: {
            title: "СИСТЕМА МОТИВАЦИИ НА ОСНОВЕ KPI",
            icon: '<i class="fas fa-chart-line"></i>',
            text: "ТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекст"
        },
        8: {
            title: "ЦЕЛЕПОЛАГАНИЕ И УПРАВЛЕНИЕ РЕЗУЛЬТАТИВНОСТЬЮ",
            icon: '<i class="fas fa-bullseye"></i>',
            text: "ТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекстТекст ТекстТекстТекстТекстТекстТекстТекст"
        }
    };

    // Элементы
    const modal = document.getElementById('processModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');
    const modalIcon = document.getElementById('modalIcon');
    const closeModal = document.querySelector('.close-modal');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    let currentCard = 1;

    // Открытие модальное
    document.querySelectorAll('.process-card').forEach(card => {
        card.addEventListener('click', function() {
            currentCard = parseInt(this.getAttribute('data-card'));
            updateModal(currentCard);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Закрытие модальное
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Клик по фону модального
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Навигация по карточкам
    prevArrow.addEventListener('click', function() {
        if (currentCard > 1) {
            currentCard--;
            updateModal(currentCard);
        }
    });

    nextArrow.addEventListener('click', function() {
        if (currentCard < 8) {
            currentCard++;
            updateModal(currentCard);
        }
    });

    // Обновление содержимого модального окна
    function updateModal(cardNumber) {
        const cardData = processData[cardNumber];
        modalTitle.textContent = cardData.title;
        modalText.textContent = cardData.text;
        modalIcon.innerHTML = cardData.icon;

        // Скрываем/показываем кнопки навигации
        prevArrow.style.display = cardNumber === 1 ? 'none' : 'flex';
        nextArrow.style.display = cardNumber === 8 ? 'none' : 'flex';
    }

    // Анимация появления карточек
    const processCards = document.querySelectorAll('.process-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    processCards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});


//  sticky-блок
setTimeout(function() {
    document.getElementById('stickyDiscount').classList.add('active');
}, 10000); // 25 секунд

// Закрытие блока по клику на крестик
document.getElementById('closeSticky').addEventListener('click', function() {
    document.getElementById('stickyDiscount').classList.remove('active');
});

// "Получить скидку"
document.querySelector('.sticky-discount-button').addEventListener('click', function() {

    document.getElementById('stickyDiscount').classList.remove('active');
});
