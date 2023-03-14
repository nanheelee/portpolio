$(function () {

    // 변수 선언
    let $win = $(window);

    // 윈도우 너비 
    let win_w = $win.width();   

    // scroll motion 변수---------------------------
    let $page = $('section');
    let page_offset = [];
    let base_h = -400;
    
    // header + gnb---------------------------
    let $header = $('.header');
    let $nav= $header.find('nav');
    let $gnb_bg = $header.children('.gnb_bg');
    let $gnb = $('.gnb');
    let $gnb_li = $gnb.children('li');
    let $gnb_close = $gnb.find('.gnb_close');
    let $submenu = $gnb.find('.sub');
    let $toggle = $header.find('.toggle');

    // visual - slider---------------------------
    let $frame = $('.slide_frame');
    let $slide = $frame.children('.slide_bg').children('li');
    let $slide_txt = $frame.children('.slide_txt').children('li');
    let $slide_img = $frame.children('.slide_img').children('li');
    let $name_txt = $frame.children('.name_txt').children('li');
    let $circle = $frame.children('.circle').children('li');
    let $ind_btn = $frame.children('.indigator').children('.btn');
    let $circle_bg = $frame.children('.circle_bg').children('.round');


    let circle_color = ['#887468', '#cec0b1', '#887468', '#cec0b1']; // circle 그래프 색상
    let len = $slide.length; // 슬라이드 개수
    let i = 0, prev_i = 0;   // 슬라이드 현재 인덱스, 이전 인덱스
    let loop_slide;
    let slide_speed = 2500; // 슬라이드 속도

    // b_story ---------------------------
    let $b_story = $('.b_story');
    let $b_story_slide = $b_story.find('.slide_box');
    let $b_story_slide_li = $b_story_slide.children('li');
    let $b_story_page_btn =  $b_story.find('.pagination button');
    

    // top btn -----------------------------
    let $top_btn = $('.top');

    // ------------------- window - resize -------------------//
    $win.on('resize', function () {
        win_w = $(this).width();
        
        // 인디케이터 반응형 변환시 - 위치 변경 오류 - 해결 위한 코드
        $ind_btn.removeClass('on');
        setTimeout(function(){  indigator();  }, 300);
        
    });
    $win.trigger('resize');


    // ------------------- Scroll Motion -------------------//
        
    $win.on('scroll', function () {
        
        let scroll = $(this).scrollTop();
        //console.log(scroll);
        $page.each(function (page_index) {
            if (scroll >= page_offset[page_index] + base_h && scroll < page_offset[page_index + 1] + base_h) {
                //section 애니매이션 한 번만 실행
                $page.eq(page_index).addClass('on');
            }                                  
        });
        
        // top 버튼
        if(scroll >= 800){
            $top_btn.fadeIn();
        }else{
            $top_btn.fadeOut();
        }
        
    });

    saveOffsetTop();

    function saveOffsetTop() {
        page_offset = []; // 배열 초기화

        $page.each(function () {
            let offset_top = $(this).offset().top;
            page_offset.push(offset_top);
        });

        page_offset[0] = 0;

        let last = $page.last().offset().top + $page.last().height();
        page_offset.push(last);
    }



    //  -------------------- gnb --------------------//

    function gnb_open(this_i){
        if(win_w >=1024 ){
            let $bar = $('.bar');
            let bar_w = $bar.width();
            $bar.css('left', bar_w * this_i + 'px' );
            $(this).addClass('on').siblings().removeClass('on'); 
            
            $gnb_bg.stop().slideDown();
            $submenu.stop().slideDown();
        }else{
            $gnb_li.children('a').off('click focusin');
            $gnb_li.children('a').on('click focusin', function(){
                $submenu.stop().slideUp();
                $(this).next('ul').stop().slideToggle();
                $(this).parents().addClass('on').siblings().removeClass('on');
                
            });
        }
    }
    function gnb_close(){
        if(win_w >=1024 ){
            $gnb_bg.stop().slideUp();
            $submenu.stop().slideUp();
        }else{
            $toggle.trigger('click');
        }
    }

    // gnb_open
    $gnb_li.on('mouseenter focusin', function(){
        let this_i = $(this).index();
        gnb_open(this_i);
    });
    

    // gnb_close
    $nav.on('mouseleave',  gnb_close);
    $gnb_close.on('focusout', gnb_close );

    //  -------------------- toggle --------------------//
    $toggle.on('click focusin   ', function () {

        $nav.toggleClass('on');
        let is_on = $nav.hasClass('on');
                
        if (is_on) {
            $toggle.children('i').removeClass('fa-bars').addClass('fa-times');
        }
        else {
            $toggle.children('i').addClass('fa-bars').removeClass('fa-times');
        }
    });

    //  -------------------- top 버튼 --------------------//
    $top_btn.on('click', function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
    });


    // ---------- Visual - 슬라이드 - 함수 정의 ----------//

    // 0) 슬라이드 실행 ( 아래 1~4 함수 종합 실행 )
    function loop_start() {
        loop_slide = setInterval(function () {

            index_update(); // 1) 인덱스 번호 설정
            slide($slide);  // 2) 현재, 이전 슬라이드 교체
            slide($slide_txt);
            slide($slide_img);
            slide($circle);
            slide($name_txt);
            circle_progress(); // 3) 그래프 그리기
            indigator();    // 4) 인디케이터 설정
            
        }, slide_speed);  // slide_speed : 슬라이드 속도 설정
    }

    // 1) 인덱스번호 설정 + 무한반복 돌리는 loop 공식
    function index_update() {
        prev_i = i;
        i = (i + 1) % len;
    }
    // 2) 현재/이전 인덱스번호 교체
    function slide(item) {
        clearInterval(loop_slide); // 잠깐 무한반복 중지함
        // 인덱스 번호 교체
        if (prev_i != i) {
            item.eq(prev_i).addClass('pos2'); // 이전 슬라이드
            item.eq(i).addClass('pos1'); // 현재 슬라이드
            setTimeout(function () {
                item.eq(i).siblings().removeClass('pos1').removeClass('pos2'); // 이전슬라이드에 설정되어 있던 pos1, pos2 클래스 제거 -> 슬라이드 원위치
            }, 1000);
        }
        loop_start(); // 교체된 인덱스 번호로 다시 실행
    }

    //  3) 원형 그래프 그리기
    function circle_progress() {
        $circle_bg.circleProgress({
            startAngle: 200,
            value: 1,
            lineCap: 'round',
            fill: { color: circle_color[i]  },
            emptyFill: 'rgba(0,0,0,0)',
            reverse: true,
            size: 1200,
            thickness: 500,
            animate: 700
        });

        setTimeout(function () {
            $circle_bg.circleProgress('value', 1);
        }, 2000);
    }

    // 4) 인디케이터 설정
    function indigator() {
        $ind_btn.eq(i).addClass('on').siblings().removeClass('on'); // 인디케이터 설정
    }


    // ---------- indicator 버튼 클릭 ----------//
    $ind_btn.on('click focusin', function () {
        prev_i = i;
        i = $(this).index() / 2;

        $(this).addClass('on').siblings().removeClass('on');
        slide($slide);
        slide($slide_txt);
        slide($slide_img);
        slide($circle);
        slide($name_txt);
        circle_progress();
    });

        loop_start();
        indigator();
        circle_progress();

    
    //---------- b_story - 탭 슬라이드 ----------//

    let slide_cnt = $b_story_slide_li.length;

    $b_story_slide_li.each(function (num) {
        $(this).css('left', (num * 100) + '%');

    });

    function slide_move() {
        $b_story_slide.stop().animate({
            left: (i * -100) + '%'
        }, 1000);
        navi_update();
    }

    function navi_update() {
        $b_story_page_btn.eq(i).addClass('on').siblings().removeClass('on');
    }


    // b_story영역 탭슬라이드 버튼 -------------//
    $b_story_page_btn.on('click focusin', function () {
        i = $(this).index();
        slide_move();
    });
    $b_story_page_btn.first().trigger('click');


    
   
});