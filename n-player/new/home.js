$(function () {
  // --- Pseudo typing
  let typedTextSpan = $('.pseudo-type__text'),
    cursorSpan = $('.pseudo-type__cursor')

  let textArray = ["Drake", "Nicki Minaj", "Bruno Mars", "Taylor Swift"],
    typingDelay = 70,
    erasingDelay = 50,
    newTextDelay = 600,
    textArrayIndex = 0,
    charIndex = 0

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (!cursorSpan.hasClass('typing')) { cursorSpan.addClass('typing') }
      typedTextSpan.text(typedTextSpan.text() + textArray[textArrayIndex].charAt(charIndex))
      charIndex++
      setTimeout(type, typingDelay)
    }
    else {
      cursorSpan.removeClass('typing')
      setTimeout(erase, newTextDelay)
    }
  }
  function erase() {
    if (charIndex > 0) {
      if (!cursorSpan.hasClass('typing')) { cursorSpan.addClass('typing') }
      typedTextSpan.text(textArray[textArrayIndex].substring(0, charIndex - 1))
      charIndex--
      setTimeout(erase, erasingDelay)
    }
    else {
      cursorSpan.removeClass('typing')
      textArrayIndex++
      if (textArrayIndex >= textArray.length) textArrayIndex = 0
      setTimeout(type, typingDelay + 1100)
    }
  }
  if (textArray.length) setTimeout(type, newTextDelay + 250)


  // --- Input focus/blur
  let searchField = $('.home-input'),
    typeContainer = $('.pseudo-type')

  searchField.on('focus blur input', function (e) {
    let el = typeContainer
    switch (e.type) {
      case 'focus':
        el.css({ opacity: '0' })
        break;
      case 'blur':
        if ($(e.target).val().length !== 0) {
          el.css({ opacity: '0' })
        } else {
          el.css({ opacity: '1' })
        }
        break;
    }
  })


  // --- Home swiper
  const swiperRecently = new Swiper(".swiper_home-recently", {
    autoplay: 0,
    slidesPerView: 6,
    slidesPerGroup: 1,
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: '[data-evt="homeRecentlyNext"]',
      prevEl: '[data-evt="homeRecentlyPrev"]',
    },
    breakpoints: {
      320: {
        slidesPerView: 3,
        spaceBetween: 6
      },
      479: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      770: {
        slidesPerView: 4
      },
      991: {
        slidesPerView: 5
      },
      1080: {
        slidesPerView: 6
      },
      1232: {
        slidesPerView: 7
      }
    }
  })
  const swiperPopular = new Swiper(".swiper_home-popular", {
    autoplay: 0,
    slidesPerView: 6,
    slidesPerGroup: 1,
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: '[data-evt="homePopularNext"]',
      prevEl: '[data-evt="homePopularPrev"]',
    },
    breakpoints: {
      320: {
        slidesPerView: 3,
        spaceBetween: 6
      },
      479: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      770: {
        slidesPerView: 4
      },
      991: {
        slidesPerView: 5
      },
      1080: {
        slidesPerView: 6
      },
      1232: {
        slidesPerView: 7
      }
    }
  })

})