$(function () {
  //... Global
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

  // Triggers
  let eOpenAddModal = $('[data-evt="openAddModal"]'),
    eCloseAddModal = $('[data-evt="closeAddModal"]')

  // Els
  let addModal = $('.add-modal'),
    addModalBackdrop = $('.add-modal__backdrop'),
    addModalContainer = $('.add-modal__container'),
    addModalSet = $('.add-modal-set'),
    visibleSet = () => {
      return addModalSet.filter(':visible')
    }
  // Other
  let addModalAttr = 'data-add-modal'

  const IS_VISIBLE = 'is-visible'

  // Initial
  addModal.hide()
  addModalBackdrop.add(addModalContainer).removeClass(IS_VISIBLE)

  // Functions
  function showAddSet(el) {
    addModalSet.hide()
    let elAttr = el.attr(addModalAttr),
      indeedSet = addModalSet.filter(`#${elAttr}`)
    if (indeedSet.length == 0) {
      addModalSet.eq(0).show()
    } else {
      indeedSet.show()
    }
  }
  function openAddModal() {
    lockBody()
    addModal.show()
    visibleSet().find('input').eq(0).focus()
    setTimeout(() => {
      addModalBackdrop.add(addModalContainer).addClass(IS_VISIBLE)
    }, 0.1);
  }
  function closeAddModal() {
    unlockBody()
    addModalBackdrop.add(addModalContainer).removeClass(IS_VISIBLE)
    setTimeout(() => {
      addModal.hide()
    }, 201);
  }

  // Handling events
  eOpenAddModal.click(function () {
    showAddSet($(this))
    openAddModal()
  })
  eCloseAddModal.click(function () {
    closeAddModal()
  })



  // ... Add List set
  let setListFirst = $('#setListFirst'),
    setListSecond = $('#setListSecond'),
    setListHeading = $('#setListHeading'),
    setListInputTitle = $('#setListTitle'),
    setListColumns = $('#setListColumns'),
    setListStep = 0
  // Triggers
  let eSetListNext = $('[data-set-evt="nextStep"]'),
    eSetListPrev = $('[data-set-evt="prevStep"]'),
    eSetListAdd = $('[data-set-evt="addColumn"]')
  // Templates
  const colTemplate =
    `<div class="add-modal__form-col">
      <input type="text" placeholder="Column">
      <button class="add-modal__row-delete">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
          d="M22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.20101 22.5 1.5 17.799 1.5 12C1.5 6.20101 6.20101 1.5 12 1.5C17.799 1.5 22.5 6.20101 22.5 12ZM24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM6 12.75H18V11.25H6V12.75Z"
          fill="currentColor"/>
        </svg>
     </button>
    </div>`

  // Initial
  setListStep = 0
  setListFirst.show()
  setListSecond.hide()

  // Functions
  function resetSetList() {
    setListFirst.show()
    setListSecond.hide()
    eSetListPrev.html('Cancel')
    setListHeading.html('Request New List')
    setListInputTitle.val('')

    let totalCols = setListColumns.find('.add-modal__form-col'),
      staticCol = () => { return totalCols.slice(0, 3) }
    if (totalCols.length > 3) {
      totalCols.not(staticCol()).remove()
    }
    staticCol().find('input').val('')
    setListStep = 0
  }

  function setListNextStep() {
    if (!setListStep) {
      let listName = setListInputTitle.val()
      if (listName) {
        setListHeading.html(listName)
      } else {
        setListHeading.html('Empty Name')
      }
      setListFirst.hide()
      setListSecond.show().find('input:first').focus()
      eSetListPrev.html('Back')
      setListStep = 1
    } else {
      alert('New List Requested')
    }
  }

  function setListBackStep() {
    if (!setListStep) {
      resetSetList()
      closeAddModal()
    } else {
      setListHeading.html('Request New List')
      setListSecond.hide()
      setListFirst.show().find('input:first').focus()
      eSetListPrev.html('Cancel')
      setListStep = 0
    }
  }

  function setListAddCol() {
    setListColumns.append(colTemplate).find('input:last').focus()
  }

  // Handling events
  eSetListNext.click(function () {
    setListNextStep()
  })

  eSetListPrev.click(function () {
    setListBackStep()
  })

  eSetListAdd.click(function () {
    setListAddCol()
  })

  $(document).on('click', '.add-modal__row-delete', function () {
    $(this).parent('.add-modal__form-col').remove()
  })

  eCloseAddModal.click(function () {
    resetSetList()
  })

})