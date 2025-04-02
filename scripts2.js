// Прелоадер
window.addEventListener('load', function() {
  const preloader = document.querySelector('.preloader');
  if (!preloader) return;

  setTimeout(() => {
    preloader.classList.add('preloader--hidden');
    preloader.addEventListener('transitionend', function() {
      this.remove();
    });
  }, 1000);
});

// Предзагрузка изображений
function preloadImages() {
  document.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    if (src) new Image().src = src;
  });
}

// Основной код
document.addEventListener('DOMContentLoaded', function() {
  preloadImages();

  // Навигация
  const currentPage = window.location.pathname.split('/').pop().split('.')[0] || 'home';
  document.querySelectorAll('.nav-icon').forEach(icon => {
    if (icon.getAttribute('data-page') === currentPage) {
      icon.classList.add('active');
    }

    icon.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelectorAll('.nav-icon').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      setTimeout(() => { window.location.href = this.href; }, 300);
    });
  });

  if (document.referrer.includes('index.html') && !currentPage) {
    const firstIcon = document.querySelector('.nav-icon[data-page="home"]');
    if (firstIcon) firstIcon.classList.add('active');
  }

  // Хедер при скролле
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Анимация текста
  const photoText = document.querySelector('.photo-text');
  const twoPhotos = document.querySelector('.two-photos');
  if (photoText && twoPhotos) {
    window.addEventListener('scroll', () => {
      const rect = twoPhotos.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = (window.innerHeight - rect.top) / window.innerHeight;
        photoText.style.opacity = progress;
        photoText.style.transform = `translate(-50%, ${-50 + progress * -10}%)`;
      }
    });
  }

  // Модальное окно товара
  const modal = document.getElementById('productModal');
  if (modal) {
    const modalElements = {
      close: modal.querySelector('.modal-close'),
      image: modal.querySelector('.modal-product-image'),
      title: modal.querySelector('.modal-product-title'),
      price: modal.querySelector('.modal-product-price'),
      desc: modal.querySelector('.modal-product-description'),
      size: document.getElementById('size'),
      color: document.getElementById('color'),
      gift: document.getElementById('giftWrap'),
      addBtn: modal.querySelector('.add-to-cart'),
      buyBtn: modal.querySelector('.buy-now')
    };

    const prices = {
      size: { 'S': 0, 'M': 500, 'L': 800, 'XL': 1000 },
      color: { 'black': 0, 'red': 300, 'turquoise': 500, 'pink': 400 },
      gift: 500
    };

    let currentBasePrice = 0;

    // Функции для работы с модальным окном
    const formatPrice = price => new Intl.NumberFormat('ru-RU').format(price) + '₽';

    const updatePrice = () => {
      const total = currentBasePrice +
                   prices.size[modalElements.size.value] +
                   prices.color[modalElements.color.value] +
                   (modalElements.gift.checked ? prices.gift : 0);

      modalElements.price.textContent = formatPrice(total);

      const priceBreakdown = modal.querySelector('.price-breakdown');
      if (priceBreakdown) {
        priceBreakdown.querySelector('.base-price-amount').textContent = formatPrice(currentBasePrice);
        priceBreakdown.querySelector('.size-price-amount').textContent = `+${formatPrice(prices.size[modalElements.size.value])}`;
        priceBreakdown.querySelector('.color-price-amount').textContent = `+${formatPrice(prices.color[modalElements.color.value])}`;
        priceBreakdown.querySelector('.gift-price-amount').textContent =
          modalElements.gift.checked ? `+${formatPrice(prices.gift)}` : '+0₽';
        priceBreakdown.querySelector('.total-price-amount').textContent = formatPrice(total);
      }
    };

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    };

    const addToCart = () => {
      const item = {
        title: modalElements.title.textContent,
        price: modalElements.price.textContent,
        size: modalElements.size.value,
        color: modalElements.color.value,
        giftWrap: modalElements.gift.checked
      };
      console.log('Добавлено в корзину:', item);
      // Здесь можно добавить реальную логику корзины
    };

    // Обработчики событий
    document.querySelectorAll('.full-product-button').forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.full-product-card');
        if (!card) return;

        const cardData = {
          image: card.querySelector('.full-product-image img')?.src,
          title: card.querySelector('h3')?.textContent,
          desc: card.querySelector('p')?.textContent,
          price: parseInt(card.dataset.basePrice) || 5990
        };

        if (!cardData.image || !cardData.title || !cardData.desc) return;

        modalElements.image.src = cardData.image;
        modalElements.image.alt = cardData.title;
        modalElements.title.textContent = cardData.title;
        modalElements.desc.textContent = cardData.desc;
        currentBasePrice = cardData.price;

        updatePrice();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    modalElements.close.addEventListener('click', closeModal);
    modal.addEventListener('click', e => e.target === modal && closeModal());
    modalElements.size.addEventListener('change', updatePrice);
    modalElements.color.addEventListener('change', updatePrice);
    modalElements.gift.addEventListener('change', updatePrice);
    modalElements.addBtn.addEventListener('click', () => { addToCart(); closeModal(); });
    modalElements.buyBtn.addEventListener('click', () => {
      addToCart();
      alert('Товар добавлен в корзину! Переход к оформлению заказа...');
      closeModal();
    });
  }
});
//корзина

