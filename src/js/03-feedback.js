import throttle from 'lodash.throttle';
import { setStorage, getStorage, removeStorage } from './storage';

const form = document.querySelector('.feedback-form');
const storageKey = 'feedback-form-state';
let storage = getStorage(storageKey);
let formValue = {};

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  // отримуємо та записуємо данні в сховище
  formValue = storage;
  formValue[event.target.name] = event.target.value;

  setStorage(storageKey, formValue);
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

  formValue = { email: '', message: '' };
  storage = formValue;
  setStorage(storageKey, formValue);
  event.currentTarget.reset();
}

function containsАormValues() {
  // заповнюєо форму після завантаження
  if (!storage) {
    storage = {};
    return;
  }

  if (storage.email === undefined) {
    form.elements.email.value = '';
  } else {
    form.elements.email.value = storage.email;
  }

  if (storage.message === undefined) {
    form.elements.message.value = '';
  } else {
    form.elements.message.value = storage.message;
  }
}
containsАormValues();
