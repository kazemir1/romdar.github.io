// Обработка клика по кнопке "Продолжить" (ПК)
const continueButton = document.querySelector('.continue-button');
if (continueButton) {
    continueButton.addEventListener('click', () => {
        alert('Вы нажали "Продолжить"!');
        // Здесь можно добавить переход на следующую страницу
    });
}

// Обработка свайпа на мобильных устройствах
const swipeTrack = document.querySelector('.swipe-track');
const swipeFill = document.querySelector('.swipe-fill');
const swipeText = document.querySelector('.swipe-text');

let touchStartX = 0;
let touchEndX = 0;
let isSwiped = false;

swipeTrack.addEventListener('touchstart', (e) => {
    if (isSwiped) return; // Если свайп уже выполнен, ничего не делаем
    touchStartX = e.changedTouches[0].clientX;
});

swipeTrack.addEventListener('touchmove', (e) => {
    if (isSwiped) return;
    touchEndX = e.changedTouches[0].clientX;
    const distance = touchEndX - touchStartX;
    if (distance > 0) {
        const fillWidth = Math.min((distance / swipeTrack.offsetWidth) * 100, 100);
        swipeFill.style.width = `${fillWidth}%`;
    }
});

swipeTrack.addEventListener('touchend', (e) => {
    if (isSwiped) return;
    touchEndX = e.changedTouches[0].clientX;
    const distance = touchEndX - touchStartX;
    if (distance > swipeTrack.offsetWidth * 0.5) { // Свайп на 50% ширины
        swipeFill.style.width = '100%';
        swipeText.style.color = 'white';
        isSwiped = true;
        alert('Свайп вправо зарегистрирован!');
        // Здесь можно добавить переход на следующую страницу
    } else {
        swipeFill.style.width = '0%';
    }
});
