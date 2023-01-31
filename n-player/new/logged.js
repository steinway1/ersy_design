$(function () {

  let notifyTab = $('.notify-modal__btn-tab'),
    notifyData = 'data-notify',
    notifyItem = $('.notify-item'),
    notifyTabCount = $('#allNotifyCount'),
    eMarkAll = $('[data-notify-evt="markAll"]'),
    eMarkNotification = $('[data-notify-evt="markRead"]'),
    notificationsAll = $(`[${notifyData}="all"]`),
    notificationsArchive = $(`[${notifyData}="archive"]`)

  const IS_ACTIVE = 'is-active',
    IS_READ = 'is-read'

  let emptyNotifyTempate = (text) => {
    return `<div class="notify-modal__empty-item">${text}</div>`
  }

  // Initial
  notificationsArchive.hide()

  // 
  function switchNotifications(el) {
    notifyTab.removeClass(IS_ACTIVE)
    el.addClass(IS_ACTIVE)
    let thisAttr = el.attr(`${notifyData}-tab`),
      els = $(`[${notifyData}]`),
      visible = () => {
        return els.filter(':visible')
      },
      indeed = els.filter(`[${notifyData}="${thisAttr}"]`)
    visible().hide()
    indeed.show()
  }

  // 
  function updateAllCount() {
    let notRead = notificationsAll.find(notifyItem).not(`.${IS_READ}`).length
    notifyTabCount.html(notRead)
  }

  // 
  function markAllNotifications() {
    let els = notificationsAll.find(notifyItem),
      notRead = els.filter(function () {
        if ($(this).not(`.${IS_READ}`)) {
          return this
        }
      })
    notRead.addClass(IS_READ)
    updateAllCount()
  }

  //
  function markNotification(el) {
    let thisNotification = el.closest(notifyItem)
    if (thisNotification && thisNotification.not(`.${IS_READ}`)) {
      thisNotification.addClass(IS_READ)
    }
    updateAllCount()
  }


  notifyTab.on('click', function () {
    switchNotifications($(this))
  })
  eMarkAll.on('click', function () {
    markAllNotifications()
  })
  eMarkNotification.on('click', function () {
    markNotification($(this))
  })



  // Dropdown toggle

  let eDropdown = $('[data-evt="openDropdown"]'),
    dropdown = $('.dropdown'),
    dropdownContainer = $('.dropdown-container'),
    dropTimer

  dropdown.hide()
  // dropdownContainer.removeClass(IS_VISIBLE)

  function openDropdown(el) {
    // clearTimeout(dropTimer)
    let thisDropdown = el.find(dropdown),
      thisContainer = thisDropdown.find(dropdownContainer)
    thisDropdown.show()

    // thisDropdown.show()
    // setTimeout(() => {
    //   thisContainer.addClass(IS_VISIBLE)
    // }, 1);
  }

  function closeDropdown(el) {
    let thisDropdown = el.find(dropdown),
      thisContainer = thisDropdown.find(dropdownContainer)

    thisDropdown.hide()

    // thisContainer.removeClass(IS_VISIBLE)
    // dropTimer = window.setTimeout(function () {
    //   thisDropdown.hide()
    // }, 200)
  }

  eDropdown.on('mouseover', function () {
    openDropdown($(this))
  }).on('mouseleave', function () {
    closeDropdown($(this))
  })

  $(window).on('scroll', function () {
    if (dropdown.is(':visible')) {
      closeDropdown(eDropdown)
    }
  })
  // 


  // Dark mode
  let eToggleDark = $('[data-evt="toggleDarkMode"]')

  eToggleDark.on("click", function () {
    var checkBoxes = $(this).find("input[type='checkbox']")
    if (checkBoxes.prop('checked') == true) {
      checkBoxes.prop('checked', false)
    } else {
      checkBoxes.prop('checked', true)
    }
  })


})