document.addEventListener('DOMContentLoaded', function() {
    // Элементы модального окна
    const modal = document.getElementById('applicationModal');
    const modalContent = document.querySelector('.modal-content');
    const closeModal = document.querySelector('.close-modal');
    const closeSuccess = document.querySelector('.close-success');

    // Находим кнопки "Оставить заявку" по тексту
    const allButtons = document.querySelectorAll('.btn');
    const applicationBtns = Array.from(allButtons).filter(btn =>
      btn.textContent.trim() === "Оставить заявку"
    );

    // Элементы шагов
    const steps = document.querySelectorAll('.modal-step');
    const step1 = document.querySelector('.step-1');

    // Кнопки
    const optionBtns = document.querySelectorAll('.option-btn');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');

    // Форма
    const feedbackForm = document.getElementById('feedbackForm');

    // Данные формы
    const formData = {
      question1: null,
      question2: null,
      question3: null,
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    };

    // Открытие модального окна
    function openModal() {
      document.body.style.overflow = 'hidden';
      modal.style.display = 'flex';
      setTimeout(() => {
        modal.classList.add('show');
      }, 10);
      resetForm();
    }

    // Закрытие модального окна
    function closeModalFunc() {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
    }

    // Сброс формы
    function resetForm() {
      steps.forEach(step => step.classList.remove('active'));
      step1.classList.add('active');
      optionBtns.forEach(btn => btn.classList.remove('selected'));
      nextBtns.forEach(btn => btn.disabled = true);

      for (let key in formData) {
        formData[key] = key.startsWith('question') ? null : '';
      }

      if (feedbackForm) feedbackForm.reset();
    }

    // Переход между шагами
    function goToNextStep(currentStep) {
      const nextStep = currentStep + 1;
      if (nextStep > 5) return;
      document.querySelector(`.step-${currentStep}`).classList.remove('active');
      document.querySelector(`.step-${nextStep}`).classList.add('active');
      modalContent.scrollTo(0, 0);
    }

    function goToPrevStep(currentStep) {
      const prevStep = currentStep - 1;
      if (prevStep < 1) return;
      document.querySelector(`.step-${currentStep}`).classList.remove('active');
      document.querySelector(`.step-${prevStep}`).classList.add('active');
      modalContent.scrollTo(0, 0);
    }

    // Обработчики событий
    applicationBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
      });
    });

    closeModal.addEventListener('click', closeModalFunc);
    closeSuccess.addEventListener('click', closeModalFunc);

    optionBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const parent = this.closest('.options-container');
        parent.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        const nextBtn = this.closest('.modal-step').querySelector('.next-btn');
        nextBtn.disabled = false;
        const step = this.closest('.modal-step').className.split(' ')[1];
        const stepNumber = parseInt(step.replace('step-', ''));
        formData[`question${stepNumber}`] = this.dataset.value;
      });
    });

    nextBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const currentStep = parseInt(this.closest('.modal-step').className.split(' ')[1].replace('step-', ''));
        goToNextStep(currentStep);
      });
    });

    prevBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const currentStep = parseInt(this.closest('.modal-step').className.split(' ')[1].replace('step-', ''));
        goToPrevStep(currentStep);
      });
    });

    if (feedbackForm) {
      feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        formData.name = document.getElementById('name').value;
        formData.email = document.getElementById('email').value;
        formData.phone = document.getElementById('phone').value;
        formData.company = document.getElementById('company').value;
        formData.message = document.getElementById('message').value;
        console.log('Form data:', formData);
        goToNextStep(4);
      });
    }

    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModalFunc();
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModalFunc();
      }
    });
  });
