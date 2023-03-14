$(function () {
    var is_open = false;
    var win_w = $(window).width();

    
    let $win = $(window);
    
    let $all_menu_area = $('.all_menu_area');
    let $all_menu_bg = $('.all_menu_bg');
    let $all_menu_close = $all_menu_area.find('.all_menu_close');
    
    let $all_menu = $('.all_menu');
    let $all_menu_show = $('.all_menu_show');

    let $all_menu_a = $all_menu.children('li').children('a');
    let $all_menu_panel = $all_menu_a.next('.panel');
    let $all_menu_depth1_a = $all_menu_panel.find('.depth_1>li>a');
    let $all_menu_depth2 = $all_menu_depth1_a.next('.depth_2');

    // window - resize
    $win.on('resize', function () {
        win_w = $(this).width();
        if (win_w > 1024) {
            $all_menu_panel.removeAttr('style');
            $all_menu_depth2.removeAttr('style');
        }else{
            $all_menu_open.trigger('click');
        }
    });


    // ---------------- header ----------------------
    // pc - all_menu - toggleBtn
    $all_menu_show.on('click', function(){
        $all_menu_area.addClass('on');
        $all_menu_bg.addClass('on');
    });

    $all_menu_close.on('click', function(){
        $all_menu_area.removeClass('on');
        $all_menu_bg.removeClass('on');
    });

    // tablet - all_menu
    $all_menu_a.on('click', function(e){
        e.preventDefault();
        if(win_w < 1024){
            $all_menu_panel.hide(); 
            $(this).next('.panel').toggle();

            $all_menu_a.removeClass('on'); 
            $(this).addClass('on');
        }
    });
    $all_menu_a.first().trigger('click');

    $all_menu_depth1_a.on('click', function(e){
        e.preventDefault();
        if(win_w < 1024){
            $all_menu_depth2.hide();
            $(this).next('.depth_2').toggle(300);
        }
    });

    // search
    let $search_btn = $('.search_btn.toggle');
    let $search_box = $('.search_box');
    $search_btn.on('click focusin', function(){
        $gnb.trigger('mouseleave');
        $search_box.fadeToggle();
        $(this).toggleClass('open');

        if( $(this).hasClass('open')){
            $(this).children('i').removeClass('fa-search').addClass('fa-x');
        }else{
            $(this).children('i').removeClass('fa-x').addClass('fa-search');
        }

    });
    
    let $gnb = $('.gnb');
    let $gnb_li = $gnb.children('li');
    let $gnb_li_panel = $gnb_li.children('.panel');
    let $lang = $('.language');

    function gnb_open(){
        if (win_w > 1024) {
            $search_box.hide();
            $search_btn.removeClass('open').children('i').removeClass('fa-x').addClass('fa-search');

            $gnb_li_panel.hide();
            $gnb_li.removeClass('on'); $(this).addClass('on');
            
            if(is_open){
                $(this).children('.panel').show();
            }else{
                $(this).children('.panel').stop().slideDown(200);
                is_open = true;                
            }   
        }
    }

    function gnb_close(){
        if(win_w > 1024){
            is_open = false;
            $gnb_li_panel.stop().delay(200).slideUp(200);
            $gnb_li.removeClass('on');
        }
    }
    
    $gnb_li.on('mouseenter focusin', gnb_open);
    $gnb.on('mouseleave', gnb_close);

    // language
    $lang.on('click',function(){
        $(this).toggleClass('show');
    });
    
    // ---------------- visual ----------------------
    let visual_swiper_01 = new Swiper('.slide1 .swiper', {
        loop: true
        , allowTouchMove: false
        , autoplay: {
            delay: 2500
            , autoplayDisableOnInteraction: true
        , }
        , navigation: {
            nextEl: '.slide1 .swiper-button-next'
            , prevEl: '.slide1 .swiper-button-prev'
        , 
        }, 
    });

    let visual_swiper_02 = new Swiper('.slide2 .swiper', {
        loop : true, 
        allowTouchMove: false
        , slidesPerView: 6
        , spaceBeteen: 0
        , breakpoints: {
            340: {
                slidesPerView: 3
                , spaceBetween: 40
            , }
            , 1024: {
                slidesPerView: 6
                , spaceBetween: 0
            , }
        , }
        , navigation: {
            nextEl: '.slide2 .swiper-button-next'
            , prevEl: '.slide2 .swiper-button-prev'
        , }
    });

    let swiper_03_banner = new Swiper('.banner .swiper', {
        allowTouchMove: false
        , slidesPerView: 1
        , autoplay: {
            autoplayDisableOnInteraction: true
        , }
        , spaceBeteen: 0
        , breakpoints: {
            340: {
                slidesPerView: 2
            , }
            , 768: {
                slidesPerView: 3
            , }
            , 1024: {
                slidesPerView: 4
            }
        , }
        , navigation: {
            nextEl: '.banner .next', 
            prevEl: '.banner .prev',
        },
    });


    
    let $visual = $('.visual');
    let $visual_btn_wrap = $visual.find('.btn_wrap');
    let $visual_swiper_prev = $visual.find('.slide1 .swiper-button-prev');
    let $visual_swiper_next = $visual.find('.slide1 .swiper-button-next');
    let $visual_btn_start = $visual_btn_wrap.children('.start');
    let $visual_btn_pause = $visual_btn_wrap.children('.pause');
    let $visual_btn_prev = $visual_btn_wrap.children('.prev');
    let $visual_btn_next = $visual_btn_wrap.children('.next');

    //------------------------visual 슬라이드 컨트롤 버튼
    $visual_btn_pause.on('click', function () {
        $(this).hide();
        $visual_btn_start.show();
        visual_swiper_01.autoplay.stop();
    });
    $visual_btn_start.on('click', function () {
        $(this).hide();
        $visual_btn_pause.show();
        visual_swiper_01.autoplay.start();
    });

    $visual_btn_prev.on('click', function () {
        $visual_swiper_prev.trigger('click');
    });
    $visual_btn_next.on('click', function () {
        $visual_swiper_next.trigger('click');
    });

    // ---------------- banner ----------------------

    let $banner_play = $('.banner .play');

    $banner_play.on('click', function () {
        $(this).toggleClass('on');
        if($(this).hasClass('on')){
            swiper_03_banner.autoplay.start();
        }else{
            swiper_03_banner.autoplay.stop();
        }
        
    });

    let $tab_menu = $('.tab_menu>li>a');

    function tab_click($item, $this){
        $item.find('.panel').hide(); 
        $this.next('.panel').show();
        $this.parents('li').siblings('li').removeClass('on');
        $this.parents('li').addClass('on');  
    }

     // ---------------- tab menu ui ----------------------
     $tab_menu.on('click focusin', function (e) {
        e.preventDefault();
        let $this = $(this);

        if ( $this.parents().hasClass('notice')){
            tab_click( $('.notice'), $this );
        } else if($this.parents().hasClass('service')){
            tab_click( $('.service'), $this );
        }
    });
    $('.notice').find( $tab_menu).first().trigger('click');
    $('.service').find( $tab_menu).first().trigger('click');


    // ---------------- site ----------------------
    // 전국 검찰청
    $('.site_wrap .open').on('click', function(){
        $('.pop_box').slideToggle();
       
    });

    

});