const app = {
  header_sticky: () => {
    // Hide header on scroll down
    let didScroll;
    let lastScrollTop = 0;
    let delta = 5;
    let navbarHeight = $("header").outerHeight();

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
      let st = $(this).scrollTop();

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
    $(window).on('load', function () {
      document.addEventListener("mousemove", (e) => {
        // console.log(e.clientX,e.clientY);
        // $('#cursor').style.top = e.clientY + `px`;
        // $('#cursor').style.left = e.clientX + `px`;
        $('#cursor').css({ 'top': `${e.clientY}px`, 'left': `${e.clientX}px` })
      });
    })
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
      let filterValue = $(this).attr("data-filter");
      $grid.isotope({ filter: filterValue });
    });
  },
  tabs: () => {
    $("[filter-tabs]").on("click", "button", function () {
      $("[filter-tabs]").find("button.is-active").removeClass("is-active");
      $(this).addClass("is-active");
    });
    $('#tabs_demo').on('click', 'button', function () {
      $("#tabs_demo").find("button.is-active").removeClass("is-active");
      $(this).addClass("is-active");
    })
  },
  empower_masonry: () => {
    $(".empower_grid").isotope({
      layoutMode: "packery",
      itemSelector: ".col",
    });
    $(".grid2").isotope({
      layoutMode: "packery",
      itemSelector: ".col",
    });
  },
  splider: () => {
    document.addEventListener('DOMContentLoaded', function () {
      $('.splide').imagesLoaded(function (instance) {
        // Create the AutoScroll extension.
        const AutoScroll = function (Splide, Components) {
          const Track = Components.Track;
          const pxPerFrame = 3;

          let paused = true;
          let page = 0;

          return {
            mount() {
              this.update = this.update.bind(this);

              Splide.on('mouseenter', () => {
                this.pause();
              }, Splide.root);

              Splide.on('mouseleave', () => {
                this.play();
              }, Splide.root);
            },

            // Start scroll after load.
            mounted() {
              setTimeout(this.play.bind(this), 1000);
            },

            // Start scroll.
            play() {
              if (paused) {
                paused = false;
                Components.Elements.list.style.transition = '';
                requestAnimationFrame(this.update);
              }
            },

            // Pause scroll.
            pause() {
              paused = true;
            },

            // Update the slider position on every frame.
            update() {
              Track.translate(Track.position - pxPerFrame);
              Track.shift();

              const currentPage = Track.toIndex(Track.position);

              if (page !== currentPage) {
                this.onPageChanged(currentPage, page);
                page = currentPage;
              }

              if (!paused) {
                requestAnimationFrame(this.update);
              }
            },

            // Called when the page is changed.
            onPageChanged(newPage, prevPage) {
              // console.log("Splide slider " + prevPage + '->' + newPage );
            }
          };
        };

        new Splide('.splide').mount({ AutoScroll });
      });
      $('.splide2').imagesLoaded(function (instance) {
        // Create the AutoScroll extension.
        const AutoScroll = function (Splide, Components) {
          const Track = Components.Track;
          const pxPerFrame = 3;

          let paused = true;
          let page = 0;

          return {
            mount() {
              this.update = this.update.bind(this);

              Splide.on('mouseenter', () => {
                this.pause();
              }, Splide.root);

              Splide.on('mouseleave', () => {
                this.play();
              }, Splide.root);
            },

            // Start scroll after load.
            mounted() {
              setTimeout(this.play.bind(this), 1000);
            },

            // Start scroll.
            play() {
              if (paused) {
                paused = false;
                Components.Elements.list.style.transition = '';
                requestAnimationFrame(this.update);
              }
            },

            // Pause scroll.
            pause() {
              paused = true;
            },

            // Update the slider position on every frame.
            update() {
              Track.translate(Track.position - pxPerFrame);
              Track.shift();

              const currentPage = Track.toIndex(Track.position);

              if (page !== currentPage) {
                this.onPageChanged(currentPage, page);
                page = currentPage;
              }

              if (!paused) {
                requestAnimationFrame(this.update);
              }
            },

            // Called when the page is changed.
            onPageChanged(newPage, prevPage) {
              // console.log("Splide slider " + prevPage + '->' + newPage );
            }
          };
        };

        new Splide('.splide2').mount({ AutoScroll });
      });
      $('.splide3').imagesLoaded(function (instance) {
        // Create the AutoScroll extension.
        const AutoScroll = function (Splide, Components) {
          const Track = Components.Track;
          const pxPerFrame = 3;

          let paused = true;
          let page = 0;

          return {
            mount() {
              this.update = this.update.bind(this);

              Splide.on('mouseenter', () => {
                this.pause();
              }, Splide.root);

              Splide.on('mouseleave', () => {
                this.play();
              }, Splide.root);
            },

            // Start scroll after load.
            mounted() {
              setTimeout(this.play.bind(this), 1000);
            },

            // Start scroll.
            play() {
              if (paused) {
                paused = false;
                Components.Elements.list.style.transition = '';
                requestAnimationFrame(this.update);
              }
            },

            // Pause scroll.
            pause() {
              paused = true;
            },

            // Update the slider position on every frame.
            update() {
              Track.translate(Track.position - pxPerFrame);
              Track.shift();

              const currentPage = Track.toIndex(Track.position);

              if (page !== currentPage) {
                this.onPageChanged(currentPage, page);
                page = currentPage;
              }

              if (!paused) {
                requestAnimationFrame(this.update);
              }
            },

            // Called when the page is changed.
            onPageChanged(newPage, prevPage) {
              // console.log("Splide slider " + prevPage + '->' + newPage );
            }
          };
        };

        new Splide('.splide3').mount({ AutoScroll });
      });
    })
  },
  tabs_shop: () => {
    document.addEventListener('DOMContentLoaded', function () {

      new Splide('#tabs_shop_splide-1', {
        type: 'loop',
        perPage: 3,
        autoplay: true,
        interval: 4000,
        flickMaxPages: 1,
        updateOnMove: true,
        pagination: false,
        arrows: false,
        padding: '10%',
        gap: '30px',
        // throttle: 300,
        breakpoints: {
          2000: {
            perPage: 2,
            padding: '19%'
          },
          1440: {
            perPage: 2,
            padding: '10%'
          },
          1024: {
            gap: '15px',
            perPage: 2,
            padding: '5%'
          },
          768: {
            padding: '1%',
            perPage: 2,
            gap: '15px',
          },
          525: {
            perPage: 1,
            gap: '15px',

          }
        }
      }).mount();
      new Splide('#tabs_shop_splide-2', {
        type: 'loop',
        perPage: 3,
        autoplay: true,
        interval: 4000,
        flickMaxPages: 1,
        updateOnMove: true,
        pagination: false,
        arrows: false,
        padding: '10%',
        gap: '30px',
        // throttle: 300,
        breakpoints: {
          2000: {
            perPage: 2,
            padding: '19%'
          },
          1440: {
            perPage: 2,
            padding: '10%'
          },
          1024: {
            gap: '15px',
            perPage: 2,
            padding: '5%'
          },
          768: {
            padding: '1%',
            perPage: 2,
            gap: '15px',
          },
          525: {
            perPage: 1,
            gap: '15px',

          }
        }
      }).mount();
    });
    $('#tabs_demo').on('click', 'button', function () {
      $('#tabs_demo').find('button.is-active').removeClass('is-active');
      $(this).addClass('is-active');
      $('.tabs_demo').find('.tabs_shop_splide.control-active').removeClass('control-active')
      $(this.getAttribute('aria-controls')).addClass('control-active')
    })
  },
  table: () => {
    $('#table_viewmore').on('click', function () {
      $('#total_wrap').addClass('view-more-active')
    })

  },
  galaxy: () => {
    let number_of_star = 200;

    let random_number = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    let createStars = function () {
      let star_rotation = 'move_right;';
      for (let i = 0; i < number_of_star; i++) {
        rot = (star_rotation == 'move_right;' ? 'move_left;' : 'move_right;');
        let star_top = random_number(0, 300);
        let star_left = random_number(0, 1000);
        let star_radius = 1;
        let star_duration = random_number(3, 6);
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);

        document.getElementById('galaxy_eff').innerHTML += "<div class='star' style='top: " + star_top + "px; left: " + star_left + "px; width: " + star_radius + "px; height: " + star_radius + "px; " +
          "animation-name:" + star_rotation + "; animation-duration: " + star_duration + "s;background-color:#" + randomColor + "'></div>";
      }
    };

    createStars();

  },
  text_circle: () => {
    const str = "highconverting";
    const text = $('#text-circle');
    // console.log(text);
    $(window).on('load', function () {
      for (let i = 0; i < str.length; i++) {
        text.append(`<span style="transform:rotate(${26 * i}deg)">${str[i]}</span>`);
      }
    })
  },
  back_to_top: () => {
    let btn = $('back-to-top');

    $(window).scroll(function () {
      if ($(window).scrollTop() > 300) {
        btn.addClass('show');
      } else {
        btn.removeClass('show');
      }
    });

    btn.on('click', function () {
      $('html, body').animate({ scrollTop: 0 }, '0');
    });


  },
  video_popup: () => {
    $(document).ready(function () {
      $('.popup_youtube').magnificPopup({
        disableOn: 768,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        callbacks: {
          open: function () {
            $('.video-item').find('video').trigger('pause');
          },
          close: function () {
            $('.video-item.is-hover').find('video').trigger('play');
          }
        },
      });
      $(window).on('resize load scroll', function () {
        if (window.innerWidth <= 768) {
          $('.popup_youtube').attr('target', '_blank');
        }
        // active video when hover
        if (window.innerWidth > 768) {
          $('#section_video').on('mouseover', 'video', function () {
            $('.video-item').find('video').trigger('pause');
            // $('.video-item').find('.poster_img').css('display', 'block');
            $('.video-item.is-hover').removeClass('is-hover');
            $(this).parents('.video-item').addClass('is-hover');
            // $(this).next('.poster_img').css('display', 'none');
            $(this).trigger('play');
            $(this).prop('muted', false);
          });
        } else {
          video_on_mobile();
        }
        if ($('#section_video').isInViewport()) {
          // console.log("Can play");
          // play  when in viewport
          // $('#section_video').find('.video-item.is-hover video').trigger('play');
          // muted = false in viewport
          // $('#section_video').find('.video-item.is-hover video').prop('muted', false);
        } else {
          // console.log("pause");
          // pause when isn't in viewport
          $('#section_video').find('video').prop('muted', true)

        }
      })
    });
    document.addEventListener('DOMContentLoaded', () => {
      window.click()
    })
    const video_on_mobile = () => {
      $('#section_video').on('touchstart', '.video-trigger-mobile', function () {
        // let current = ;
        $('.video-item').find('video').trigger('pause');
        $('.video-item.is-hover').removeClass('is-hover');
        let id = $(this).data('trigger');
        $(id).addClass('is-hover');
        $(id).find('video').trigger('play');
        $(id).find('video').prop('muted', false);
        //   $(this).parents('.video-item').addClass('is-hover')
        //   $(this).parents('.video-item video').trigger('play');
        //   $(this).parents('.video-item video').prop('muted', false);
      })
    }
    $.fn.isInViewport = function () {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
      return elementBottom > viewportTop && elementTop < viewportBottom;
    };

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
    app.splider();
    app.table();
    app.galaxy();
    app.text_circle();
    app.tabs_shop();
    app.back_to_top();
    app.video_popup();
  },
};

app.start();
