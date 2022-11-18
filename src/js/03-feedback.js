import throttle from 'lodash.throttle';
import { setStorage, getStorage, removeStorage } from './storage';

const form = document.querySelector('.feedback-form');
const stotageKey = 'feedback-form-state';
const storage = getStorage(stotageKey);

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  const {
    elements: { email, message },
  } = event.currentTarget;

  setStorage(stotageKey, { Email: email.value, Message: message.value });
}

function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;

  if (email.value === '' || message.value === '') {
    return alert('Будь ласка заповніть всі поля!');
  }

  console.log({ Email: email.value, Message: message.value });
  event.currentTarget.reset();

  removeStorage(stotageKey);
}

function containsАormValues() {
  if (!storage) return;
  form.elements.email.value = storage.Email;
  form.elements.message.value = storage.Message;
}

containsАormValues();
