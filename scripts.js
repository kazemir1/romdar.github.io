



document.addEventListener('DOMContentLoaded', function() {
  const bottomNav = document.getElementById('bottomNav');
  const swipeFill = document.querySelector('.swipe-fill');
  const mobileText = document.querySelector('.mobile-text');
  const swipeArrow = document.querySelector('.swipe-arrow');

  // Функция определения touch-устройств
  function isTouchDevice() {
    try {
      return ('ontouchstart' in window) ||
             (navigator.maxTouchPoints > 0) ||
             (navigator.msMaxTouchPoints > 0);
    } catch (e) {
      return false;
    }
  }

  if (isTouchDevice()) {
    // Настройки для мобильных устройств
    let startX = 0;
    let isSwiping = false;
    let animationFrame;

    const handleMove = (currentX) => {
      if (!isSwiping) return;

      const deltaX = currentX - startX;
      if (deltaX > 0) {
        const progress = Math.min(deltaX / 150, 1);
        swipeFill.style.width = `${progress * 100}%`;
        if (mobileText) mobileText.style.opacity = 1 - progress;
        if (swipeArrow) swipeArrow.style.opacity = 1 - progress;
      }
    };

    bottomNav.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
      isSwiping = true;
      cancelAnimationFrame(animationFrame);
    }, { passive: false });

    bottomNav.addEventListener('touchmove', function(e) {
      if (!isSwiping) return;
      animationFrame = requestAnimationFrame(() => {
        handleMove(e.touches[0].clientX);
      });
      e.preventDefault();
    }, { passive: false });

    bottomNav.addEventListener('touchend', function(e) {
      if (!isSwiping) return;
      isSwiping = false;
      cancelAnimationFrame(animationFrame);

      const endX = e.changedTouches[0].clientX;
      if (endX - startX > 100) {
        swipeFill.style.width = '100%';
        setTimeout(() => {
          window.location.href = 'index2.html';
        }, 300);
      } else {
        swipeFill.style.width = '0%';
        if (mobileText) mobileText.style.opacity = 1;
        if (swipeArrow) swipeArrow.style.opacity = 1;
      }
    });

    // Для Edge и некоторых Android-браузеров
    bottomNav.addEventListener('pointerdown', function(e) {
      if (e.pointerType === 'touch') {
        startX = e.clientX;
        isSwiping = true;
      }
    });

    bottomNav.addEventListener('pointermove', function(e) {
      if (e.pointerType === 'touch' && isSwiping) {
        handleMove(e.clientX);
        e.preventDefault();
      }
    });

    bottomNav.addEventListener('pointerup', function(e) {
      if (e.pointerType === 'touch' && isSwiping) {
        isSwiping = false;
        const endX = e.clientX;
        if (endX - startX > 100) {
          swipeFill.style.width = '100%';
          setTimeout(() => {
            window.location.href = 'index2.html';
          }, 300);
        } else {
          swipeFill.style.width = '0%';
          if (mobileText) mobileText.style.opacity = 1;
          if (swipeArrow) swipeArrow.style.opacity = 1;
        }
      }
    });
  } else {
    // Настройки для ПК
    bottomNav.addEventListener('click', function() {
      window.location.href = 'index2.html';
    });
  }
});
