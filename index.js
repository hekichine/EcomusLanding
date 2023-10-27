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
    $(".overlay").on("click", function () {
      $(".hdt-menu_nav").removeClass("open");
    });
    $(window).on("resize", function () {
      if ($(window).width() > 1023) {
        $(".hdt-menu_nav").removeClass("open");
      }
    });
  },
  cursor: () => {
    const cursor = document.getElementById("cursor");

    document.addEventListener("mousemove", (e) => {
      // console.log(e.clientX,e.clientY);
      cursor.style.top = e.clientY + `px`;
      cursor.style.left = e.clientX + `px`;
    });
  },
  cursor2: () => {
    const cursorOuter = document.querySelector(".cursor--large");
    const cursorInner = document.querySelector(".cursor--small");
    const cursorTextContainerEl = document.querySelector(".cursor--text");
    const cursorTextEl = cursorTextContainerEl.querySelector(".text");

    const hoverItems = document.querySelectorAll(".cursor-hover-item");
    const hoverEffectDuration = 0.3;
    let isHovered = false;
    let initialCursorHeight;

    const cursorRotationDuration = 8;

    let circleType = new CircleType(cursorTextEl);
    circleType.radius(50);

    setTimeout(() => {
      initialCursorHeight =
        circleType.container.style.getPropertyValue("height");
      console.log(initialCursorHeight);
    }, 50);

    hoverItems.forEach((item) => {
      item.addEventListener("pointerenter", handlePointerEnter);
      item.addEventListener("pointerleave", handlePointerLeave);
    });

    let mouse = {
      x: -100,
      y: -100,
    };

    document.body.addEventListener("pointermove", updateCursorPosition);

    function updateCursorPosition(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function updateCursor() {
      gsap.set([cursorInner, cursorTextContainerEl], {
        x: mouse.x,
        y: mouse.y,
      });

      gsap.to(cursorOuter, {
        duration: 0.15,
        x: mouse.x,
        y: mouse.y,
      });

      if (!isHovered) {
        gsap.to(cursorTextContainerEl, hoverEffectDuration * 0.5, {
          opacity: 0,
        });
        gsap.set(cursorTextContainerEl, {
          rotate: 0,
        });
      }

      requestAnimationFrame(updateCursor);
    }

    updateCursor();

    function handlePointerEnter(e) {
      isHovered = true;

      const target = e.currentTarget;
      updateCursorText(target);

      gsap.set([cursorTextContainerEl, cursorTextEl], {
        height: initialCursorHeight,
        width: initialCursorHeight,
      });

      gsap.fromTo(
        cursorTextContainerEl,
        {
          rotate: 0,
        },
        {
          duration: cursorRotationDuration,
          rotate: 360,
          ease: "none",
          repeat: -1,
        }
      );

      gsap.to(cursorInner, hoverEffectDuration, {
        scale: 2,
      });

      gsap.fromTo(
        cursorTextContainerEl,
        hoverEffectDuration,
        {
          scale: 1.2,
          opacity: 0,
        },
        {
          delay: hoverEffectDuration * 0.75,
          scale: 1,
          opacity: 1,
        }
      );
      gsap.to(cursorOuter, hoverEffectDuration, {
        scale: 1.2,
        opacity: 0,
      });
    }

    function handlePointerLeave() {
      isHovered = false;
      gsap.to([cursorInner, cursorOuter], hoverEffectDuration, {
        scale: 1,
        opacity: 1,
      });
    }

    function updateCursorText(textEl) {
      const cursorTextRepeatTimes = textEl.getAttribute(
        "data-cursor-text-repeat"
      );
      const cursorText = returnMultipleString(
        textEl.getAttribute("data-cursor-text"),
        cursorTextRepeatTimes
      );

      circleType.destroy();

      cursorTextEl.innerHTML = cursorText;
      circleType = new CircleType(cursorTextEl);
    }

    function returnMultipleString(string, count) {
      let s = "";
      for (let i = 0; i < count; i++) {
        s += ` ${string} `;
      }
      return s;
    }
  },
  filter: () => {
    let $grid = $("#isotope").isotope({
      itemSelector: ".isotope-item",
      layoutMode: "fitRows",
      filter: "*",
    });
    $("[filter-tabs]").on("click", "button", function () {
      var filterValue = $(this).attr("data-filter");
      $grid.isotope({ filter: filterValue });
    });
  },
  tabs: () => {
    $("[filter-tabs]").on("click", "button", function () {
      $("[filter-tabs]").find("button.is-active").removeClass("is-active");
      $(this).addClass("is-active");
    });
  },
  empower_masonry: () => {

    $('.empower_grid').isotope({
      layoutMode: 'packery',
      itemSelector: '.col'
    });
    
  },
  start: () => {
    console.log("App start ...");
    app.header_sticky();
    app.header_change_bg();
    app.nav_on_mb();
    app.open_menu_mb();
    // app.cursor();
    // app.cursor2();
    app.tabs();
    app.filter();
    app.empower_masonry();
  },
};

app.start();
