$(function () {
  let a = $(`<a href="#" class="home-artist-link">
  <div class="home-artist-link__current">
    <div class="home-artist-link__img-wrap">
      <img src="./new/x-bieber.png" class="home-artist-link__img">
    </div>
    <div class="home-artist-link__details-wrap">
      <span class="home-artist-link__artist-name">Justin Bieber</span>
      <span class="home-artist-link__videos-count">710 Music Videos</span>
    </div>
  </div>
</a>`)

  const INPUT_ACTIVE = 'is-active'

  let homeSearchInput = $('.home-search__input'),
  homeSearchButton = $('.home-search-btn')
  homeSearchInput.on('focus', function () {
    homeSearchButton.addClass(INPUT_ACTIVE)
  }).on('blur', function() {
    homeSearchButton.removeClass(INPUT_ACTIVE)
  })
})