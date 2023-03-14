$(function(){

    var navi_txt = '';
    var pos = [];
    var base_h = -300;
    var win_w = $(window).width();
    var i = 0;
    var len = $('.frame>li').length;
    var timer;
    
/*-------------------------------------------------------------------*/
   //visual 첫화면 실행시 글씨 on
    $('.visual').addClass('on');
    
    //navi 첫화면 선택되어있게
    $('.navi').children('a').first().trigger('click');

/*-------------------------------------------------------------------*/
//슬라이드 셋팅
     
    // 초기셋팅
   $('.frame>li').each(function(num){
       $(this).css('left', num * 100 + '%');
    });
    
    //함수정의
    function move_slide(){
        $('.frame').stop().animate({'left': i * -100 + '%' }, 1000); 
        $('.slide_index').text(i+1);
    }
    function start(){        
            timer = setInterval(function(){
            i = (i+1) % len;
            move_slide();
        }, 4000);
    }
     function stop(){
        clearInterval(timer);
    }
    function prev(e){
        e.preventDefault();
        if(i == 0){i = len;}    
        i--;
        move_slide();
    }
    function next(e){
        e.preventDefault();
        i++;
        if(i == len){ i = 0; } 
        move_slide();  
    }
    
    // 이벤트 연결
    $('.btn_prev').on('click', prev);
    $('.btn_next').on('click', next);

    $('.visual').on({
        mouseenter: stop,
        mouseleave: start
    });
    
     // 실행 시작
    start();
    
/*-------------------------------------------------------------------*/
    //스크롤_초기 셋팅
    saveOffsetTop();
    
    $('section').each(function () {
        navi_txt += '<a href="."></a>'
    });
    
    //navi 갯수
    $('.navi').html(navi_txt);

    // 스크롤_화면 이동 버튼
     $('.navi').on('click', 'a', function () {
         var i = $(this).index();
         $('html, body').stop().animate({ scrollTop : pos[i] }, 1000);
         
    //형제들만 on
         $(this).addClass('on').siblings().removeClass('on');
     });
    

    
    // 위치 저장 함수
    function saveOffsetTop() {
        pos = []; // 배열 초기화
        
        $('section').each(function () {
            var offset_top = $(this).offset().top;
            pos.push(offset_top);
        });
        
        pos[0] = 0;

        var last = $('section').last().offset().top + $('section').last().height();
        pos.push(last);
    }
    
/*-------------------------------------------------------------------*/
// 윈도우 - 리사이즈 이벤트
    $(window).on('resize', function () {
        win_w = $(window).width();
        saveOffsetTop();
    });

// 윈도우 - 스크롤 이벤트
    $(window).on('scroll', function () {
        var scroll = $(this).scrollTop();
        $('.story'). fadeIn();
        $('section').each(function (i) {
            if (scroll >= pos[i] + base_h && scroll < pos[i + 1] + base_h) {
                
                //section마다 navi 선택
                $('section').removeClass('on').eq(i).addClass('on');
                $('.navi').children('a').removeClass('on').eq(i).addClass('on');
                
                if(i==1 || i==4){
                    $('.navi').children('a').addClass('change');
                }else{
                    $('.navi').children('a').removeClass('change');
                }
                
                if(i==1 || i==4){
                    $('.gnb>li').children('a').addClass('mhange');
                }else{
                    $('.gnb>li').children('a').removeClass('mhange');
                }
            }             
        });
    });
/*-------------------------------------------------------------------*/ 
    // gnb 이벤트
    $('.gnb>li').on('mouseenter', function(){
        if(win_w >=1024){
           $(this).children('ul').stop().fadeIn();
        }else{
            $('.gnb>li>a').off('click');
            $('.gnb>li>a').on('click', function(){
                $('.gnb>li>a').next('ul').stop().slideUp();
                $(this).next('ul').stop().slideToggle();
            });
        }
    });
    
    $('.gnb>li').on('mouseleave', function(){   
        if(win_w >=1024){
            $(this).children('ul').stop().fadeOut();
            }
        });
/*-------------------------------------------------------------------*/
    // 메뉴 토글
    
        $('.header>.btn_toggle').on('click', function () {
        $('.header>.btn_toggle').toggleClass('on');
        
        $('.header nav').toggleClass('on');
    });
   
});