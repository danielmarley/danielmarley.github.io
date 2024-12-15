function registerEvents() {
  loadJsonContent()

  $('button.navigation').click(e => {
    navigate(e)
  })

  registerThemeSelect()

  $('button[data-link]').click(e => {
    window.open($(e.currentTarget).data('link'), '_blank');
  })
}

function loadJsonContent() {
  for (let key in pageContent) {
    for (let section in pageContent[key]) {
      $(`#${key} > #${section}`).addClass('newline-preserve')
      $(`#${key} > #${section}`).text(pageContent[key][section])
    }
  }
}

function registerThemeSelect() {
  $('#palette-icon').click(e => {
    $('#theme-select').toggle()
  });

  // nested click handling
  $(document).on("click", "#theme-select", function(event) {
    $('#theme-select').toggle()
  })


  $('input[type="radio"][name="theme"]').on('change', function() {
    $('#theme-select').hide()
    console.log(`Selected value: ${this.value}`);
    document.documentElement.setAttribute("data-theme", this.value);
    setCookie("danielmarleytheme", this.value)
  });

  const prevTheme = getCookie("danielmarleytheme");
  if ( prevTheme !== null ) {
    $(`input[type="radio"][value="${prevTheme}"]`).prop('checked', true);
    // document.documentElement.setAttribute("data-theme", prevTheme);
  }
}

function navigate(e){
  $target = $(e.target);
  if ($target.hasClass('selected'))
    return;

  $('button.navigation').removeClass('selected')
  $target.addClass('selected');

  const tabToOpen = $target.data('tab');
  $('.tab.selected').removeClass('selected')
  $(`#${tabToOpen}`).addClass('selected')
}

function setCookie(name, value, days=365) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (let cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return value;
    }
  }
  return null;
}


$(document).ready(registerEvents)