// Объект корзины с улучшенной функциональностью
const cart = {
  items: [],

  // Добавить товар в корзину
  addItem: function(item) {
    this.items.push(item);
    this.updateCart();
    this.openCart();
  },

  // Удалить товар из корзины
  removeItem: function(index) {
    this.items.splice(index, 1);
    this.updateCart();
  },

  // Получить общую сумму
  getTotal: function() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  },

  // Очистить корзину
  clearCart: function() {
    this.items = [];
    this.updateCart();
  },

  // Обновить отображение корзины
  updateCart: function() {
    const cartItemsEl = document.querySelector('.cart-items');
    const totalPriceEl = document.querySelector('.total-price');

    // Очищаем корзину
    cartItemsEl.innerHTML = '';

    // Добавляем товары
    this.items.forEach((item, index) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <div class="cart-item-content">
          <img src="${item.image}" alt="${item.title}">
          <div class="cart-item-info">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-price">${item.price.toFixed(2)}₽</div>
          </div>
        </div>
        <button class="cart-item-remove" data-index="${index}">×</button>
      `;
      cartItemsEl.appendChild(itemEl);
    });

    // Обновляем итоговую сумму
    const total = this.getTotal();
    totalPriceEl.textContent = `${total.toFixed(2)}₽`;

    // Добавляем обработчики для кнопок удаления
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        this.removeItem(index);
      });
    });
  },

  // Открыть корзину
  openCart: function() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  // Закрыть корзину
  closeCart: function() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

// Инициализация корзины при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Обработчик для кнопки "Добавить в корзину"
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal-container');
      const priceText = modal.querySelector('.total-price-amount').textContent;
      const price = parseFloat(priceText.replace(/[^\d.,]/g, '').replace(',', '.'));

      const item = {
        title: modal.querySelector('.modal-product-title').textContent,
        price: price,
        image: modal.querySelector('.modal-product-image').src
      };
      cart.addItem(item);
    });
  });

  // Обработчик для кнопки корзины в навигации
  document.querySelector('.nav-icon[data-page="cart"]').addEventListener('click', function(e) {
    e.preventDefault();
    cart.openCart();
  });

  // Закрытие модального окна корзины
  document.querySelector('#cartModal .modal-close').addEventListener('click', function() {
    cart.closeCart();
  });

  // Обработчик для кнопки "Купить сейчас" в корзине
  document.querySelector('#cartModal .buy-now').addEventListener('click', function() {
    if (cart.items.length === 0) {
      alert('Корзина пуста!');
      return;
    }

    alert(`Заказ оформлен! Сумма: ${cart.getTotal().toFixed(2)}₽`);
    cart.clearCart();
    cart.closeCart();
  });
});
