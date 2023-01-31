$(function () {

  // Global

  const P_MIN = 'player_collapsed',
    P_VISIBLE = 'player_visible',
    IS_ACTIVE = 'is-active',
    IS_VISIBLE = 'is-visible',
    IS_EXPANDED = 'is-expanded'

  let player = $('.player'), body = $('body'), playerButton = $('.player-button'),
    sectionButton = $('.player-section__main-button'), playlistItem = $('.playlist-item'),
    playerBackdrop = $('.player-backdrop')

  let eFollowArtist = $('.follow-artist')


  function elToggleClass(el, cl) {
    if (el.hasClass(cl)) {
      el.removeClass(cl)
    } else {
      el.addClass(cl)
    }
  }

  function clickEffect(el, evt) {
    let animEl = '.clickCircle'
    if (el.find(animEl).length == 0)
      el.prepend("<span class='clickCircle'></span>")

    circle = el.find(animEl)
    circle.removeClass('animate')

    if (!circle.height() && !circle.width()) {
      d = Math.max(el.outerWidth(), el.outerHeight())
      circle.css({ height: d, width: d })
    }

    x = evt.pageX - el.offset().left - circle.width() / 2
    y = evt.pageY - el.offset().top - circle.height() / 2

    circle.css({ top: y + 'px', left: x + 'px' }).addClass('animate')
  }

  playerButton.add(sectionButton).add(playlistItem).add(eFollowArtist).on('click', function (e) {
    clickEffect($(this), e)
  })


  function lockBody() {
    setTimeout(function () {
      if (!document.body.hasAttribute('data-body-scroll-fix')) {
        let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        document.body.setAttribute('data-body-scroll-fix', scrollPosition);
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = '-' + scrollPosition + 'px';
        document.body.style.left = '0';
        document.body.style.width = '100%';
      }
    }, 1);
  }

  function unlockBody() {
    if (document.body.hasAttribute('data-body-scroll-fix')) {
      let scrollPosition = document.body.getAttribute('data-body-scroll-fix');
      document.body.removeAttribute('data-body-scroll-fix');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.width = '';
      window.scroll(0, scrollPosition);
    }
  }


  // --- Tabs modal
  let tabsModal = $('.tabs-modal'),
    tabsModalBackdrop = $('.tabs-modal__backdrop'),
    tabsModalContainer = $('.tabs-modal__container'),
    tabsModalClose = $('.tabs-modal__close-btn'),
    eTabsModalOpen = $('[data-evt="openTabsModal"]')

  let tabsModalTab = tabsModal.find('.btn-tab')
  // Initial
  tabsModal.hide()
  tabsModalBackdrop.add(tabsModalContainer).removeClass(IS_VISIBLE)

  function openTabsModal() {
    lockBody()
    tabsModal.show()
    setTimeout(() => {
      tabsModalBackdrop.add(tabsModalContainer).addClass(IS_VISIBLE)
    }, 1);
  }

  function closeTabsModal() {
    tabsModalBackdrop.add(tabsModalContainer).removeClass(IS_VISIBLE)
    setTimeout(() => {
      tabsModal.hide()
      unlockBody()
    }, 451);
  }

  eTabsModalOpen.on('click', function () {
    openTabsModal()
  })
  tabsModalClose.add(tabsModalBackdrop).add(tabsModalTab).on('click', function () {
    closeTabsModal()
  })



  // --- Floating button EXPLORE
  let floatingVisible,
    floatingWrap = $('.floating-wrap')

  function showFloatingButtons() {
    floatingVisible = true
    floatingWrap.addClass(IS_VISIBLE)
  }

  function hideFloatingButtons() {
    floatingVisible = false
    floatingWrap.removeClass(IS_VISIBLE)
  }

  hideFloatingButtons()

  if ($(window).width() < 992 && floatingWrap) {
    let el = $('.tabs_overscroll')
    $(window).scroll(function () {
      let elOffset = el.offset().top,
        elHeight = el.outerHeight(),
        footerOffset = $('footer').offset().top,
        thisScroll = $(this).scrollTop(),
        scrollBias = $(window).width() > 991 ? (0 + $('header').outerHeight()) : 270
      if (thisScroll > (elOffset + elHeight - scrollBias)) {
        showFloatingButtons()
      } else {
        hideFloatingButtons()
      }
      if (thisScroll > footerOffset - 600) {
        hideFloatingButtons()
      }
    });
  }



  // --- Expand desktop tabs
  let eExpandTabs = $('[data-evt="expandTabs"]'),
    tabsWrapper = $('.rs-tabs'),
    tabButton = $('.btn-tab'),
    limitTabs = 7

  if (tabButton.length < (limitTabs - 1)) {
    eExpandTabs.remove()
  }

  function toggleTabsExpand() {
    if ($(window).width() > 991) {
      if (tabsWrapper.hasClass(IS_EXPANDED)) {
        tabsWrapper.removeClass(IS_EXPANDED)
        eExpandTabs.find('span').text('SHOW MORE...')
      } else {
        tabsWrapper.addClass(IS_EXPANDED)
        eExpandTabs.find('span').text('SHOW LESS')
      }
    }
  }
  eExpandTabs.on('click', function () {
    toggleTabsExpand()
  })



  // --- Player
  playlistItem.on('click', function () {
    playlistItem.removeClass(IS_ACTIVE)
    $(this).addClass(IS_ACTIVE)
  })


  // Show / hide player
  let eClosePlayer = $('.player-close')

  function hidePlayer() {
    let needBodyBlock = $(window).width() < 992
    if (needBodyBlock) {
      unlockBody()
      playerBackdrop.css('opacity', '0')
      setTimeout(() => {
        playerBackdrop.hide()
      }, 350);
    }
    if (body.hasClass(P_VISIBLE)) {
      body.removeClass(P_VISIBLE)
    }
  }

  function openPlayer() {
    let needBodyBlock = $(window).width() < 992
    if (needBodyBlock) {
      lockBody()
      playerBackdrop.show()
      setTimeout(() => {
        playerBackdrop.css('opacity', '1')
      }, 1);
    }
    if (body.not(P_VISIBLE)) {
      body.addClass(P_VISIBLE)
    }
  }

  // openPlayer()

  $('.video-item').on('click', function () {
    openPlayer()
  })
  eClosePlayer.add(playerBackdrop).on('click', function () {
    hidePlayer()
  })



  // Min / max player
  let eTogglePlayer = $('[data-evt="togglePlayer"]')

  eTogglePlayer.on('click', function () {
    elToggleClass(body, P_MIN)
  })


  // Follow status player
  let eFollowPlayer = $('.player__follow-btn')

  function togglePlayerFollow(el) {
    if (el.hasClass(IS_ACTIVE)) {
      el.removeClass(IS_ACTIVE).html('Follow')
    } else {
      el.addClass(IS_ACTIVE).html('Followed')
    }
  }
  eFollowPlayer.on('click', function (e) {
    togglePlayerFollow($(this))
    clickEffect($(this), e)
  })


  // Toggle playlist height
  let eTogglePlaylist = $('[data-evt="expandPlaylist"]'),
    playlistWrap = $('.player__playlist-wrap'),
    playlistOverlay = $('.playlist-overlay'),
    animateTime = 300,
    playlistHeight = 160

  function autoHeightAnimate(element, time) {
    var curHeight = element.height(),
      autoHeight = element.css('height', 'auto').height()
    element.height(curHeight)
    element.stop().animate({ height: autoHeight }, time)
  }

  function togglePlaylist() {
    if (playlistWrap.height() <= 160) {
      autoHeightAnimate(playlistWrap, animateTime)
      playlistOverlay.css('opacity', '0')
      playlistWrap.addClass(IS_ACTIVE)
      eTogglePlaylist.html('Collapse')
    } else {
      playlistWrap.scrollTop(0).stop().animate({ height: playlistHeight }, animateTime).removeClass(IS_ACTIVE)
      playlistOverlay.css('opacity', '1')
      eTogglePlaylist.html('Expand')
    }
  }

  eTogglePlaylist.on('click', function () {
    togglePlaylist()
  })


  // Fav player button
  let eHeartVideo = $('.player-btn_fav')
  eHeartVideo.on('click', function () {
    elToggleClass($(this), IS_ACTIVE)
  })

  // Shuffle button
  let eShufflePlayer = $('[data-playlist-action="shuffle"]')
  eShufflePlayer.on('click', function () {
    elToggleClass($(this), IS_ACTIVE)
  })



  // --- Header
  let headerLink = $('.header-link'),
    dropdown = $('.header-dropdown'),
    dropdownBlock = $('.header-dropdown__container'), ddTimer


  function openDropdown(el) {
    clearTimeout(ddTimer)
    let thisDropdown = el.find(dropdown),
      thisBlock = el.find(dropdownBlock)
    if (thisDropdown) {
      thisDropdown.show()
      setTimeout(() => {
        thisBlock.addClass(IS_VISIBLE)
      }, 1);
    } else {
      return false
    }
  }

  function closeDropdown(el) {
    let thisDropdown = el.find(dropdown),
      thisBlock = el.find(dropdownBlock)
    thisBlock.removeClass(IS_VISIBLE)
    ddTimer = window.setTimeout(function () {
      thisDropdown.hide()
    }, 350)
  }

  headerLink.on('mouseenter', function () {
    openDropdown($(this))
  })
  headerLink.on('mouseleave', function () {
    closeDropdown($(this))
  })



  let eOpenSearch = $('[data-evt="openPageSearch"]')
  let searchBody = $('.search__body')
  let searchContent = $('.search__content')

  function openPageSearch() {
    searchContent.css(cssDisplayBlock)
    setTimeout(() => {
      searchContent.removeClass('hidden');
      setTimeout(() => {
        searchBody.removeClass('hidden');
        document.getElementById("artistSearchInput2").focus();
      }, 60);
    }, 10);
  }

  function closePageSearch() {
    searchBody.addClass('hidden')
    setTimeout(() => {
      searchContent.addClass('hidden')
    }, 60);
    setTimeout(() => {
      searchContent.css(cssDisplayNone)
    }, 400);
  }

  eOpenSearch.on('click', function () {
    openPageSearch()
  })

  $('.search_overlay').click(function () {
    closePageSearch()
  })



  // --- Page tabs
  let tabData = 'data-tab'

  function switchTabStatus(el) {
    $(`[${tabData}]`).removeClass(IS_ACTIVE)
    let a = el.attr(`${tabData}`),
      b = $(`[${tabData}="${a}"]`)
    b.addClass(IS_ACTIVE)
  }

  $(`[${tabData}]`).on('click', function () {
    switchTabStatus($(this))
  })



  // --- Menu

  let appMenu = $('.app-menu'),
    appMenuBackdrop = $('.app-menu__backdrop'),
    appMenuContainer = $('.app-menu__container'),
    eToggleMenu = $('[data-evt="toggleMenu"]'),
    appMenuLink = $('.app-menu__main-list a')

  // Initial
  appMenu.hide()
  appMenuBackdrop.add(appMenuContainer).removeClass(IS_VISIBLE)

  function openMenu() {
    lockBody()
    appMenu.show()
    setTimeout(() => {
      appMenuBackdrop.addClass(IS_VISIBLE)
      appMenuContainer.addClass(IS_VISIBLE)
    }, 1);
  }

  function closeMenu() {
    unlockBody()
    appMenuBackdrop.removeClass(IS_VISIBLE)
    appMenuContainer.removeClass(IS_VISIBLE)
    setTimeout(() => {
      appMenu.hide()
    }, 301);
  }

  function toggleMenu() {
    if (appMenu.css('display') == 'block') {
      closeMenu()
    } else {
      openMenu()
    }
  }

  eToggleMenu.add(appMenuBackdrop).on('click', function () {
    toggleMenu()
  })

  appMenuLink.on('click', function () {
    closeMenu()
  })

})