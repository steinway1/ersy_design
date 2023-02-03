let exitBdayID = 'exitBday', isBirthday

// Baloons
function pushBaloons(holder) {
  const BALOON_LIMIT = $(window).width > 479 ? 10 : 22,
    BALOON_EASE = 'cubic-bezier(.485, .013, .474, 1.036)'

  let bRnd = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  },
    bRndFloat = (min, max) => {
      return (Math.random() * (min - max) + max).toFixed(2)
    }

  let bHolder = 'b-holder',
    wiggleClass = 'wiggle_',
    baloonClass = 's-baloon',
    baloonImgClass = 's-baloon-img',
    baloonContClass = 's-baloon-container',
    confettiHolder = 'confetti-holder'

  var baloonsSrcArr = [ // Baloons image src
    './img/baloon_blue.svg', // blue transparent
    './img/baloon_white.svg', // white transparent
    './img/baloon_gold.svg' // gold dimmed
  ]


  let baloonsHolder = $(`<div class="${bHolder}">`)
  holder.append(baloonsHolder)
  for (let i = 0; i < BALOON_LIMIT; i++) {
    let baloon = $('<div>', {
      class: `${baloonClass}`,
      style: `margin-left:-${bRnd(18, 40)}px; margin-right:-${bRnd(24, 56)}px; transform: translateY(100%); transition: all ${bRnd(2000, 3750)}ms ${BALOON_EASE}`
    }),
      baloonImg = $('<img>', {
        class: `${baloonImgClass}`,
        src: `${baloonsSrcArr[bRnd(0, (baloonsSrcArr.length - 1))]}`,
        style: `transform:scale(${bRndFloat(0.70, 1.00)})`
      }),
      container = $('<div>', {
        class: `${baloonContClass} ${wiggleClass}${bRnd(1, 8)}`
      })
    baloonsHolder.append(baloon)
    baloon.append(container)
    container.append(baloonImg)

    setTimeout(() => {
      baloon.css({ 'transform': 'translateY(-' + bRnd(88, 99) + 'vh)' })
    }, bRnd(40, 1800));
  }
}


// Confetti
function pushConfetti(holder) {
  var ersyBday = false;
  var $window = $(window)
    , random = Math.random
    , cos = Math.cos
    , sin = Math.sin
    , PI = Math.PI
    , PI2 = PI * 2
    , timer = undefined
    , frame = undefined
    , confetti = [];
  var confArr = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
    , pointer = 0;
  var particles = $(window).width() > 479 ? 90 : 60
    , spread = $(window).width() > 479 ? 60 : 80
    , sizeMin = 3
    , sizeMax = 16 - sizeMin
    , eccentricity = 10
    , deviation = 100
    , dxThetaMin = -.1
    , dxThetaMax = -dxThetaMin - dxThetaMin
    , dyMin = .16
    , dyMax = .32
    , dThetaMin = .4
    , dThetaMax = .7 - dThetaMin;
  var colorThemes = [
    function () {
      return color(150 * random() | 0, 80 * random() | 128, 110 * random() | 0);
    }, function () {
      return colorThemes[random() < .5 ? 1 : 2]();
    }, function () {
      return colorThemes[random() < .2 ? 3 : 5]();
    }, function () {
      return colorThemes[random() < .2 ? 2 : 4]();
    }
  ];
  function color(r, g, b) {
    return 'rgb(' + 0 + ',' + g + ',' + 230 + ')';
  }
  function interpolation(a, b, t) {
    return (1 - cos(PI * t)) / 2 * (b - a) + a;
  }
  var radius = 1 / eccentricity, radius2 = radius + radius;
  function createPoisson() {
    var domain = [radius, 1 - radius], measure = 1 - radius2, spline = [0, 1];
    while (measure) {
      var dart = measure * random(), i, l, interval, a, b, c, d;
      for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
        a = domain[i], b = domain[i + 1], interval = b - a;
        if (dart < measure + interval) {
          spline.push(dart += a - measure);
          break;
        }
        measure += interval;
      }
      c = dart - radius, d = dart + radius;
      for (i = domain.length - 1; i > 0; i -= 2) {
        l = i - 1, a = domain[l], b = domain[i];
        if (a >= c && a < d)
          if (b > d) domain[l] = d;
          else domain.splice(l, 2);
        else if (a < c && b > c)
          if (b <= d) domain[i] = c;
          else domain.splice(i, 0, c, d);
      }

      for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
        measure += domain[i + 1] - domain[i];
    }

    return spline.sort();
  }

  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '0';
  container.style.overflow = 'visible';
  container.style.zIndex = '9999';
  container.classList.add('confetti-holder')

  function Confetto(theme) {
    this.frame = 0;
    this.outer = document.createElement('div');
    this.inner = document.createElement('div');
    this.outer.appendChild(this.inner);

    var outerStyle = this.outer.style, innerStyle = this.inner.style;
    outerStyle.position = 'absolute';
    outerStyle.width = (sizeMin + sizeMax * random()) + 'px';
    outerStyle.height = (sizeMin + sizeMax * random()) + 'px';
    innerStyle.width = '100%';
    innerStyle.height = '100%';
    innerStyle.backgroundColor = theme();

    outerStyle.perspective = '50px';
    outerStyle.transform = 'rotate(' + (360 * random()) + 'deg)';
    this.axis = 'rotate3D(' +
      cos(360 * random()) + ',' +
      cos(360 * random()) + ',0,';
    this.theta = 360 * random();
    this.dTheta = dThetaMin + dThetaMax * random();
    innerStyle.transform = this.axis + this.theta + 'deg)';

    this.x = $window.width() * random();
    this.y = -deviation;
    this.dx = sin(dxThetaMin + dxThetaMax * random());
    this.dy = dyMin + dyMax * random();
    outerStyle.left = this.x + 'px';
    outerStyle.top = this.y + 'px';

    this.splineX = createPoisson();
    this.splineY = [];
    for (var i = 1, l = this.splineX.length - 1; i < l; ++i)
      this.splineY[i] = deviation * random();
    this.splineY[0] = this.splineY[l] = deviation * random();

    this.update = function (height, delta) {
      this.frame += delta;
      this.x += this.dx * delta;
      this.y += this.dy * delta;
      this.theta += this.dTheta * delta;

      var phi = this.frame % 7777 / 7777, i = 0, j = 1;
      while (phi >= this.splineX[j]) i = j++;
      var rho = interpolation(
        this.splineY[i],
        this.splineY[j],
        (phi - this.splineX[i]) / (this.splineX[j] - this.splineX[i])
      );
      phi *= PI2;

      outerStyle.left = this.x + rho * cos(phi) + 'px';
      outerStyle.top = this.y + rho * sin(phi) + 'px';
      innerStyle.transform = this.axis + this.theta + 'deg)';
      return this.y > height + deviation;
    };
  }

  function poof() {
    if (!frame) {
      holder.append(container)
      var theme = colorThemes[ersyBday ? colorThemes.length * random() | 0 : 0]
        , count = 0;
      (function addConfetto() {
        if (ersyBday && ++count > particles)
          return timer = undefined;

        var confetto = new Confetto(theme);
        confetti.push(confetto);
        container.appendChild(confetto.outer);
        timer = setTimeout(addConfetto, spread * random());
      })(0);

      var prev = undefined;
      requestAnimationFrame(function loop(timestamp) {
        var delta = prev ? timestamp - prev : 0;
        prev = timestamp;
        var height = $window.height();

        for (var i = confetti.length - 1; i >= 0; --i) {
          if (confetti[i].update(height, delta)) {
            container.removeChild(confetti[i].outer);
            confetti.splice(i, 1);
          }
        }

        if (timer || confetti.length)
          return frame = requestAnimationFrame(loop);
        document.body.removeChild(container);
        frame = undefined;
      });
    }
  }

  if (!ersyBday) poof();
}


