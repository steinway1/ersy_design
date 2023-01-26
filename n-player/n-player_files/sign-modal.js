$(function () {

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

  //Vars
  let signModal = $('.sign-modal')

  let tgToggleSign = $('[data-evt="toggleSignModal"]'),
    tgResetPass = $('.sign-modal__reset-link')

  let switchSignLogin = $('[data-sign-modal="signIn"]'),
    switchSignReg = $('[data-sign-modal="signUp"]')

  let signModalView = $('.sign-modal-view')
  signUpView = signModalView.filter('#signViewRegister'),
    signInView = signModalView.filter('#signViewLogin')


  const MODAL_VISIBLE = 'is-visible'

  //Functions  
  function toggleSignModal() {
    if (signModal) {
      if (signModal.hasClass(MODAL_VISIBLE)) {
        unlockBody()
        signModal.removeClass(MODAL_VISIBLE)
      } else {
        lockBody()
        signModal.addClass(MODAL_VISIBLE)
      }
    }
  }

  function switchSignView(type) {
    let visibleView = signModalView.filter(function () {
      if ($(this).is(':visible')) {
        return true
      }
    })
    visibleView.hide()
    type.show()

    let fields = type.find('input')
    fields.eq(0).focus()
  }

  function initialSignView() {
    switchSignView(signInView)
  }

  // Handling events
  initialSignView()

  $(document).on("click", '[data-evt="toggleSignModal"]',() => {
    toggleSignModal()
  });

  $(document).on("click", '[data-sign-modal="signIn"]', () => {
    switchSignView(signInView);
  });

  $(document).on("click",'[data-sign-modal="signUp"]' , () => {
    switchSignView(signUpView);
  });
  
  tgResetPass.click(function(e) {
    //e.preventDefault()
  })
})