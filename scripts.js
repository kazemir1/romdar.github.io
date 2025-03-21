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

bottomNav.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; // Фиксируем начальную позицию касания
});

bottomNav.addEventListener('touchmove', (e) => {
    const currentX = e.touches[0].clientX; // Текущая позиция пальца
    const deltaX = currentX - startX; // Разница между начальной и текущей позицией

    if (deltaX > 0) {
        const fillWidth = (deltaX / bottomNav.offsetWidth) * 100; // Процент заполнения
        swipeFill.style.width = `${fillWidth}%`; // Заполняем панель черным фоном

        // Плавное исчезновение текста и стрелочек
        dynamicText.style.opacity = 1 - fillWidth / 100;
        document.querySelector('.arrows').style.opacity = 1 - fillWidth / 100;
    }
});

bottomNav.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX; // Фиксируем конечную позицию касания
    const deltaX = endX - startX; // Разница между начальной и конечной позицией

    // Если свайп вправо больше 50% ширины панели
    if (deltaX > bottomNav.offsetWidth / 2) {
        window.location.href = 'next-page.html'; // Переход на следующую страницу
    } else {
        // Сбрасываем заполнение и возвращаем текст
        swipeFill.style.width = '0%';
        dynamicText.style.opacity = 1;
        document.querySelector('.arrows').style.opacity = 1;
    }
});

// Обработка клика (для ПК)
bottomNav.addEventListener('click', () => {
    window.location.href = 'next-page.html'; // Переход на следующую страницу
});
