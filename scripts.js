// Обработка клика по кнопке "Продолжить"
const continueButton = document.querySelector('.continue-button');
if (continueButton) {
    continueButton.addEventListener('click', () => {
        alert('Вы нажали "Продолжить"!');
        // Здесь можно добавить переход на следующую страницу
    });
}

// Обработка свайпа на мобильных устройствах
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX > touchStartX && touchEndX - touchStartX > 50) {
        alert('Свайп вправо зарегистрирован!');
        // Здесь можно добавить переход на следующую страницу
    }
}