// Create birthday voerlay
function createBDayOverlay(artistName, ytLink = '#', twitterLink = '#', scLink = '#', instLink = '#', fbLink = '#') {
  let bDayModalClass = 'bday-modal',
    bDayModalContClass = 'bday-modal__container',


    bDayModal = $('<div>', {
      class: `${bDayModalClass}`,
      style: 'display: none; opacity: 0;'
    }),
    bDayModalContainer = $('<div>', {
      class: `${bDayModalContClass} is-hidden`
    })


  const bDayTemplate =
    `
    <div class="bday-modal__info">
      <h3 class="bday-modal__greeting">Today Is<br>
        <span class="bday-modal__artist-name">${artistName}</span> Birthday
      </h3>
      <span class="bday-modal__subtitle">Wish him a happy birthday!</span>
      <div class="bday-modal__social-wrap">
        <div class="page-artist-head__social-grid">
          <a href="${ytLink}" target="_blank">
            <img src="./n-player_files/social-icon__youtube.svg">
          </a>
          <a href="${twitterLink}" target="_blank">
            <img src="./n-player_files/social-icon__twitter.svg">
          </a>
          <a href="${instLink}" target="_blank">
            <img src="./n-player_files/social-icon__instagram.svg">
          </a>
          <a href="${fbLink}" target="_blank">
            <img src="./n-player_files/social-icon__facebook.svg">
          </a>
        </div>
      </div>
      <div id="${exitBdayID}">
        <svg style="margin-right: 10px; margin-top: -2px;" width="20" viewBox="0 0 23 18" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M7 11L2 6L7 1" stroke="currentColor" stroke-width="2"></path>
          <path d="M3 6H16.641C19.6007 6 22 8.46243 22 11.5C22 14.5376 19.6007 17 16.641 17H3" stroke="currentColor"
          stroke-width="2"></path>
        </svg> Back To Page
      </div>
    </div>`

  $('body').append(bDayModal)
  bDayModal.append(bDayModalContainer)
  bDayModalContainer.append(bDayTemplate)

  lockBody()

  bDayModal.show()
  setTimeout(() => {
    bDayModal.css('opacity', '1')
    bDayModalContainer.removeClass('is-hidden')
    pushBaloons(bDayModal)
    pushConfetti(bDayModal)
  }, 1);
}


// Events handling
$(document).on('click', `#${exitBdayID}`, function () {
  let a = $('.bday-modal')
  if (a) {
    a.css({
      'opacity': '0',
      'transform': 'scale(1.1)',
      'filter': 'blur(15px)'
    })
    setTimeout(() => {
      a.remove()
      unlockBody()
    }, 550);
  }
});


// Temporary event
window.addEventListener('load', function () {
  isBirthday = true
  if (isBirthday) {
    setTimeout(() => {
      createBDayOverlay('Bruno Mars')
    }, 2000);
  }
})