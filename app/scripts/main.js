$(document).ready(() => {

  // BRAND PICTURE ANIMATION

  const brandPicture = $('#brand-link').get(0)

  anime({
    targets: brandPicture,
    // scale: [0, 2.5],
    // translateY: [0, 25],
    // translatex: [0, 25],
    easing: 'linear',
    duration: 1000
  })

  // HERO TEXT ANIMATION

  const heroTextLine1 = $('.hero__text__line')[0];
  const heroTextLine2 = $('.hero__text__line')[1];

  $(heroTextLine1).html(heroTextLine1.textContent.replace(/\S/g, '<span class="char">$&</span>') + '<span class="bar"></span>');
  $(heroTextLine2).html(heroTextLine2.textContent.replace(/\S/g, '<span class="char">$&</span>') + '<span class="bar"></span>');

  anime({
    targets: '.hero__text__line .char',
    opacity: [0,1],
    scaleX: [0.3, 1],
    easing: 'spring(1, 100, 30, 0)',
    delay: anime.stagger(20, { start: 500 })
  });

  anime({
    targets: '.hero__text__line .bar',
    width: ['0%', '100%'],
    easing: 'easeInQuad',
    delay: anime.stagger(500, { start: 100 })
  });
})