$(function () {

  // Global

  getDOMFooter = () => $(document).find('footer')[0]
  getDOMHeader = () => $(document).find('header')[0]

  const P_MIN = 'player_collapsed',
    P_VISIBLE = 'player_visible',
    IS_ACTIVE = 'is-active',
    IS_VISIBLE = 'is-visible',
    IS_EXPANDED = 'is-expanded',
    IS_HIDDEN = 'is-hidden'

  let player = $('.player'), body = $('body'), playerButton = $('.player-button'),
    sectionButton = $('.player-section__main-button'), playlistItem = $('.playlist-item'),
    playerBackdrop = $('.player-backdrop')

  let eFollowArtist = $('.follow-artist')


  function scrollSmoothlyToY(pos, time) {
    var currentPos = window.pageYOffset;
    var start = null;
    if (time == null) time = 500;
    pos = +pos, time = +time;
    window.requestAnimationFrame(function step(currentTime) {
      start = !start ? currentTime : start;
      var progress = currentTime - start;
      if (currentPos < pos) {
        window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos);
      } else {
        window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));
      }
      if (progress < time) {
        window.requestAnimationFrame(step);
      } else {
        window.scrollTo(0, pos);
      }
    });
  }


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
    el.css({
      '-webkit-mask-image': '-webkit-radial-gradient(white, black)'
    })

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

  function animateAutoHeight(el, time) {
    let thisHeight = el.height(),
      autoHeight = el.css('height', 'auto').height()
    el.height(thisHeight).animate({
      height: autoHeight
    }, time)
  }
  function animateZeroHeight(el, time) {
    el.stop().animate({
      height: 0
    }, time)
  }

  playerButton.add(sectionButton).add(playlistItem).add(eFollowArtist).add('.player-tab').on('click', function (e) {
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


  // // --- Tabs modal
  // let tabsModal = $('.tabs-modal'),
  //   tabsModalBackdrop = $('.tabs-modal__backdrop'),
  //   tabsModalContainer = $('.tabs-modal__container'),
  //   tabsModalClose = $('.tabs-modal__close-btn'),
  //   eTabsModalOpen = $('[data-evt="openTabsModal"]')

  // let tabsModalTab = tabsModal.find('.btn-tab')
  // // Initial
  // tabsModal.hide()
  // tabsModalBackdrop.add(tabsModalContainer).removeClass(IS_VISIBLE)

  // function openTabsModal() {
  //   lockBody()
  //   tabsModal.show()
  //   setTimeout(() => {
  //     tabsModalBackdrop.add(tabsModalContainer).addClass(IS_VISIBLE)
  //   }, 1);
  // }

  // function closeTabsModal() {
  //   tabsModalBackdrop.add(tabsModalContainer).removeClass(IS_VISIBLE)
  //   setTimeout(() => {
  //     tabsModal.hide()
  //     unlockBody()
  //   }, 451);
  // }

  // eTabsModalOpen.on('click', function () {
  //   openTabsModal()
  // })
  // tabsModalClose.add(tabsModalBackdrop).add(tabsModalTab).on('click', function () {
  //   closeTabsModal()
  // })



  // // --- Floating button EXPLORE
  // let floatingVisible,
  //   floatingWrap = $('.floating-wrap')

  // function showFloatingButtons() {
  //   floatingVisible = true
  //   floatingWrap.addClass(IS_VISIBLE)
  // }

  // function hideFloatingButtons() {
  //   floatingVisible = false
  //   floatingWrap.removeClass(IS_VISIBLE)
  // }

  // hideFloatingButtons()

  // if ($(window).width() < 992 && floatingWrap) {
  //   let el = $('.tabs_overscroll')
  //   $(window).scroll(function () {
  //     let elOffset = el.offset().top,
  //       elHeight = el.outerHeight(),
  //       footerOffset = $('footer').offset().top,
  //       thisScroll = $(this).scrollTop(),
  //       scrollBias = $(window).width() > 991 ? (0 + $('header').outerHeight()) : 270
  //     if (thisScroll > (elOffset + elHeight - scrollBias)) {
  //       showFloatingButtons()
  //     } else {
  //       hideFloatingButtons()
  //     }
  //     if (thisScroll > footerOffset - 600) {
  //       hideFloatingButtons()
  //     }
  //   });
  // }



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
    eToggleMenu = $('[data-evt="toggleMenu"]')

  function openMenu() {
    lockBody()
    appMenu.show()
    setTimeout(() => {
      Object.assign(appMenuBackdrop[0].style, { opacity: 1 })
      Object.assign(appMenuContainer[0].style, { transform: 'translateX(0%)' })
    }, 1);
  }

  function closeMenu() {
    let timeToHide = ((parseFloat(window.getComputedStyle(appMenuContainer[0]).transitionDuration) * 1000) + 1)
    unlockBody()
    Object.assign(appMenuBackdrop[0].style, { opacity: 0 })
    Object.assign(appMenuContainer[0].style, { transform: 'translateX(-100%)' })
    setTimeout(() => {
      appMenu.hide()
    }, timeToHide);
  }

  function toggleMenu() {
    if (appMenu.css('display') == 'block') {
      closeMenu()
    } else {
      openMenu()
    }
  }

  eToggleMenu.on('click', function () {
    toggleMenu()
  })

  appMenuLink.on('click', function () {
    closeMenu()
  })



  // -- Subpages
  let switchViewButton = $('.sub-head__switch-button'),
    subHeadTab = $('.sub-head__btn-tab'),
    listTotal = $('.list-total'),
    searchListInput = $('#searchLists')

  const SWITCH_LIST_ATTR = 'data-switch-list',
    GRID_VIEW = 'list-container_grid',
    LIST_TAB_ATTR = 'data-list-tab'

  let pageContent = $('.page-content'),
    listContainer = $('.list-container')

  function toggleActiveClass(el, $this) {
    $this.siblings(el).removeClass(IS_ACTIVE)
    $this.addClass(IS_ACTIVE)
  }

  function switchListView($this) {
    let thisAttr = $this.attr(SWITCH_LIST_ATTR)
    if (thisAttr) {
      let container = $this.closest(pageContent).find(listContainer)
      if (thisAttr == 'grid' && !container.hasClass(GRID_VIEW)) {
        container.addClass(GRID_VIEW)
      } else if (thisAttr == 'list' && container.hasClass(GRID_VIEW)) {
        container.removeClass(GRID_VIEW)
      } else {
        container.removeClass(GRID_VIEW)
      }
    }
  }

  function sortListType($this) {
    let thisAttr = $this.attr(LIST_TAB_ATTR)
    if (thisAttr) {
      if (thisAttr == 'all') {
        listTotal.show()
      } else {
        let n = listTotal.filter(function () {
          if ($(this).attr('data-list-type') == thisAttr) {
            return this
          }
        })
        if (n.length !== 0) {
          listTotal.show().not(n).hide()
        } else {
          listTotal.show()
        }
      }
    }
  }

  function filterSearchLists(input) {
    $(`[${LIST_TAB_ATTR}="all"]`).trigger('click')
    let thisVal = input.val(),
      found = listTotal.filter(function () {
        if (~$(this).find('.list-total__list-name').text().toLowerCase().indexOf(thisVal.toLowerCase())) {
          return this
        }
      })
    listTotal.show().not(found).hide()
  }


  switchViewButton.click(function () {
    toggleActiveClass(switchViewButton, $(this))
  })
  subHeadTab.click(function () {
    toggleActiveClass(subHeadTab, $(this))
  })

  $(`[${SWITCH_LIST_ATTR}]`).click(function () {
    switchListView($(this))
  })

  $(`[${LIST_TAB_ATTR}]`).click(function () {
    sortListType($(this))
  })

  searchListInput.on('keyup', function () {
    filterSearchLists($(this))
  })


  // Toggle subpage head filters
  let eToggleFilter = $('[data-evt="toggleSubheadFilters"]'),
    subpageFilters = $('.sub-head__filters-group'),
    animateHeightTime = $(window).width() > 479 ? 130 : 290

  eToggleFilter.click(function () {
    if (subpageFilters.height() !== 0) {
      animateZeroHeight(subpageFilters, animateHeightTime)
      $(this).removeClass(IS_ACTIVE)
    } else {
      animateAutoHeight(subpageFilters, animateHeightTime)
      $(this).addClass(IS_ACTIVE)
    }
  })

  // Artists subpage
  let artistCardFollow = $('.artist-card__follow-button')
  artistCardFollow.click(function () {
    if ($(this).hasClass(IS_ACTIVE)) {
      $(this).removeClass(IS_ACTIVE).find('span').text('Follow')
    } else {
      $(this).addClass(IS_ACTIVE).find('span').text('Followed')
    }
  })

  const sidePlayer = {
    init: function () {
      this.cacheDOM()
      this.bindEvents()
    },
    cacheDOM: function () {
      this.expandTab = $('[data-evt="expandPlayerTabs"]')
      this.tabsGrid = $('.player__tabs-grid')
      this.playlistItems = $('.playlist-item')
      this.searchMain = $('.player-search__main')
      this.searchInput = this.searchMain.find('input')
      this.searchResults = $('.player-search__results')
      this.eCloseSearch = $('[data-evt="closePlayerSearch"]')
      this.eOpenSearch = $('[data-evt="openPlayerSearch"]')
      this.playlistBody = $('.playlist-body')
    },

    searchHeight: '74px',
    resultsHeight: '220px',
    searchIsOpened: false,
    bindEvents: function () {
      this.expandTab.on('click', this.toggleTabsGrid.bind(this))
      this.eCloseSearch.on('click', function (e) {
        e.preventDefault()
        sidePlayer.closeSearch()
      })
      this.eOpenSearch.on('click', this.openSearch.bind(this))
      this.searchInput.on('input', function () {
        let val = $(this).val()
        sidePlayer.checkInput(val)
      })
      this.playlistBody.on('click', function () {
        if (sidePlayer.searchIsOpened == true) {
          sidePlayer.closeSearch()
        }
      })
    },
    openSearch: function () {
      this.searchIsOpened = true
      this.searchMain.css({ 'height': this.searchHeight })
      this.searchInput.focus()
      this.playlistItems.css({
        'opacity': '0.07',
        'pointer-events': 'none'
      })
    },
    closeSearch: function () {
      this.searchIsOpened = false
      this.searchMain.css({ 'height': '0px' })
      this.searchInput.blur().val('')
      this.closeResults()
      this.playlistItems.css({
        'opacity': '1',
        'pointer-events': 'auto'
      })
    },
    openResults: function () {
      this.searchResults.css('height', this.resultsHeight)
    },
    closeResults: function () {
      this.searchResults.css('height', '0px')
    },
    checkInput: function (val) {
      if (val.length !== 0) {
        this.openResults()
      } else {
        this.closeResults()
      }
    },
    toggleTabsGrid: function () {
      let el = this.tabsGrid, t = this.expandTab.find('span')
      if (el.hasClass(IS_EXPANDED)) {
        el.removeClass(IS_EXPANDED)
        t.html('More')
      } else {
        el.addClass(IS_EXPANDED)
        t.html('Less')
      }
    }
  }
  sidePlayer.init()

  $(document).on('click', '.follow-button', function () {
    let $this = $(this)
    if ($this.hasClass('is-active')) {
      $this.removeClass('is-active').html('FOLLOW ARTIST')
    } else {
      $this.addClass('is-active').html('FOLLOWING')
    }
  })


  // Artist page navigation
  const artistNav = {
    init: function () {
      this.renderDOM()
      this.bindEvents()
    },
    renderDOM: function () {
      // DOM
      this.floatContainer = $('.page-artist__floating-buttons')
      this.floatOffsetEl = $('.rs-tabs')
      this.modal = $('.artist-nav-modal')
      this.backdrop = $('.artist-nav-modal__backdrop')
      this.container = $('.artist-nav-modal__container')
      this.content = $('.artist-nav-modal__content')
      // Events
      this.evtToggleNav = $('[data-evt="toggleArtistNav"]')
      this.evtPageUp = $('[data-evt="pageUp"]')
    },
    bindEvents: function () {
      $(window).on({
        scroll: function () {
          let el = artistNav.floatContainer
          if (el) {
            let data = {
              offset: artistNav.floatOffsetEl.offset().top,
              elHeight: artistNav.floatOffsetEl.outerHeight(),
              thisScroll: $(this).scrollTop(),
              headerBias: $(getDOMHeader()).outerHeight()
            }
            if (data.thisScroll > ((data.offset + data.elHeight) - data.headerBias)) {
              el[0].classList.add(IS_VISIBLE)
            } else {
              el[0].classList.remove(IS_VISIBLE)
            }
          }
        }
      })
      this.evtPageUp.on({
        click: function () { scrollSmoothlyToY(0, 350) }
      })
      this.evtToggleNav.on({
        click: function () {
          artistNav.toggleModal()
        }
      })
      this.modal.find('.btn-tab').on({
        click: function () {
          artistNav.toggleModal();
          scrollSmoothlyToY(artistNav.floatOffsetEl.offset().top, 200);
        }
      })
    },
    toggleModal: function () {
      let a = this.modal, b = this.backdrop, c = this.container
      if (a) {
        let modalIsHidden = a.css('display') == 'none'
        if (modalIsHidden) {
          lockBody()
          a.show(); setTimeout(() => {
            Object.assign(b[0].style, { opacity: 1 })
            Object.assign(c[0].style, { transform: 'translateY(0%)' })
          }, 1);
        } else {
          unlockBody()
          let timeToHide = ((parseFloat(window.getComputedStyle(c[0]).transitionDuration) * 1000) + 1)
          Object.assign(b[0].style, { opacity: 0 })
          Object.assign(c[0].style, { transform: 'translateY(100%)' }); setTimeout(() => {
            a.hide()
          }, timeToHide);
        }
      }
    }
  }
  artistNav.init()

})