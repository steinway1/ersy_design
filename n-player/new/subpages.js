$(document).ready(function () {
  // Grid & List view for Lists page
  let switchViewButton = $('.sub-head__switch-button'),
    eSwitchList = $('[data-switch-list="list"]'),
    eSwitchGrid = $('[data-switch-list="grid"]')

  const IS_ACTIVE = 'is-active'

  //
  function toggleActiveClass(el, $this) {
    $this.siblings(el).removeClass(IS_ACTIVE)
    $this.addClass(IS_ACTIVE)
  }
  
  switchViewButton.click(function() {
    toggleActiveClass(switchViewButton, $(this))
    clickEffect($(this), e)
  })
})