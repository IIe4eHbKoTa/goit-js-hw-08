import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const playerContainer = document.querySelector('#vimeo-player');

const player = new Vimeo(playerContainer, {
  id: 'vimeo-player',
});

function saveCurrentTime(time) {
  localStorage.setItem('videoplayer-current-time', time);
}

function loadCurrentTime() {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  return savedTime;
}

player.on(
  'timeupdate',
  throttle(data => {
    const currentTime = data.seconds;
    saveCurrentTime(currentTime);
  }, 1000)
);

const savedTime = loadCurrentTime();
if (savedTime !== null) {
  player.setCurrentTime(savedTime);
}
