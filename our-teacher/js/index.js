var myNav = document.getElementById('nav');
var lastScroll = 0;
window.onscroll = function () {
  if (window.scrollY >= 0) {
    myNav.classList.remove('main-header');
  }
  if (window.scrollY >= 50) {
    myNav.classList.add('fixed-header');
  } else {
    myNav.classList.remove('fixed-header');
    myNav.classList.remove('hide-header');
  }
  let currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value

  if (currentScroll > 0 && lastScroll <= currentScroll) {
    lastScroll = currentScroll;
    if (window.scrollY >= 10 && window.scrollY <= 700) {
      myNav.classList.remove('hide-header');
    }
  } else {
    lastScroll = currentScroll;
    if (window.scrollY >= 10 && window.scrollY <= 700) {
      myNav.classList.add('hide-header');
    }
    if (window.scrollY <= 10) {
      myNav.classList.add('main-header');
    } else {
      myNav.classList.remove('main-header');
    }
  }
};

let isOpen = false;
document.body.addEventListener('click', function (event) {
  let cur = document.querySelector('.input__select');
  let active = document.querySelector('.input__options');
  if (cur.contains(event.target)) {
    if (!isOpen) {
      cur.classList.add('focus');
      active.classList.add('active');
      isOpen = true;
    } else {
      cur.classList.remove('focus');
      active.classList.remove('active');
      isOpen = false;
    }
  } else {
    cur.classList.remove('focus');
    active.classList.remove('active');
    isOpen = false;
  }
});

document.querySelector('.input__options').addEventListener('click', (event) => {
  let value = event.target.innerHTML;
  if (value.length < 10) {
    document.querySelector('.input__select').innerHTML = value;
  }
});
let isMenuOpen = false;
document.querySelector('.hamburger').addEventListener('click', () => {
  if (isMenuOpen) {
    isMenuOpen = false;
    document.querySelector('.header__right').classList.remove('menuActive');
    document.querySelector('.hamburger').classList.remove('menuActive');
    document.querySelector('.header').classList.remove('menuActive');
    document.body.classList.remove('noscroll');
  } else {
    isMenuOpen = true;
    document.querySelector('.header__right').classList.add('menuActive');
    document.querySelector('.hamburger').classList.add('menuActive');
    document.querySelector('.header').classList.add('menuActive');
    document.body.classList.add('noscroll');
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1200) {
    document.body.classList.remove('noscroll');
    document.querySelector('.header__right').classList.remove('menuActive');
    document.querySelector('.hamburger').classList.remove('menuActive');
    document.querySelector('.header').classList.remove('menuActive');
    isMenuOpen = false;
  }
});
var userService = new UserService();
userService.getUsers().then((r) => {
  var users = r.data;
  var html = users.map((user) => {
    if (user.loaiND === 'GV') {
      return `
    <div class="col-lg-3 col-md-6 col-sm-6 col-6">
    <div class="card">
      <div class="card__img">
        <img src="./img/${user.hinhAnh}" alt="teacher_1" title="teacher_1">
      </div>
      <div class="card__content">
        <h4>
          <span class="card__small">${user.ngonNgu}</span>
          <br>
          <span class="card__big">${user.hoTen}</span>
        </h4>
        <p>${user.moTa}</p>
      </div>
    </div>
  </div>
    `;
    }
  });
  document.getElementById('teachers').innerHTML = html.join('');
});

// const about__title = document.querySelector('.about__title');
// const contact__img = document.querySelector('.contact__img');
// const about__img = document.querySelector('.about__img');
// const contact__card = document.querySelector('.contact__card');
// const cards = document
//   .getElementsByClassName('animate')[0]
//   .getElementsByClassName('card');
// const footers = document.getElementsByClassName('footer__item');
// // Create the observer
// const observer = new IntersectionObserver((entries) => {
//   // We will fill in the callback later...
//   entries.forEach((entry) => {
//     if (entry.target === contact__img && entry.isIntersecting) {
//       contact__img.classList.add('animate-slide');
//     }
//     if (entry.target === about__title && entry.isIntersecting) {
//       about__title.classList.add('animate-slide');
//     }
//     if (entry.target === about__img && entry.isIntersecting) {
//       about__img.classList.add('animate-fade');
//     }
//     if (entry.target === contact__card && entry.isIntersecting) {
//       contact__card.classList.add('animate-fade');
//     }
//     for (let i = 0; i < cards.length; i++) {
//       if (entry.target === cards[i] && entry.isIntersecting) {
//         cards[i].classList.add('animate-fade');
//       }
//     }
//     for (let i = 0; i < footers.length; i++) {
//       if (entry.target === footers[i] && entry.isIntersecting) {
//         footers[i].classList.add('animate-fade');
//       }
//     }
//   });
// });

// // Tell the observer which elements to track
// observer.observe(document.querySelector('.about__title'));
// observer.observe(document.querySelector('.contact__img'));
// observer.observe(document.querySelector('.about__img'));
// observer.observe(document.querySelector('.contact__card'));
// for (let i = 0; i < cards.length; i++) {
//   observer.observe(cards[i]);
// }
// for (let i = 0; i < footers.length; i++) {
//   observer.observe(footers[i]);
// }
