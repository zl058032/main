import anime from 'animejs/lib/anime.es.js';
import config from '../config';
import './anime.scss';

import logo2 from '../assets/logo-2.png';

const { $ } = window;

export default function init(callback) {
  if (config.PROXY_DOMAIN) {
    callback();
    $('#welcome').remove();
    return;
  }

  const removeAnime = anime({
    targets: '#welcome',
    opacity: [1, 0],
    easing: 'easeInOutQuad',
    duration: 1000,
    autoplay: false,
    complete: () => {
      $('#welcome').remove();
    },
  });

  const animes = [
    anime({
      targets: '#welcome .st3',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutQuad',
      duration: 3000,
      autoplay: false,
    }),
    anime({
      targets: '#welcome .st3',
      opacity: [1, 0],
      easing: 'easeInOutQuad',
      duration: 800,
      delay: 2000,
      autoplay: false,
    }),
    anime({
      targets: '#welcome .w-right',
      opacity: [0, 1],
      translateX: [-64, 0],
      easing: 'easeInOutQuad',
      duration: 1500,
      delay: 2000,
      autoplay: false,
    }),
    anime({
      targets: '#welcome .w-left',
      opacity: [0, 1],
      translateX: [64, 0],
      easing: 'easeInOutQuad',
      duration: 1500,
      delay: 2000,
      autoplay: false,
    }),
    anime({
      targets: '#welcome .logo2',
      opacity: [0, 1],
      translateY: [-40, 0],
      easing: 'easeInOutQuad',
      duration: 1500,
      delay: 2000,
      autoplay: false,
      complete: () => {
        callback();
        removeAnime.play();
      },
    }),
  ];

  animes.forEach((a) => {
    a.play();
  });

  $('#welcome .logo2').attr('src', logo2);
}
