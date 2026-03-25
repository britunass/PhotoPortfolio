import { validateEmail, showError, clearErrors } from './utils/helpers.js';
import { initGallery } from './components/modal.js';

document.addEventListener('DOMContentLoaded', () => {


  initGallery();


  const emailInput = document.querySelector('#email');
  const form = document.querySelector('#form');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      clearErrors(emailInput);

      if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Введите корректный email');
      } else {
        alert('Форма отправлена!');
      }
    });
  }

});