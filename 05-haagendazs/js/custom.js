$(function () {

    let $win = $(window);
    let $doc = $('html, body');
    let win_w = $win.width();

    let $header = $('.header');
    let $bg_gnb = $header.find('.bgGnb');
    let $gnb_wrap = $('.gnb_wrap');
    let $gnb = $gnb_wrap.children('.gnb');
    let $gnb_li = $gnb.children('li');
    let $gnb_li_a = $gnb_li.children('a');
    let $submenu = $gnb_li.children('.sub_menu');

    let $icecream_grid_wrap = $('.icecream .grid_wrap');
    let $icecream_grid = $icecream_grid_wrap.children('.grid');
    let $icecream_menu = $('.icecream .btn_list>li');
    let icecream_grid_wrap_h = [400,360,350,260];

    let $material_menu = $('.material .menu > li ');
    let $material_panel = $('.material .panel > li ');
    
    let $toggle_btn = $('.toggle');
    let $cancle_btn = $('.cancle');
    let $top_btn = $('.top_btn');
    let $more_btn = $('.icecream .more_btn');
    

    $win.on('resize',function(){
        win_w = $(this).width();
        
        if(win_w >= 980){
            $gnb_wrap.removeAttr('style');
            $submenu.removeAttr('style');
            $toggle_btn.removeAttr('style');
            $cancle_btn.removeAttr('style');

        }

        if(win_w>=1200){
            $icecream_grid.height(icecream_grid_wrap_h[0]);
        }else if(win_w>=768){
            $icecream_grid.height(icecream_grid_wrap_h[1]);
        }else if(win_w>640){
            $icecream_grid.height(icecream_grid_wrap_h[2]);
        }else{
            $icecream_grid.height(icecream_grid_wrap_h[3]);
        }


    });

/*---------scroll motion------------------------------------------------------*/ 
    let last = 0;
    let sec_pos = [];
    let base_line = -500;
    let $con = $('section');

    $con.each(function(){ //반복실행
        let this_offset = $(this).offset().top;
        sec_pos.push(this_offset);// 현재 위치 값을 배열변수 마지막에 추가 
    });

    last =$con.last().offset().top +$con.last().height();
    sec_pos.push(last);

    //스크롤 모션 
    $win.on('scroll',function(){
        let scroll = $(this).scrollTop();

        $con.each(function(index){
            if(scroll >= sec_pos[index] + base_line && scroll < sec_pos[index+1]){
                $(this).addClass('on');
            } 
        });

        if($(this).scrollTop() > 500){
            $top_btn.addClass('on');
        } else {
            $top_btn.removeClass('on');
        }

    });

    $top_btn.on('click',function(){
        $doc.animate({scrollTop:0},500);
        return false;
    });

/*---------gnb menu------------------------------------------------------*/ 

    function submenu_open(){
        if(win_w >= 980){
            $submenu.addClass('on');
            $bg_gnb.addClass('on');
            $gnb_wrap.addClass('on');

        } else{
            $gnb_li_a.off('clickf focusin');
            $gnb_li_a.on('click  focusin',function(){
                $submenu.stop().slideUp();
                $(this).next('.sub_menu').stop().slideToggle();
                $(this).parents().addClass('on').siblings().removeClass('on');
            });
        }
    }
    function submenu_close(){
        if(win_w >= 980){
            $submenu.removeClass('on');
            $bg_gnb.removeClass('on');
            $gnb_wrap.removeClass('on');
        } else{
            $cancle_btn.trigger('click');
        }
    }

    $gnb.on('mouseenter focusin', submenu_open);
    $bg_gnb.on('mouseleave',submenu_close);
    $('.submenu_close').on('focusout', submenu_close);

    $toggle_btn.on('click focusin',function(){
        $('.nav_wrap').addClass('on');
    });

    $cancle_btn.on('click',function(){
        $('.nav_wrap').removeClass('on');
    });

/*---------visual------------------------------------------------------*/ 
    let mySwiper_01 = new Swiper('.visual .swiper', {
        loop: true,
        pagination: {
            el: '.visual .swiper-pagination',
        },
        navigation: {
            nextEl: '.visual .swiper-button-next',
            prevEl: '.visual .swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
        }, 
    });



/*---------flavor------------------------------------------------------*/      
    let mySwiper_02 = new Swiper('.flavor .left_box', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    let mySwiper_03 = new Swiper('.flavor .right_box', {
        loop: true,
        effect: 'fade',
        navigation: {
            nextEl: '.flavor .swiper-button-next',
            prevEl: '.flavor .swiper-button-prev',
        },
    });


/*---------icecream------------------------------------------------------*/  

    //isotope 
    $icecream_grid.isotope({
        itemSelector: '.icecream_item',
    });

    // filter items on button click
    $icecream_menu.on('click', function (e) {
        let filterValue = $(this).children().attr('data-filter');

        e.preventDefault();
        $icecream_grid.isotope({
            filter: filterValue
        });

        $(this).addClass('on').siblings().removeClass('on');
        $more_btn.trigger('click'); // 메뉴 클릭할 때마다 more을 강제로 클릭하여, 그리드 wrap의 높이조정
    });

    //more 클릭할 때마다 - 그리드의 높이 구해서 자동조정
    $more_btn.on('click',function(e){
         let grid_h = $icecream_grid.height();
         e.preventDefault();
         $icecream_grid_wrap.stop().animate({ height : grid_h },300);
    });
    
    
/*---------tab_menu------------------------------------------------------*/
    $material_menu.on('click',function(e){
        e.preventDefault();
        let i = $(this).index();

        $(this).addClass('on').siblings().removeClass('on');
        $material_panel.eq(i).fadeIn().siblings().fadeOut();
        $material_panel.eq(i).addClass('on').siblings().removeClass('on');
    });

    $material_menu.first().trigger('click')    



});