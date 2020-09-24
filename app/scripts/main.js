gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)


// PRESENTATION OPENING ****

const timeline = gsap.timeline()

timeline
  .to('.presentation__text__line > span',
    { y: '0%', duration: 1.5, delay: 0, ease: 'expo.out', stagger: 0.5 }
  )
  .to('#brand-link',
    { opacity: 1, duration: 1, delay: 0, ease: 'power1.in' },
    '-=1'
  )

if ($(window).width() >= 1080) {
  timeline
    .to('.menu',
      { opacity: 1, duration: 1, delay: 0, ease: 'power1.in' },
      '-=1'
    )
}

// BRAND ANIMATION ****

const brandBall = $('.ball')

gsap.to(brandBall, { rotate: 360, duration: 3, delay: 2, repeat: -1 })


// NAVIGATION LINK ANIMATIONS ****

$('.menu a').on('click', (event) => {
  const anchor = event.target.attributes.href.value;

  event.preventDefault();
  gsap.to(window, { scrollTo: anchor, duration: 1 });
})


// OPEN MENU ****

if ($(window).width() <= 1080) {
  const menuOpenTimeline = gsap.timeline({ reversed: true });
  const menuButton = $('.navigation__button');
  const menuButtonBarOne = menuButton.children('.bar:nth-child(1)');
  const menuButtonBarTwo = menuButton.children('.bar:nth-child(2)');
  const menuButtonBarThree = menuButton.children('.bar:nth-child(3)');
  const menuContent = $('.menu');
  const header = $('#header');

  const brandVideoWrap = $('.video-wrap');
  const brandVideo = $('.video-wrap video');
  const brandLink = $('.brand-link');

  menuOpenTimeline
    .fromTo(menuContent, { y: '-115%', opacity: 0 }, { y: '25%', opacity: 1, duration: 0.5 })
    .fromTo(header, { backgroundColor: 'rgba(0, 0, 0, 0)' }, { backgroundColor: 'rgba(0, 0, 0, 0.4)', duration: 0.5 }, '-=0.2')
    .to(menuButton, { y: '-15px', duration: 0.3 }, '-=0.2')
    .to(menuButtonBarThree, { opacity: 0, duration: 0.3 }, '-=0.3')
    .to(menuButtonBarTwo, { rotate: '-45deg', x: -6.5, duration: 0.3 }, '-=0.3')
    .to(menuButtonBarOne, { rotate: '45deg', x: 6.5, duration: 0.3 }, '-=0.3')
    .to(brandLink, { width: 120, height: 120, duration: 0.5 }, '-=0.8')
    .to(brandVideoWrap, { width: 120, height: 120, duration: 0.5 }, '-=0.8')
    .to(brandVideo, { width: 120, y: -45, duration: 0.5 }, '-=0.8')
    .to(brandBall, { width: 120, height: 120, duration: 0.5 }, '-=0.8')

  menuButton.on('click', (event) => {
    event.preventDefault();
    menuOpenTimeline.reversed() ? menuOpenTimeline.play() : menuOpenTimeline.reverse();
  })

  $('.menu__link').on('click', (event) => {
    event.preventDefault();
    menuOpenTimeline.reversed() ? menuOpenTimeline.play() : menuOpenTimeline.reverse();
  })
}

// MENU ANIMATIONS ****

$(window).on('scroll', () => {
  const presentationAnchor = $('#presentation').offset().top;
  const skillsAnchor = $('#skills').offset().top;
  const portfolioAnchor = $('#portfolio').offset().top;
  const contactAnchor = $('#contact').offset().top;


  // MENU ACTIVATING ****

  if ($(window).scrollTop() >= presentationAnchor) {
    $('.menu__item.active').removeClass('active');
    $('a[href="#presentation"]').parent().addClass('active');
  }
  if ($(window).scrollTop() >= skillsAnchor) {
    $('.menu__item.active').removeClass('active');
    $('a[href="#skills"]').parent().addClass('active');
  }
  if ($(window).scrollTop() >= portfolioAnchor) {
    $('.menu__item.active').removeClass('active');
    $('a[href="#portfolio"]').parent().addClass('active');
  }
  if ($(window).scrollTop() >= contactAnchor) {
    $('.menu__item.active').removeClass('active');
    $('a[href="#contact"]').parent().addClass('active');
  }
})


// SKILLS ANIMATIONS ****

const skillsTimeline = gsap.timeline({ scrollTrigger: { trigger: '#skills', start: '+=50'} });
const skillsCapacity = $('.skill__capacity');
let capacities = [];

skillsCapacity.each((index, skill) => {
  capacities = $(skill).children('.nivel')

  skillsTimeline.fromTo(capacities,
    { opacity: 0 },
    { opacity: 1, ease: 'steps (5)', duration: 0.5, delay: 0.25, stagger: '0.1' },
    '-=1.35'
  )
})


// PORTFOILIO ANIMATIONS ****

const portfolioTimeline = gsap.timeline({ scrollTrigger: { trigger: '#portfolio', start: '-=200' } })
const animationConfig = {
  y: (index, target) => { return target.dataset.index * -15 },
  x: (index, target) => { return target.dataset.index * 15 },
  boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.25)',
  duration: 1,
  ease: 'power1.out',
}

portfolioTimeline
  .to($($('.project').get(0)).children('.project__img'), animationConfig)
  .to($($('.project').get(1)).children('.project__img'), animationConfig, '-=0.8')
  .to($($('.project').get(2)).children('.project__img'), animationConfig, '-=0.9')
  .to($($('.project').get(3)).children('.project__img'), animationConfig, '-=1.1');

// CONTACT ANIMATIONS ****

const contactTimeline = gsap.timeline({ scrollTrigger: '#gmaps', delay: 0.5 });
const gmaps = $('#gmaps');
const bgOne = $('.gmaps__bg-one');
const bgTwo = $('.gmaps__bg-two');
const bgThree = $('.gmaps__bg-three');
const findMeText = $('.contact__link--phone');
const sendMeText = $('.contact__link--email');


contactTimeline
  .fromTo(bgOne, { y: '85%' }, { y: '0%', ease: 'expo.out', duration: 0.5 })
  .fromTo(bgTwo, { y: '90%' }, { y: '0%', ease: 'expo.out', duration: 0.7 }, '-=0.4')
  .fromTo(bgThree, { y: '100%' }, { y: '0%', ease: 'expo.out', duration: 0.9 }, '-=0.6')
  .to(gmaps, { opacity: 1, duration: 0.3 }, '-=0.3')
  .fromTo(findMeText, { x: '10%', opacity: 0 }, { x: '0%', opacity: 1 })
  .fromTo(sendMeText, { x: '10%', opacity: 0 }, { x: '0%', opacity: 1 }, '-=0.3')


function showProject() {
  window.alert('open project modal');
}