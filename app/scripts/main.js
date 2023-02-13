(($) => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);
  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(CustomEase);

  const projects = [];

  const initViewportDimentions = () => {
    let vh = $(window).innerHeight() * 0.01;
    let vw = $(window).innerWidth() * 0.01;
    
    document.documentElement.style.setProperty('--vh', ''.concat(vh, 'px'));
    document.documentElement.style.setProperty('--vw', ''.concat(vw, 'px'));

    $(window).on('scroll load resize', () => {
      vh = $(window).innerHeight() * 0.01;
      vw = $(window).innerWidth() * 0.01;

      document.documentElement.style.setProperty('--vh', ''.concat(vh, 'px'));
      document.documentElement.style.setProperty('--vw', ''.concat(vw, 'px'));
    });
  };

  const stickyHeader = () => {
    const header = $('#header');
    let scrollPosition = 114;

    $(window).on('scroll mousewhell', () => {
      const currentScrollPosition = $(window).scrollTop();

      if (currentScrollPosition > scrollPosition) {
        header.css('top', '-114px');
      } else {
        header.css('top', '0px');
      }

      scrollPosition = currentScrollPosition;
    });
  };

  const initTypeWriterEffect = () => {
    const windowWidth = $(window).innerWidth();
    const titleElement = $('.hero h1');
    const subtitleElement = $('.hero h2');
    const sectionsTitles = $('#skills h3, #projects h3');
    let heroTitle = 'Me chamo Phellipe Lins';
    let heroSubtitle = 'Creative frontend developer';

    if (windowWidth <= 920) {
      heroTitle = 'Phellipe Lins';
      heroSubtitle = 'Frontend developer';
    }

    gsap.to(titleElement, {
      text: { value: heroTitle },
      duration: 2,
      ease: 'none'
    });

    gsap.to(subtitleElement, {
      text: { value: heroSubtitle },
      duration: 2,
      delay: 2,
      ease: 'none'
    });

    sectionsTitles.each((index, element) => {
      gsap.to(element, {
        text: {
          value: $(element).attr('data-text'),
        },
        scrollTrigger: {
          trigger: element,
          start: 'top bottom'
        },
        duration: 1,
        ease: 'none'
      })
    });
  };

  const scrollTo = () => {
    const link = $('[scroll-to]');

    link.on('click', (event) => {
      event.preventDefault();

      const target = $(event.target).attr('scroll-to');
      const scrollHeight = $(target).offset().top;

      gsap.to(window, { scrollTo: { y: scrollHeight }, duration: 0.8 });
    });
  }

  const fillAbilities = () => {
    const abilities = $('.skill');
    
    abilities.each((index, element) => {
      const bar = $(element).find('.percentage');
      const levelCircle = $(element).find('.levels .level');
      const percentage = $(element).attr('data-experience');
      const percentageInt = Number(percentage.replace('%', ''));
      const level = Math.ceil(percentageInt * 0.05);

      // mobile
      gsap.to(bar, {
        width: percentage,
        duration: 1,
        ease: SteppedEase.config(10),
        scrollTrigger: {
          trigger: bar.get(0),
          start: 'bottom bottom',
        },
      });

      // desktop
      ScrollTrigger.create({
        trigger: element,
        onEnter: () => {
          const levelToBeFilled = levelCircle.slice(0, level);

          gsap.to(levelToBeFilled, {
            backgroundColor: 'black',
            stagger: 0.2,
            ease: SteppedEase.config(1),
          });
        },
      });
    });    
  };

  const initProjectSlider = () => {
    const slider = $('.gallery');

    slider.slick({
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 3,
      slidesToScroll: 1,
      pauseOnHover: false,
      pauseOnFocus: false,
      infinite: false,
      arrows: false,
      dots: false,
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 1000,
      ease: 'ease-in',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  };

  const initProjectGrid = (projects) => {
    const grid = $('.projects .list');
    const filterButtons = $('.projects .filter');
    const cardTemplate = 
      `<div class="project-card {{category}}" role="listitem">
        <div class="image" role="img" alt="{{name}}" style="background-image: url({{cover}});"></div>
        <div class="actions">
          <a href="{{url}}" target="_blank">ir para o site</a>
          <button data-slug="{{id}}">ver projeto</button>
        </div>
      </div>`;

    projects.forEach(project => {
      const card = cardTemplate
        .replace('{{id}}', project.id)
        .replace('{{category}}', project.category)
        .replace('{{name}}', project.name)
        .replace('{{url}}', project.url)
        .replace('{{cover}}', project.cover)

      grid.append(card);
    });

    grid.isotope({
      columnWidth: '.project-card',
      itemSelector: '.project-card',
      layoutMode: 'fitRows',
      percentPosition: true,
    });

    filterButtons.on('click', (event) => {
      event.preventDefault();

      const button = $(event.target);
      const term = button.attr('data-filter');

      filterButtons.removeClass('active');
      button.addClass('active');
      grid.isotope({ filter: term });
    })
  };
  
  const initProjectsEffect = () => {
    const projects = $('#projects .project-card');

    projects.each((index, element) => {
      gsap.to(element, {
        opacity: 1,
        duration: 1.3,
        ease: CustomEase.create('custom', 'M0,0,C0,0,0.047,0.237,0.05,0.25,0.052,0.237,0.097,0.01,0.1,0,0.102,0.015,0.148,0.337,0.15,0.35,0.151,0.337,0.198,0.011,0.2,0,0.201,0.014,0.248,0.435,0.25,0.45,0.251,0.438,0.298,0.111,0.3,0.1,0.301,0.114,0.348,0.535,0.35,0.55,0.351,0.538,0.398,0.211,0.4,0.2,0.401,0.214,0.448,0.635,0.45,0.65,0.451,0.638,0.498,0.311,0.5,0.3,0.501,0.314,0.548,0.735,0.55,0.75,0.551,0.738,0.598,0.411,0.6,0.4,0.601,0.414,0.648,0.835,0.65,0.85,0.651,0.838,0.698,0.511,0.7,0.5,0.701,0.514,0.748,0.935,0.75,0.95,0.751,0.938,0.798,0.611,0.8,0.6,0.801,0.613,0.848,0.985,0.85,1,0.851,0.988,0.897,0.712,0.9,0.7,0.902,0.712,0.938,0.933,0.95,1,0.961,1,1,1,1,1'),
        delay: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
        },
        onComplete: () => $(element).addClass('visible'),
      });
    });
  };

  const fetchProjects = () => {
    fetch('data/projects.json')
      .then(response => response.json())
      .then((response) => {
        projects.push(...response.projects);
        return response.projects;
      })
      .then(projects => initProjectGrid(projects))
      .then(() => initProjectsEffect());
  };

  const openProject = () => {
    const page = $('body');
    const header = $('#header');
    const section = $('.projects');
    const button = '.project-card button';
    const scrollHeight = section.offset().top;
    const titleElement = $('.project .topbar h4');
    const textElement = $('.project .text');
    const galleryElement = $('.gallery');

    section.on('click', button, (event) => {
      event.preventDefault();

      const slug = $(event.target).attr('data-slug');
      const { id, name, description, images } = projects.filter(({ id }) => id === Number(slug))[0];
      const slideTemplate = `
        <div class="slide">
          <div class="image" role="img" alt="" style="background-image: url({{url}})"></div>
          <span class="caption">{{caption}}</span>
        </div>`;

      if (id) {
        titleElement.text(name);
        textElement.text(description);

        images.forEach(({ url, caption }) => {
          const slide = slideTemplate
            .replace('{{url}}', url)
            .replace('{{caption}}', caption);

          galleryElement.slick('slickAdd', slide);
        });

        galleryElement.slick('slickPlay');
        
        gsap.to(window, { scrollTo: { y: scrollHeight }, duration: 0.3, onComplete: () => {
          page.css({ height: $(window).innerHeight(), overflow: 'hidden' });
          gsap.to(section, { scrollTo: { x: $(window).innerWidth() }, duration: 0.5, onComplete: () => {
            header.css('top', '-114px');  
          }});
        }});
      }
      
    });
  };

  const closeProject = () => {
    const button = '.project .topbar button';
    const page = $('body');
    const section = $('.projects');
    const gallery = $('.gallery');

    section.on('click', button, () => {
      gallery.slick('slickRemove', null, null, true);
      gsap.to(section, { scrollTo: { x: 0 }, duration: 0.5, onComplete: () => {
        page.css({ height: 'auto', overflow: 'auto' });
      }});
    });
  };

  const getCurrentCopyrightYear = () => {
    const year = new Date().getFullYear();
    const target = $('.footer .copyright .year');

    target.text(year);
  };

  const init = () => {
    initViewportDimentions();
    stickyHeader();
    initTypeWriterEffect();
    scrollTo();
    fillAbilities();
    fetchProjects();
    openProject();
    closeProject();
    initProjectSlider();
    getCurrentCopyrightYear();
  };

  $(window).on('load', () => init());

  $(window).on('resize', () => {
    initTypeWriterEffect();
  });
})(jQuery);
