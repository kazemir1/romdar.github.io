
document.addEventListener('DOMContentLoaded', function() {
  // Определяем текущую страницу
  const currentPage = window.location.pathname.split('/').pop().split('.')[0] || 'home';

  // Устанавливаем активную иконку
  document.querySelectorAll('.nav-icon').forEach(icon => {
    if (icon.getAttribute('data-page') === currentPage) {
      icon.classList.add('active');
    }

    // Обработчик клика
    icon.addEventListener('click', function(e) {
      e.preventDefault();

      // Удаляем активный класс у всех иконок
      document.querySelectorAll('.nav-icon').forEach(i => {
        i.classList.remove('active');
      });

      // Добавляем активный класс текущей иконке
      this.classList.add('active');

      // Плавный переход через 300мс
      setTimeout(() => {
        window.location.href = this.href;
      }, 300);
    });
  });

  // Если переход со страницы "Продолжить", активируем первую иконку
  if (document.referrer.includes('index.html') && !currentPage) {
    const firstIcon = document.querySelector('.nav-icon[data-page="home"]');
    if (firstIcon) firstIcon.classList.add('active');
  }
});



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
