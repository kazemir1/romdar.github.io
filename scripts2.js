// Прелоадер
window.addEventListener('load', function() {
  const preloader = document.querySelector('.preloader');

  // Задержка для демонстрации (можно убрать)
  setTimeout(() => {
    preloader.classList.add('preloader--hidden');

    // Удаляем прелоадер из DOM после анимации
    preloader.addEventListener('transitionend', function() {
      this.remove();
    });
  }, 1000); // 1 секунда задержки
});

// Предзагрузка изображений (опционально)
function preloadImages() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    const src = img.getAttribute('src');
    if (src) {
      new Image().src = src;
    }
  });
}

document.addEventListener('DOMContentLoaded', preloadImages);


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
//document.querySelector('.menu-icon').addEventListener('click', () => {
//    document.querySelector('.sidebar').classList.add('active');
//    document.querySelector('.overlay').style.display = 'block';
//});

//document.querySelector('.overlay').addEventListener('click', closeMenu);
//document.querySelector('.close-btn').addEventListener('click', closeMenu);

//function closeMenu() {
  //  document.querySelector('.sidebar').classList.remove('active');
  //  document.querySelector('.overlay').style.display = 'none';
//}

//ббб1112233444
// Открытие модалки
// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  // Открытие модалки
  document.querySelectorAll('.full-product-button').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('productModal').classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Закрытие модалки - ТРИ надежных способа:

  // 1. По ID кнопки (самый надежный)
  document.getElementById('closeModal').addEventListener('click', function() {
    closeModal();
  });

  // 2. По классу (дублирующая проверка)
  document.querySelector('.close-modal').addEventListener('click', closeModal);

  // 3. Закрытие по клику вне окна
  document.getElementById('productModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal();
    }
  });

  // Функция для закрытия
  function closeModal() {
    document.getElementById('productModal').classList.remove('active');
    document.body.style.overflow = '';
  }
});
