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

// Объект корзины с улучшенной функциональностью
const cart = {
  items: [],

  // Добавить товар в корзину
  addItem: function(item) {
    this.items.push(item);
    this.updateCart();
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

    if (cartItemsEl && totalPriceEl) {
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
    }
  },

  // Открыть корзину
  openCart: function() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
      cartModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  // Закрыть корзину
  closeCart: function() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
      cartModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  },

  // Сохранить корзину в localStorage
  saveToStorage: function() {
    localStorage.setItem('checkoutItems', JSON.stringify(this.items));
  },

  // Загрузить корзину из localStorage
  loadFromStorage: function() {
    const savedItems = localStorage.getItem('checkoutItems');
    if (savedItems) {
      this.items = JSON.parse(savedItems);
    }
  },

  // Очистить localStorage
  clearStorage: function() {
    localStorage.removeItem('checkoutItems');
  }
};

// Функция для отображения товаров на странице оформления заказа
function displayCheckoutProducts() {
  const productsContainer = document.getElementById('checkoutProducts');
  const totalElement = document.getElementById('checkoutTotal');

  if (productsContainer && totalElement) {
    // Очищаем контейнер
    productsContainer.innerHTML = '';

    // Добавляем товары
    cart.items.forEach(item => {
      const productElement = document.createElement('div');
      productElement.className = 'checkout-product';
      productElement.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="checkout-product-image">
        <div class="checkout-product-info">
          <div class="checkout-product-title">${item.title}</div>
          <div class="checkout-product-price">${item.price.toFixed(2)}₽</div>
        </div>
      `;
      productsContainer.appendChild(productElement);
    });

    // Обновляем итоговую сумму
    const total = cart.items.reduce((sum, item) => sum + item.price, 0);
    totalElement.textContent = `${total.toFixed(2)}₽`;
  }
}

// Функция для валидации формы
function setupFormValidation() {
  const form = document.getElementById('orderForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Здесь можно добавить обработку формы (отправку на сервер и т.д.)
      alert('Заказ успешно оформлен! Спасибо за покупку.');

      // Очищаем корзину
      cart.clearCart();
      cart.clearStorage();

      // Перенаправляем на главную
      window.location.href = 'index2.html';
    });
  }
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
      const priceText = modal.querySelector('.total-price-amount').textContent;
      const price = parseFloat(priceText.replace(/[^\d.,]/g, '').replace(',', '.'));

      const item = {
        title: modalElements.title.textContent,
        price: price,
        image: modalElements.image.src,
        size: modalElements.size.value,
        color: modalElements.color.value,
        giftWrap: modalElements.gift.checked
      };

      cart.addItem(item);
      closeModal();
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

    if (modalElements.close) modalElements.close.addEventListener('click', closeModal);
    modal.addEventListener('click', e => e.target === modal && closeModal());
    if (modalElements.size) modalElements.size.addEventListener('change', updatePrice);
    if (modalElements.color) modalElements.color.addEventListener('change', updatePrice);
    if (modalElements.gift) modalElements.gift.addEventListener('change', updatePrice);
    if (modalElements.addBtn) modalElements.addBtn.addEventListener('click', addToCart);

    // Обработчик для кнопки "Купить сейчас" в модальном окне товара
    if (modalElements.buyBtn) {
      modalElements.buyBtn.addEventListener('click', function() {
        const priceText = modal.querySelector('.total-price-amount').textContent;
        const price = parseFloat(priceText.replace(/[^\d.,]/g, '').replace(',', '.'));

        const item = {
          title: modalElements.title.textContent,
          price: price,
          image: modalElements.image.src,
          size: modalElements.size.value,
          color: modalElements.color.value,
          giftWrap: modalElements.gift.checked
        };

        // Добавляем текущий товар в корзину
        cart.addItem(item);

        // Сохраняем корзину для страницы оформления заказа
        cart.saveToStorage();

        // Переходим на страницу оформления заказа
        window.location.href = 'index3.html';
      });
    }
  }

  // Обработчик для кнопки корзины в навигации
  const cartIcon = document.querySelector('.nav-icon[data-page="cart"]');
  if (cartIcon) {
    cartIcon.addEventListener('click', function(e) {
      e.preventDefault();
      cart.openCart();
    });
  }

  // Закрытие модального окна корзины
  const cartClose = document.querySelector('#cartModal .modal-close');
  if (cartClose) {
    cartClose.addEventListener('click', function() {
      cart.closeCart();
    });
  }

  // Обработчик для кнопки "Купить сейчас" в корзине
  const cartBuyBtn = document.querySelector('#cartModal .buy-now');
  if (cartBuyBtn) {
    cartBuyBtn.addEventListener('click', function(e) {
      e.preventDefault();

      if (cart.items.length === 0) {
        alert('Корзина пуста!');
        return;
      }

      // Сохраняем корзину для страницы оформления заказа
      cart.saveToStorage();

      // Переходим на страницу оформления заказа
      window.location.href = 'index3.html';
    });
  }

  // Если мы на странице оформления заказа, загружаем товары
  if (window.location.pathname.includes('index3.html')) {
    cart.loadFromStorage();
    displayCheckoutProducts();
    setupFormValidation();
  }
});

//sdsdsdsdsds
// Обновленный скрипт
document.addEventListener('DOMContentLoaded', function() {
  const dynamicIsland = document.querySelector('.dynamic-checkout-island');
  const originalIsland = document.querySelector('.bottom-nav-icons');
  const checkoutPart = document.querySelector('.checkout-part');
  const scrollThreshold = 150; // Начинаем трансформацию после 150px скролла

  let isScrolled = false;

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > scrollThreshold && !isScrolled) {
      // Активируем новый остров
      dynamicIsland.classList.add('active');
      originalIsland.classList.add('hidden');
      isScrolled = true;

      // Дополнительная анимация - "пружинка"
      setTimeout(() => {
        dynamicIsland.style.transform = `translateX(-50%) scale(1.05)`;
        setTimeout(() => {
          dynamicIsland.style.transform = `translateX(-50%)`;
        }, 300);
      }, 50);

    } else if (scrollTop <= scrollThreshold && isScrolled) {
      // Возвращаем оригинальный остров
      dynamicIsland.classList.remove('active');
      originalIsland.classList.remove('hidden');
      isScrolled = false;
    }
  });

  // Отправка формы при клике
  checkoutPart.addEventListener('click', function() {
    document.getElementById('orderForm').submit();
  });
});
