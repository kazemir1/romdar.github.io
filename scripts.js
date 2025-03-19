
// Получаем хедер
const header = document.getElementById('header');

// Функция для изменения стилей хедера при прокрутке
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) { // Если прокрутили больше 50px
    header.classList.add('scrolled'); // Добавляем класс scrolled
  } else {
    header.classList.remove('scrolled'); // Убираем класс scrolled
  }
});

// Получаем блок с текстом
const photoText = document.querySelector('.photo-text');

// Функция для появления текста при прокрутке
window.addEventListener('scroll', () => {
  const twoPhotos = document.querySelector('.two-photos');
  const twoPhotosRect = twoPhotos.getBoundingClientRect();

  // Если блок с фотографиями виден на экране
  if (twoPhotosRect.top < window.innerHeight && twoPhotosRect.bottom > 0) {
    const scrollProgress = (window.innerHeight - twoPhotosRect.top) / window.innerHeight;
    photoText.style.opacity = scrollProgress; // Плавное появление текста
    photoText.style.transform = `translate(-50%, ${-50 + scrollProgress * -10}%)`; // Плавное смещение текста
  }
});

// JavaScript меню
document.querySelector('.menu-icon').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.add('active');
    document.querySelector('.overlay').style.display = 'block';
});

document.querySelector('.overlay').addEventListener('click', closeMenu);
document.querySelector('.close-btn').addEventListener('click', closeMenu);

function closeMenu() {
    document.querySelector('.sidebar').classList.remove('active');
    document.querySelector('.overlay').style.display = 'none';
}
