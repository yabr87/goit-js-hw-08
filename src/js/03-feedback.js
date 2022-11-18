import throttle from 'lodash.throttle';
import { setStorage, getStorage, removeStorage } from './storage';

const form = document.querySelector('.feedback-form');
const stotageKey = 'feedback-form-state';
const storage = getStorage(stotageKey);
let emailValue = '';
let messageValue = '';

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  // отримуємо та записуємо данні в сховище
  if (event.target.name === 'email') {
    emailValue = event.target.value;
  }

  if (event.target.name === 'message') {
    messageValue = event.target.value;
  }

  setStorage(stotageKey, { Email: emailValue, Message: messageValue });
}

function onFormSubmit(event) {
  //кнопка submit. перевіряємо поля, вивонимо в констоль,  очищуемо форму
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
  // заповнюєо форму після завантаження
  if (!storage) return;
  form.elements.email.value = storage.Email;
  form.elements.message.value = storage.Message;
}

containsАormValues();
