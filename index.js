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
  open_menu_mb: () => {
    // open menu mobile
    $('#open_menu_mb').on('click',function(){
      $('sidebar_menu_mb').addClass('active')
    })
    // close menu mobile when click button && close menu when click overlay && click brand logo
    $('sidebar_menu_mb .close_btn,sidebar_menu_mb .overlay,sidebar_menu_mb .brand_logo a').on('click',function(){
      $('sidebar_menu_mb').removeClass('active')
    })
    //  active link when click
    $('sidebar_menu_mb .hdt-nav_link').on('click',function(){
      $('sidebar_menu_mb .hdt-nav_link.active').removeClass('active');
      $(this).addClass('active');
      $('sidebar_menu_mb').removeClass('active')
    })
    // 
  },
  cursor: () => {
    // hiden when stop moving
    let timer;
    const mouse_stop=()=>{
      $('cursor').find('.cursor-glow canvas').removeClass('opacity-1');
      $('cursor').find('.cursor-glow canvas').addClass('opacity-0');
    }
    const mouse_on=()=>{
      $('cursor').find('.cursor-glow canvas').removeClass('opacity-0');
      $('cursor').find('.cursor-glow canvas').addClass('opacity-1');
    }
    const glow =()=>{
      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");
      // Create a radial gradient
      // The inner circle is at x=110, y=90, with radius=0
      // The outer circle is at x=100, y=100, with radius=50
      // x, y la toa do x/y tren document
      const gradient = ctx.createRadialGradient(800, 800, 0, 800, 800, 400);
      // console.log(gradient);
      // Add color stops
      gradient.addColorStop(0,"rgba(21,137,255, .11)");
      gradient.addColorStop(0.1,"rgba(21,137,255, .10)");
      gradient.addColorStop(0.2,"rgba(21,137,255, .09)");
      gradient.addColorStop(0.3,"rgba(21,137,255, .08)");
      gradient.addColorStop(0.4,"rgba(21,137,255, .07)");
      gradient.addColorStop(0.5,"rgba(21,137,255, .06)");
      gradient.addColorStop(0.6,"rgba(21,137,255, .05)");
      gradient.addColorStop(0.7,"rgba(21,137,255, .04)");
      gradient.addColorStop(0.8,"rgba(21,137,255, .03)");
      gradient.addColorStop(0.9,"rgba(21,137,255, .02)");
      gradient.addColorStop(1,"transparent");
      // Set the fill style and draw a rectangle
      ctx.fillStyle = gradient;
      // fillRect(x,y,z,k)
      // x,y: toa do bat dau
      // z,k: chieu rong / chieu cao cua filter
      ctx.fillRect(0, 0, 1600, 1600);
    }
    // start glow
    glow();
    if(window.innerWidth > 1149){
      document.addEventListener("mousemove", (e) => {
        mouse_on();
        clearTimeout(timer);
        timer=setTimeout(mouse_stop,300);
        let x = e.clientX;
        let y = e.clientY;
  
        $('.cursor-glow canvas').css({'top':y,'left':x})
      });
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
        id: ".splide2",
        options: {
          easing: "linear",
          type: "loop",
          pauseOnHover: false,
          autoplay: true,
          autoWidth: true,
          arrows: false,
          interval: 0,
          speed: 25000,
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
          speed: 7000,
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
      new Splide('.grid_layout_slider', {
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
    //   <div counter-value data-count="400" data-duration="1000">0</div>
    // </counter>
    // 
    $(window).scroll(function () {
      $('counter').each(function(){
        var oTop = $(this).offset().top - window.innerHeight;
        // console.log("Check number counter: ",$(window).scrollTop() > oTop);
        if ($(window).scrollTop() > oTop) {
          // console.log($(this).find('[counter-value]'));
          $(this).find('[counter-value]').each(function () {
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
        }
      })
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
      if(window.innerWidth > 768){
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
        des: parent.find('.des-hide').clone(),
        data_img: parent.find('.img').clone(),
        button: parent.find('.group-btn').clone(),
      }
      console.log(p_obj);
      popup_html.find('.title').text(p_obj.title);
      popup_html.find('.des').html(p_obj.des);
      popup_html.find('.button_wrap').html(p_obj.button);
      popup_html.find('.img_wrap .img').html(p_obj.data_img)      
      openPopup();
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
    const popup_original = `<div class="wrap">
    <div class="content_x">
    <h3 class="title"></h3>
    <div class="des"></div>
    <div class="button_wrap"></div>
    </div>  
    <div class="img_wrap">
    <div class="img hdt-ratio" style="--aspect-ratioapt: 928/503;">
    </div>
    </div>                  
    </div>`
  },
  logo_cta:()=>{
    $('.logo_cta').on('click',function(e){
      e.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, '0');
      console.log("done");
    })
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
    app.open_menu_mb();
    app.tabs();
    app.filter();
    app.empower_masonry();
    app.splider();
    // app.table();
    app.galaxy();
    app.text_circle();
    app.tabs_shop();
    app.back_to_top();
    app.video_popup(config);
    app.counter_number();
    app.swatch_color();
    app.reveal(config);
    app.popup();
    app.logo_cta();
    app.cursor();
    
    new WOW().init();
  },
};

app.start();

