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
    const splides = [
      {
        id: ".splide",
        options: {
          easing: "linear",
          type: "loop",
          pauseOnHover: true,
          autoplay: true,
          autoWidth: true,
          arrows: false,
          interval: 0,
          speed: 3000,
          pagination: false,
          padding: 10,
        }
      },
      {
        id: ".splide2",
        options: {
          easing: "linear",
          type: "loop",
          pauseOnHover: false,
          autoplay: true,
          autoWidth: true,
          arrows: false,
          interval: 0,
          speed: 10000,
          pagination: false,
          gap: "45px",
          breakpoints: {
            768: {
              gap: "25px"
            }
          }
        }
      },
      {
        id: ".splide3",
        options: {
          easing: "linear",
          type: "loop",
          pauseOnHover: true,
          autoplay: true,
          autoWidth: true,
          arrows: false,
          interval: 0,
          speed: 3000,
          pagination: false,
          gap: "34px",
          breakpoints: {
            1024: {
              perPage: 2,
              gap: "15px",
              autoWidth: false
            }
          }
        }
      }
    ]
      splides.map(item => {
        // console.log(item.options);
        new Splide(`${item.id}`, item.options).mount();
      })
      new Splide('#grid_layout_slider', {
        easing: "linear",
        type: "loop",
        pauseOnHover: true,
        autoplay: true,
        autoWidth: true,
        arrows: false,
        interval: 0,
        speed: 3000,
        pagination: false,
        gap: "15px",
        breakpoints: {
          1366: {
            perPage: 3,
            autoWidth: false,
          },
          1024: {
            perPage: 3,
            autoWidth: false,
          },
          768: {
            perPage: 3,
            autoWidth: false,
            gap: '5px'
          },
          525: {
            perPage: 2,
            autoWidth: false,
          }
        }
      }).mount();
  },
  tabs_shop: () => {
    
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

    

      $('#tabs_demo').on('click', 'button', function () {
        $('#tabs_demo').find('button.is-active').removeClass('is-active');
        $(this).addClass('is-active');
        $('.tabs_demo').find('.tabs_shop_splide.control-active').removeClass('control-active');
        let id = $(this).attr('aria-controls');
        // console.log(id);
        $(`#${id}`).addClass('control-active')
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
    for (let i = 0; i < str.length; i++) {
      text.append(`<span style="transform:rotate(${26 * i}deg)">${str[i]}</span>`);
    }


    const str2 = "one-time payment";
    const text2 = $('#payment_circle');
    // console.log(text);
    for (let i = 0; i < str2.length; i++) {
      text2.append(`<span style="transform:rotate(${9 * i}deg)">${str2[i]}</span>`);
    }
  },
  back_to_top: () => {
    let btn = $('back-to-top');

    $(window).on('scroll', function () {
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
  video_popup: (config) => {

    const video = (config) => {
      // add target_blank a tag
      // if (window.innerWidth <= 768) {
      //   $('.popup_youtube').attr('target', '_blank');
      // }
      // active video when hover
      if (window.innerWidth > 768) {
        $('#section_video').on('mouseover', 'video', function () {
          $('.video-item').find('video').trigger('pause');
          $('.video-item.is-hover').removeClass('is-hover');
          $(this).parents('.video-item').addClass('is-hover');
          $(this).trigger('play');

        });
      } else {
        if(config.video.disable_mobile){
          console.log("Disable video on mobile");
          $('#section_video').addClass('disable_mobile');
          return;
        }
        $('#section_video').on('mouseover', '.video-trigger-mobile', function () {
          $('.video-item').find('video').trigger('pause');
          $('.video-item.is-hover').removeClass('is-hover');
          let id = $(this).data('trigger');
          $(id).addClass('is-hover');
          $(id).find('video').trigger('play');
        })
      }
    }
   
      $('.popup_youtube').magnificPopup({
        // disableOn: 768,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        // callbacks: {
        //   open: function () {
        //     $('.video-item').find('video').trigger('pause');
        //   },
        //   close: function () {
        //     $('.video-item.is-hover').find('video').trigger('play');
        //   }
        // },
      });
      video(config);
  },
  counter_number: () => {
    // cau truc
    // 
    // <counter>
    //   <div counter-value data-count="400">0</div>
    // </counter>
    // 

    let a = 0;
    $(window).scroll(function () {
      var oTop = $('counter').offset().top - window.innerHeight;
      if (a == 0 && $(window).scrollTop() > oTop) {
        $('[counter-value]').each(function () {
          var $this = $(this),
            countTo = $this.data('count');
          $({
            countNum: $this.text()
          }).animate({
            countNum: countTo
          },
            {
              duration: $this.data('duration'),
              easing: 'swing',
              step: function () {
                $this.text(Math.floor(this.countNum));
              },
              complete: function () {
                $this.text(this.countNum);
                //alert('finished');
              }

            });
        });
        a = 1;
      }
    });
  },
  swatch_color: () => {
      $('.swatch_color').on('click', 'button', function () {
        $(this).parents().find('button.is-selected').removeClass('is-selected');
        $(this).addClass('is-selected');
      })
  },
  reveal: (config) => {
    // structor
    // <div>
    //  <div reveal>
    //    code html
    //  </div>
    // </div> 
    
    const reveal = (config) => {
      if(!config.reveal.enable){
        return
      }
      let reveals = document.querySelectorAll('[reveal]');
      if (reveals) {
        console.log("Reveal is working");
      } else {
        console.log("Reveal is not working because not find the item ");
        return;
      }
      $(window).on('scroll', function () {

        reveals.forEach((el) => {
          const windowHeight = window.innerHeight;
          const revealTop = el.getBoundingClientRect().top;
          const elHeight = $(this).height();
          const revealPoint = 150;
          // position & speed 
          const posPoint = 20;
          // attr parent
          el.parentElement.style.perspective = '700px';
          el.parentElement.style.transformStyle= 'preserve-3d';
          el.parentElement.style.perspectiveOrigin = '100% 0%';
          // attr node
          el.style.transformOrigin = '50% 0';
          el.style.translate = 'none';
          el.style.rotate = 'none';
          el.style.scale = 'none';
          el.style.transition = 'all .35s ease';
          // console.log(revealTop > windowHeight - revealPoint);
          if(revealTop > windowHeight - revealPoint){
            el.style.opacity = '0';
            el.style.transform = `rotateX(-${posPoint}deg)`
          }
          if (revealTop < windowHeight - revealPoint) {
            if(revealTop > -50){
              let schemas = Math.abs(1 - revealTop / elHeight);
              let opacity = Math.min((Math.abs(1 - (revealTop - 350) / elHeight)), 1);
              let rotate =  Math.min((posPoint * schemas - (posPoint - 10)),0)
              el.style.opacity = `${opacity}`;
              el.style.transform = `translate3d(0px,0px,0px) rotateX(${rotate}deg)`
            }
            else{
              el.style.transform = `translate(0,0)`
            }
          }
          
        })
      })
    }
    reveal(config)

  },
  popup:()=>{
    $('[name="grid_popup"]').on('click',function(e){

      e.preventDefault();

      const parent = $(this).parent();
      const popup_html = $('popup');
      let p_obj = {
        title: parent.find('.title').text(),
        des: parent.find('.des').text(),
        data_img: parent.find('img').data('src'),
        data_slide: parent.find('.show__wrap').html(),
      }
     
      popup_html.find('.title').text(p_obj.title);
      popup_html.find('.des').text(p_obj.des);

     
      if(p_obj.data_slide){
        popup_html.find('.hdt-ratio').replaceWith(p_obj.data_slide);
        new Splide('popup .splider_wrap', {
          easing: "linear",
          type: "loop",
          pauseOnHover: true, 
          autoplay: true,
          autoWidth: true,
          arrows: false,
          interval: 2000,
          // speed: 5000,
          pagination: false,
          breakpoints: {
            1366: {
              perPage: 3,
              autoWidth: false,
            },
            1024: {
              perPage: 3,
              autoWidth: false,
            },
            768: {
              perPage: 3,
              autoWidth: false,
            },
            525: {
              perPage: 2,
              autoWidth: true,
            }
          }
        }).mount();

      }
      if(p_obj.data_img){
        popup_html.find('img').attr('src',p_obj.data_img);
      }
      openPopup();
      p_obj = null;
    })
    const openPopup=()=>{
      $('popup').css('display','block');
    }
    const closePopup=()=>{
      $('popup').css('display','none');
      $('popup .content_inner').html(popup_original);
    }
    //  close popup 
    $('popup .popup-close,popup .overlay').on('click',function(){
      closePopup();
    })
    const popup_original = ` <div class="img_wrap">
          <div class="hdt-ratio" style="--aspect-ratioapt: 872/503;">
            <img src="./assets/images/b_ecomus/10.png" alt="">
          </div>
        </div>
        <h3 class="title">Optimize your Shop Store for millions of mobile shoppers</h3>
        <p class="des">Creating custom layouts for your online store is easier than ever with flex sections. We leverage CSS Flexbox, which allows for more
          multi-directional responsive layouts, and easy content alignment within sections of your store. Now you can simply drag and drop, re-size, group, and edit for a store that’s uniquely yours.</p>
        <div class="group-btn">
          <a href="#" target="_blank" class="hdt-btn-hover-icon docs">How to use it
            <svg class="hdt-icon" viewBox="0 0 24 24" focusable="false" width="16" height="16"><path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
          </a>
          <a href="#" class="buy" target="_blank">Buy theme - $19</a>
        </div>`

  },
  start: () => {
    const config={
      video:{
        disable_mobile: true
      },
      reveal:{
        enable: true
      }
    }
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
    app.video_popup(config);
    app.counter_number();
    app.swatch_color();
    app.reveal(config);
    app.popup();
  },
};

app.start();

