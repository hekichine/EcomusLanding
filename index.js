const app = {
  header_sticky: () => {
    // Hide header on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $("header").outerHeight();

    $(window).scroll(function (event) {
      didScroll = true;
    });

    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);

    function hasScrolled() {
      var st = $(this).scrollTop();

      // Make scroll more than delta
      if (Math.abs(lastScrollTop - st) <= delta) return;

      // If scrolled down and past the navbar, add class .nav-up.
      if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $("header").removeClass("hdt-nav-down").addClass("hdt-nav-up");
      } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
          $("header").removeClass("hdt-nav-up").addClass("hdt-nav-down");
        }
      }

      lastScrollTop = st;
    }
  },
  header_change_bg: () => {
    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 100) {
        $("header").addClass("hdt-nav-not-root");
      } else {
        $("header").removeClass("hdt-nav-not-root");
      }
    });
  },
  nav_on_mb: () => {
    $(window).on("load", function () {
      if ($(window).width() < 1025) {
        $("[append-body]").appendTo("body");
      } else {
        $("[append-body]").appendTo(".hdt-nav");
      }
    });
    $(window).on("resize", function () {
      if ($(window).width() < 1025) {
        $("[append-body]").appendTo("body");
      } else {
        $("[append-body]").appendTo(".hdt-nav");
      }
    });
  },
  open_menu_mb: () => {
    $(".hdt-nav_button").on("click", function () {
      $(".hdt-menu_nav").addClass("open");
    });
    $(".close-menu").on("click", function () {
      $(".hdt-menu_nav").removeClass("open");
    });
    $(window).on('resize',function(){
      if($(window).width() > 1023){
        $(".hdt-menu_nav").removeClass("open");
      }
    })
  },
  cursor:()=>{
    const cursor = document.getElementById('cursor');
    
    document.addEventListener('mousemove',e =>{
      // console.log(e.clientX,e.clientY);
      cursor.style.top = e.clientY + `px`;
      cursor.style.left = e.clientX + `px`;
    })
  },
  filter:()=>{
    let $grid = $('.demo-layout').isotope({
      itemSelector: '.col',
      layoutMode: 'fitRows'
    })
    $('[filter-tabs]').on('click','button',function(){
      var filterValue = $( this ).attr('data-filter');
      $grid.isotope({ filter: filterValue });
    })
  },
  tabs:()=>{
    $('[filter-tabs]').on('click','button',function(){
      $('[filter-tabs]').find('button.is-active').removeClass('is-active')
      $(this).addClass('is-active');
    })
  },
  start: () => {
    console.log("App start ...");
    app.header_sticky();
    app.header_change_bg();
    app.nav_on_mb();
    app.open_menu_mb();
    app.cursor();
    app.tabs();
    app.filter()
  },
};
app.start();
