$(function () {
  var player = $('.player'),
    playerBody = $('.player-body'),
    playerOverlay = $('.player-overlay'),
    sideBar = $('.player-sidebar'),
    cssDisplayNone = { 'display': 'none' },
    cssDisplayBlock = { 'display': 'block' }


  // ... Tooltips
  $(function () {
    if ($(window).width() > 478) {
      tippy('.player-button, .playlist-btn', {
        placement: 'bottom',
        theme: 'bluegold',
        delay: [500, 0]
      });
    }
  })


  // ... Player overall
  // Open related videos container
  $(function () {
    let showRelated = $('[data-player-action="show-related"]'),
      hideRelated = $('[data-player-action="hide-related"]'),
      innerOverlay = $('.player__inner-overlay')

    function openRelated() {
      //Show inner player overlay
      innerOverlay.css(cssDisplayBlock)
      setTimeout(() => {
        innerOverlay.css({ 'opacity': '1' })
      }, 10);
      //Expanding sidebar
      sideBar.addClass('is-expanded')
    }
    function closeRelated() {
      innerOverlay.css({ 'opacity': '0' })
      setTimeout(() => {
        innerOverlay.css(cssDisplayNone)
      }, 350);
      sideBar.removeClass('is-expanded')
    }

    showRelated.click(function () {
      if (sideBar.not('is-expanded')) {
        openRelated()
      }
    })
    hideRelated.click(function () {
      if (sideBar.hasClass('is-expanded')) {
        closeRelated()
      }
    })
  })


  // ... Playlist events
  $(function () {
    let shuffle = $('[data-playlist-action="shuffle"]'),
      collapse = $('[data-playlist-action="collapse"]'),
      repeat = $('[data-playlist-action="repeat"]'),
      remove = $('.playlist-remove'),
      playlistItem = $('.playlist-item')

    //Repeat playlist
    repeat.on('click', function () {
      if ($(this).hasClass('is-active')) {
        $(this).removeClass('is-active')
      } else {
        $(this).addClass('is-active')
      }
    })

    //Shuffle playlist
    shuffle.on('click', function () {
      let itemRandom = $('.playlist__list .playlist-item');
      for (var i = 0; i < itemRandom.length; i++) {
        var target = Math.floor(Math.random() * itemRandom.length - 1) + 1;
        var target2 = Math.floor(Math.random() * itemRandom.length - 1) + 1;
        itemRandom.eq(target).before(itemRandom.eq(target2));
      }
    })

    //Remove playlist row item
    // remove.on('click', function () {
    //     $(this).closest(playlistItem).addClass('is-remove')
    //     setTimeout(() => {
    //         $(this).closest(playlistItem).remove()
    //     }, 450);
    // })

    //Playlist list height toggle
    $(function () {
      let playlist = $('.playlist-body'),
        zeroHeight = 0,
        animateTime = 300

      function showPlaylist() {
        autoHeightAnimate(playlist, animateTime)
        setTimeout(() => {
          playlist.css({ 'height': 'auto' })
        }, animateTime + 1);
        collapse.removeClass('is-rotated')
      }
      function hidePlaylist() {
        playlist.stop().animate({ height: zeroHeight }, animateTime)
        collapse.addClass('is-rotated')
      }

      collapse.on('click', function () {
        if (playlist.height() <= 1) {
          showPlaylist()
          this._tippy.setContent('Collapse')
        } else {
          hidePlaylist()
          this._tippy.setContent('Expand')
        }
      })

      // - Autoheight animate function
      function autoHeightAnimate(element, time) {
        var curHeight = element.height(),
          autoHeight = element.css('height', 'auto').height()
        element.height(curHeight)
        element.stop().animate({ height: autoHeight }, time)
      }
    })


    // ... Player events

    //Player close / open
    $(function () {
      let close = $('[data-player-action="close"]'),
        open = $('.test-trigger')

      function openPlayer() {
        player.css(cssDisplayBlock)
        setTimeout(() => {
          player.removeClass('is-hidden')
        }, 1);
      }
      function closePlayer() {
        player.addClass('is-hidden')
        setTimeout(() => {
          player.css(cssDisplayNone)
        }, 401);
      }

      close.click(function () {
        closePlayer()
      })
      open.click(function () {
        openPlayer()
      })
    })

    // Player minimize / maximize
    $(function () {
      let minimize = $('[data-player-action="minimize"]'),
        expand = $('[data-player-action="expand"]')

      minimize.click(function () {
        if (player.not('is-collapsed')) {
          player.addClass('is-collapsed')
        }
      })
      expand.click(function () {
        // if (player.hasClass('is-collapsed')) {
        //     player.removeClass('is-collapsed')
        // }
      })
    })

    // Player theme switch
    $(function () {
      let themeSwitch = $('[data-player-action="theme"]'),
        darkClass = "player_dark"

      themeSwitch.click(function () {
        if (player.hasClass(darkClass)) {
          player.removeClass(darkClass)
        } else {
          player.addClass(darkClass)
        }
      })
    })

    // Player add video to favorite
    // $(function () {
    //     let addFav = $('[data-player-action="fav"]')

    //     addFav.click(function () {
    //         if ($(this).hasClass('is-active')) {
    //             $(this).removeClass('is-active')
    //         } else {
    //             $(this).addClass('is-active')
    //         }
    //     })
    // })

    // Player roll down / up
    $(function () {
      let fold = $('[data-player-action="fold"]')
      var foldClass = "player_full-fold"

      fold.click(function () {
        if (player.hasClass(foldClass)) {
          player.removeClass(foldClass)
          fold.removeClass('is-rotated')
        } else {
          player.addClass(foldClass)
          fold.addClass('is-rotated')
        }
      })
    })

    // Player follow artist button
    // $(function () {
    //     let follow = $('.player__follow-btn'),
    //         followClass = 'is-followed'

    //     follow.click(function () {
    //         if ($(this).hasClass(followClass)) {
    //             $(this).removeClass(followClass).html('Follow Artist')
    //         } else {
    //             $(this).addClass(followClass).html('Followed')
    //         }
    //     })
    // })
  })

})