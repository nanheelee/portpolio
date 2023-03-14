$(function(){

  let $win = $(window);
  let $doc = $('html, body');
  let $header = $('.header'); 

  // top_menu
  let $top_menu = $header.find('.top_menu>li>a');

  // full-menu 관련 변수
  let $fm = $('.full-screen_menu');
  let $fm_gnb_li_a = $fm.find('.gnb>li>a');
  let $fm_depth1_li = $fm_gnb_li_a.next('.depth_1').children('li');
  let $fm_close = $fm.find('.close_btn');
  let $fm_open = $header.find('.menu_btn');

  // search box 관련 변수
  let $search_box = $header.find('.search_box');
  let $search_close = $search_box.find('.close');
  let $search_open = $header.find('.bottom .search_btn')
  
  // gnb 관련 변수
  let $gnb_bg = $header.find('.bg_gnb');
  let $gnb_wrap = $header.find('.gnb_wrap');
  let $gnb = $gnb_wrap.children('.gnb');
  let $gnb_li = $gnb.children('li');
  let $gnb_depth_1 = $gnb_li.find('.depth_1');

  // 자주찾는 메뉴
  let $favolit_menu = $gnb_wrap.children('.favorite_menu');
  let $gnb_last = $favolit_menu.find('.gnb_last');
  
  // 탑버튼
  let $top_btn = $('.top_btn');

  let $tab_menu = $('.tab>li>a');
  // 방문자별 맞춤 - 메뉴
  let $visitor_menu = $('.visitor_tab>li>a');
  // 국민건강 알림서비스 - 탭메뉴
  let $disease_menu = $('.graph_tab>li>a');

  // footer site - 메뉴
  let $f_site_title = $('.footer .sites_wrap .title');
  let $f_site_menu = $('.footer .sites>li>a');

  let win_w = $(window).width();

  $win.on('resize', function(){
    win_w = $(this).width();
  });

  // top_button
  $top_btn.on('click', function(){
    $doc.stop().animate({'scrollTop' : 0}, 0);
  });

  // GNB UI - 모듈화
  function gnb_open(){
    $gnb_bg.show();
    $gnb_depth_1.show();
    $favolit_menu.show();
  }
  $gnb_li.on('mouseenter focusin', gnb_open);

  function gnb_close(){
    $gnb_bg.hide();
    $gnb_depth_1.hide();
    $favolit_menu.hide();
  }
  $gnb_wrap.on('mouseleave', gnb_close);
  $gnb_last.on('focusout', gnb_close);


  // full-screen_menu
  $fm_open.on('click', function(){
    $fm.show();
    $doc.css({"overflow":"hidden"});
  });

  $fm_close.on('click', function(){
    $fm.hide();
    $doc.css({"overflow":"auto"});
  });

  $fm_gnb_li_a.on('click', function(){
    $(this).addClass('on').next('.depth_1').show().parent('li').siblings().children('.depth_1').hide().siblings().removeClass('on');
  });
  $fm_gnb_li_a.first().trigger('click')

  $fm_depth1_li.on('click', function(){
    $(this).toggleClass('on');
    $(this).siblings().removeClass('on');
  });

  // top_menu
  $top_menu.on('click', function(){
    $(this).parent('li').toggleClass('on').siblings().removeClass('on');
  });


  //header-search_box
  $search_open.on('click', function(){
    $(this).toggleClass('on');
    $search_box.toggleClass('on');
  });
  $search_close.on('click', function(){
    $search_box.removeClass('on');
  });
  
  // visitor
  function tab_click($item, $this){
    $item.find('.panel').hide();
    $this.parent('li').addClass('on').siblings().removeClass('on');
    $this.next().show();
  }

  $tab_menu.on('click focusin', function(e){
      e.preventDefault();
      let $this = $(this);
      let $item = $('.' + $(this).parents('.tab').attr('class').split(' ')[0]);
      
      tab_click($item, $this);
  });
  $visitor_menu.first().trigger('click');
  $disease_menu.first().trigger('click');
  
  // footer
  $f_site_title.on('click ', function(){
    $(this).parent('.sites_wrap').siblings().removeClass('on');
    $(this).parent('.sites_wrap').toggleClass('on');
      
  });
  $f_site_menu.on('click', function(e){
      e.preventDefault();
      var txt = $(this).text();
      $(this).parents('.sites_box').prev('.footer .title').text(txt);
      $(this).parents('.sites_wrap').removeClass('on');
  });

  // -------------------------- swiper  -------------------------- 
  var swiper_01 = new Swiper('.top_info .slider-pc .swiper', {
    loop: true,
    speed: 500,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.top_info .slider-pc .swiper-pagination',
      type: "fraction",
    },
    navigation: {
      nextEl: '.top_info .slider-pc .swiper-button-next',
      prevEl: '.top_info .slider-pc .swiper-button-prev',
    },
  });

  var swiper_02 = new Swiper('.top_info .slider-mobile .swiper', {
    loop: true,
    speed: 500,
    touchRatio: 0,
    pagination: {
      el: '.top_info .slider-mobile .swiper-pagination',
      clickable: true,
    },
    
  });

  var swiper_03 = new Swiper('.banner .slider-pc .swiper', {
    loop: true,
    speed: 500,
    pagination: {
      el: '.banner .slider-pc .swiper-pagination',
      type: "fraction",
    },
    navigation: {
      nextEl: '.banner .slider-pc .swiper-button-next',
      prevEl: '.banner .slider-pc .swiper-button-prev',
    },
  });

  var swiper_04 = new Swiper('.banner .slider-mobile .swiper', {
    // loop: true,
    speed: 500,
    touchRatio: 0,
    pagination: {
      el: '.banner .slider-mobile .swiper-pagination',
      clickable: true,
    },    
  });


  var swiper_05 = new Swiper('.event.slider-pc .swiper', {
    loop: true,
    speed: 500,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.event.slider-pc .swiper-pagination',
      type: "fraction",
    },
    navigation: {
      nextEl: '.event.slider-pc .swiper-button-next',
      prevEl: '.event.slider-pc .swiper-button-prev',
    },
  });

  var swiper_06 = new Swiper('.event.slider-mobile .swiper', {
    loop: true,
    speed: 500,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.event.slider-mobile .swiper-pagination',
      clickable: true,
    },
  });

  var swiper_07 = new Swiper('.marketing.slider-pc .swiper', {
    loop: true,
    speed: 500,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.marketing.slider-pc .swiper-pagination',
      type: "fraction",
    },
    navigation: {
      nextEl: '.marketing.slider-pc .swiper-button-next',
      prevEl: '.marketing.slider-pc .swiper-button-prev',
    },
  });

  var swiper_08 = new Swiper('.marketing.slider-mobile .swiper', {
    loop: true,
    speed: 500,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.marketing.slider-mobile .swiper-pagination',
      clickable: true,
    },
  });

  // swiper_play-control
  $('.swiper-button-pause').on('click', function(){
    swiper.autoplay.stop();
    $(this).parent('.slide_play_wrap').addClass('stop');
  });

  $('.swiper-button-play').on('click', function(){
    swiper.autoplay.start();
    $(this).parent('.slide_play_wrap').removeClass('stop');
  });  
});