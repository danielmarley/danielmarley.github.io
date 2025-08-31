function registerEvents() {
  $('button.navigate').click(e => {
    navigate(e)
  })

  $('button[data-link]').click(e => {
    window.open($(e.currentTarget).data('link'), '_blank');
  })

  $("#resumeDownload").click(e => {
    const link = document.createElement("a");
    link.href = "content/Marley Resume.pdf";
    link.download = "Marley Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  registerThemeSelect()
  registerImageCarousel()
  registerMobileMenu()

  if (location.hash && location.hash != ''){
    $(`button.navigate[data-tab='${location.hash.replace('#', '')}'`).click();
  }

  $('#grid').scrollTop(0)
  $(window).scrollTop(0)
}

function registerMobileMenu() {
  $('#hamburger').click(e => {
    $('#menu').addClass('open');
    $('#tint').addClass('open');
    e.stopPropagation();
  })

  function closeMenu(e) {
    $('#menu').removeClass('open');
    $('#tint').removeClass('open');
  }

  $('.menuItem.navigate').click(closeMenu)
  $('#tint').click(closeMenu)
  $('#tabs').click(closeMenu)
  $('#toolbar').click(closeMenu)
}

function registerImageCarousel() {
  const $carouselImages = $('.carouselImages');
  const totalImages = $carouselImages.children('.imgWrapper').length;

  let currentIndex = 0;

  function showImage(index, prevIndex) {
    const offset = -index * $carouselImages.find('.imgWrapper').outerWidth(); // width of image
    $($carouselImages.children('.imgWrapper')[index]).addClass('open');
    $carouselImages.css('transform', 'translateX(' + offset + 'px)');

    setTimeout(() => {
      if (prevIndex !== undefined) {
        $($carouselImages.children('.imgWrapper')[prevIndex]).removeClass('open');
      }
    }, 500)
  }

  $('.next').click(function() {
    prevIndex = currentIndex
    currentIndex = (currentIndex + 1) % totalImages;
    showImage(currentIndex, prevIndex);
  });

  $('.prev').click(function() {
    prevIndex = currentIndex
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    showImage(currentIndex, prevIndex);
  });

  // Auto slide every 3 seconds
  setInterval(function() {
    prevIndex = currentIndex
    currentIndex = (currentIndex + 1) % totalImages;
    showImage(currentIndex, prevIndex);
  }, 5000);

  $(window).on('resize', function() {
    showImage(currentIndex, undefined);
  })
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

    const color = getComputedStyle(document.documentElement)
               .getPropertyValue('--menu-background-color')
               .trim();
    console.log(color);
    document.querySelector('meta[name="theme-color"]')
            .setAttribute('content', color);

    setCookie("danielmarleytheme", this.value)
  });

  const prevTheme = getCookie("danielmarleytheme");
  if ( prevTheme !== null ) {
    document.documentElement.setAttribute("data-theme", prevTheme);
    $(`input[type="radio"][value="${prevTheme}"]`).prop('checked', true);
  }

  const color = getComputedStyle(document.documentElement)
               .getPropertyValue('--menu-background-color')
               .trim();
  document.querySelector('meta[name="theme-color"]')
          .setAttribute('content', color);
}

function navigate(e){
  $target = $(e.target);
  if ($target.hasClass('selected'))
    return;

  $('button.menuItem').removeClass('selected')
  $target.addClass('selected');

  const tabToOpen = $target.data('tab');
  location.hash = tabToOpen;
  $('.tab.selected').removeClass('selected')
  $(`#${tabToOpen}`).addClass('selected')
  $('#grid').scrollTop(0)
  $(window).scrollTop(0)
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
$(window).on('load', () => {
  $('#grid').scrollTop(0)
  $(window).scrollTop(0)
});