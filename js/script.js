(function() {
  // Variables
  const slider = document.querySelector('.slider-container'),
        body = document.body,
        next = document.querySelector('.next'),
        previous = document.querySelector('.previous'),
        blockSelection = document.querySelector('.block-selection'),
        inner = document.querySelector('.slider-container-inner'),
        slides = document.querySelectorAll('.slide'),
        statement = document.querySelector('.statement'),
        stepCounter = document.querySelector('.step-counter'),
        width = window.innerWidth,
        squares = [],
        varNum = document.querySelector('.varNum');
        pathContainer = [];

  let slideIndex = 0;

  // Initialize program
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      ready();
    }, 2000);
  });
  

  createSlideNav();

  handleEvents();

  checkState();

  // Functions
  function createSlideNav() {
    for(let i = 0; i < slides.length; i++) {
      let s = document.createElement('span');
          s.classList.add('square');
          s.innerHTML = i;

      blockSelection.appendChild(s);
      squares.push(s);

      s.addEventListener('click', function () {
        slideIndex = i;

        addStep();
        animateSlide();
        checkState();
      });
    }
  }

  function changeSlide (dir) {
    let direction = this.dataset.direction;
    
    direction === 'next' ? slideIndex ++ : slideIndex --;

    checkState();
    addStep();

    if(slideIndex >= slides.length || slideIndex < 0) {
      slideIndex = slides.length -1;
    }

    animateSlide();
  }

  function animateSlide () {
    inner.style.setProperty('--left', `${-width * slideIndex}px`);
    squares.forEach(function(s, i) {
      if(i === slideIndex) {
        slides[i].classList.add('active');
        s.classList.add('active');
      } else {
          slides[i].classList.remove('active');
          s.classList.remove('active');
        }
    });
  }

  function checkState() {
    slideIndex == 0 ? previous.classList.add('hide') : previous.classList.remove('hide');
    slideIndex == squares.length - 1 ? next.classList.add('hide') : next.classList.remove('hide');
  }

  function showElem(elem) {
    elem.add('show');
  }

  function hideElem(elem) {
    elem.add('hide');
  }

  function addStep(alpha, beta) {
    varNum.innerHTML = slideIndex;
    var alpha = stepCounter.classList;
    var beta = statement.classList;

    if(slideIndex > 0) {
      showElem(alpha);
      hideElem(beta);
    } else {
      hideElem(alpha);
      showElem(beta);
    }
  }

  function handleEvents() {
    // Events
    next.addEventListener('click', changeSlide);

    previous.addEventListener('click', changeSlide);

    // Key events
    document.onkeydown = function(e) {
      switch (e.keyCode) {
          case 37:
              if(slideIndex > 0) {
                slideIndex --;
              }
              if(slideIndex > -1) {
                checkState();
                animateSlide();
                addStep();
                break;
              }
          case 39:
              if(slideIndex < 6) {
                slideIndex ++;
              }
              if(slideIndex < slides.length) {
                checkState();
                animateSlide();
                addStep();
                break;
              }
      }
    };
  }

  function ready() {
    body.classList.add('js-enabled');
    const elem = document.getElementById("remove");
    elem.parentNode.removeChild(elem);
  }

})();
