import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import { setStorage, getStorage, removeStorage } from './storage';

// const key = 'ключ';
// setStorage(key, 'це значення ключа'); //записали сховище
// console.log(getStorage(key)); // отримали значення з сховища
// removeStorage(key); // видалили значення з сховища

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const stotageKey = 'videoplayer-current-time';
let currentTime = getStorage(stotageKey);

const onPlay = function (data) {
  setStorage(stotageKey, data.seconds);
  return;
};

player.on('timeupdate', throttle(onPlay, 1000));

// player.setCurrentTime(currentTime);

player.setCurrentTime(currentTime).catch(function (error) {
  setStorage(stotageKey, '0');
  return;
});

// player
//   .setCurrentTime(30.456)
//   .then(function (seconds) {
//     // seconds = the actual time that the player seeked to
//     // щось можна виконати seconds
//   })
//   .catch(function (error) {
//       switch (error.name) {
//         // щось виконуемо якщо піймали помилку.
//       case 'RangeError':
//         // the time was less than 0 or greater than the video’s duration
//         break;

//       default:
//         // some other error occurred
//         break;
//     }
//   });
