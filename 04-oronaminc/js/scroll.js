$(function () {
    
    var win_w = $(window).width();
    var elm = "section";
    
    $(window).on('resize', function(){
        win_w = $(this).width();
        if(win_w >=1024)    {
            mouse_wheel_scroll();        
        } else{
            $(elm).off('mousewheel DOMMouseScroll');
        }
    });
    
    $(window).trigger('resize');
    
    function mouse_wheel_scroll() {
        $(elm).each(function (index) {
            // 개별적으로 Wheel 이벤트 적용
            $(this).on('mousewheel DOMMouseScroll', function (event) {
                e.preventDefault();
                var delta = 0;
                if (!event) event = window.event;
                if (event.wheelDelta) {
                    delta = event.wheelDelta / 120;
                    if (window.opera) delta = -delta;
                } else if (event.detail)
                    delta = -event.detail / 3;
                var moveTop = $(window).scrollTop();
                var elmSelecter = $(elm).eq(index);

                // 마우스휠을 위에서 아래로
                if (delta < 0) {
                    if ($(elmSelecter).next() != undefined) {
                        try {
                            moveTop = $(elmSelecter).next().offset().top;
                            $(elmSelecter).next().addClass('move'); //  휠 내렸을시 애니메이션 이벤트
                        } catch (e) {}
                    }
                } else {
                    if ($(elmSelecter).prev() != undefined) {
                        try {
                            moveTop = $(elmSelecter).prev().offset().top;

                        } catch (e) {}
                    }
                }

                // 화면 이동 0.8초(800)
                $("html,body").stop().animate({
                    scrollTop: moveTop + '%'
                }, {
                    duration: 800,
                    complete: function () {}
                });
            });
        });
    }
});