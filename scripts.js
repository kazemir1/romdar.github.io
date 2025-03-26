// Запрет прокрутки страницы
document.body.style.overflow = 'hidden';

// Если пользователь все же попытается прокрутить, вернем его наверх
window.addEventListener('scroll', () => {
    window.scrollTo(0, 0);
});

// Элементы
const bottomNav = document.getElementById('bottomNav');
const swipeFill = document.getElementById('swipeFill');
const dynamicText = document.getElementById('dynamicText');

// Обработка свайпа (для мобильных устройств)
let startX = 0;
let isSwiping = false;

bottomNav.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
    e.preventDefault(); // Предотвращаем скролл страницы
}, { passive: false });

bottomNav.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;

    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;

    if (deltaX > 0) {
        const fillWidth = Math.min((deltaX / bottomNav.offsetWidth) * 100, 100);
        swipeFill.style.width = `${fillWidth}%`;

        // Плавное исчезновение текста и стрелочек
        const opacity = 1 - (fillWidth / 100);
        dynamicText.style.opacity = opacity;
        document.querySelector('.arrows').style.opacity = opacity;
    }
}, { passive: false });

bottomNav.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    isSwiping = false;

    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (deltaX > bottomNav.offsetWidth * 0.3) { // 30% ширины для срабатывания
        swipeFill.style.width = '100%';
        setTimeout(() => {
            window.location.href = 'index2.html'; // Переход на index2.html
        }, 300);
    } else {
        swipeFill.style.width = '0%';
        dynamicText.style.opacity = 1;
        document.querySelector('.arrows').style.opacity = 1;
    }
});

// Обработка клика (для ПК)
bottomNav.addEventListener('click', () => {
    swipeFill.style.width = '100%';
    setTimeout(() => {
        window.location.href = 'index2.html';
    }, 300);
});
