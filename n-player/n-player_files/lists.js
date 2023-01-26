$(function () {
  $(document).on('click', '.list-item__open-details', function () {
    let thisDetails = $(this).closest($('.list-item')).find($('.list-item__more')),
      visibleDetails = $('.list-item__more').filter(function () {
        if ($(this).css('display') === 'block') {
          return this
        }
      })
    visibleDetails.hide()
    thisDetails.show()
  })
  $(document).on('click', '.lists__nav-btn ', function () {
    $('.lists__nav-btn ').removeClass('is-active')
    $(this).addClass('is-active')
  })
  
})