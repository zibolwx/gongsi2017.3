$(document).ready(function() {

});


(function($){
    $.fn.extend({
        loopedSlider: function(options) {
            return this.each(function() {

                // set defaults
                var defaults = {
                    container : 'container',
                    slideClass : 'slide',
                    pagination : 'pagination',
                    navButtons : 'nav-buttons',
                    fadeSpeed : 400,
                    slideSpeed : 250,
                    animateSpeed : 200,
                    autoHeight : true,
                    padding : 20,
                    easing : 'easeOutQuad'
                };

                // set variables
                var obj = $(this);
                var o = $.extend(defaults, options);
                var u = false;
                var w = obj.width();
                var h = obj.height();
                var f = $('.'+o.container, obj).find('div:first').attr('id');
                var l = $('.'+o.container, obj).find('div:last').attr('id');

                // funcitons
                function setToActive(c) {
                    var current = $(c).attr('id');
                    $('a[href$="'+current+'"]', obj).addClass('active');
                }

                // applies style to divs
                $('.'+o.container, obj).find('div').css({ 'z-index': 0, opacity: 0 });

                // load first slide
                $('.'+o.container, obj).find('div:eq(0)').animate({ opacity: 1.0 }, o.fadeSpeed, function() {
                    $(this).css({ 'z-index': 100 });
                    $(this).addClass('current');
                    if (o.autoHeight===true) {
                        // gets height of new slide
                        var newHeight = $(this, obj).height() + o.padding;
                        $('.'+o.container, obj).animate({'height': newHeight}, o.animateSpeed, o.easing);
                    }
                    setToActive(this);
                });

                // fade code
                $('.'+o.pagination, obj).find('a').click(function(){
                    if(u===false  && ($(this).hasClass('active')===false)) {
                        u = true;
                        // removes active
                        $('a', obj).removeClass('active');

                        // fades out current slide
                        $('.'+o.container, obj).find('div').animate({ opacity: 0 }, o.fadeSpeed, function() {
                            $(this).removeClass('current');
                            $(this).css({ 'z-index': 0 });
                        });

                        // setsup value for new slide
                        var x = 0;
                        var parentId = $(this).attr('href');
                        var parentSplit = parentId.split('-');
                        x = ((parentSplit[1]*1));

                        if (o.autoHeight===true) {
                            // gets height of new slide
                            var newHeight = $('#'+o.slideClass+'-'+(x), obj).height() + o.padding;
                            $('.'+o.container, obj).animate({'height': newHeight}, o.animateSpeed, o.easing);
                        }

                        // fades in new slide
                        $('#'+o.slideClass+'-'+(x), obj).animate({ opacity: 1.0 }, o.fadeSpeed, function() {
                            $(this).css({ 'z-index': 100 });
                            $(this).addClass('current');
                            u = false;
                            setToActive(this);
                        });
                    }
                    return false;
                });

                // slide code
                $('.'+o.navButtons, obj).find('a').click(function(){
                    if(u===false) {
                        u = true;
                        var loop = false;
                        var fLoop = f;
                        var lLoop = l;

                        // removes active state
                        $('a', obj).removeClass('active');

                        // flips directions
                        if ($(this).hasClass('next')) {
                            var nextD = -w;
                            var previousD = w;
                            var direction = +1;
                        }
                        if ($(this).hasClass('previous')) {
                            nextD = w;
                            previousD = -w;
                            direction = -1;
                        }

                        // setup the loop
                        if ($('#'+fLoop, obj).hasClass('current')) {
                            loop = 'first';
                        }
                        if (($('#'+lLoop, obj).hasClass('current'))) {
                            loop = 'last';
                        }

                        // get the name of the new slide
                        if ((loop==='first') && ($(this).hasClass('previous'))) {
                            lLoop = lLoop.split('-');
                            x = ((lLoop[1]*1));
                        } else if ((loop==='last') && ($(this).hasClass('next'))) {
                            fLoop = fLoop.split('-');
                            x = ((fLoop[1]*1));
                        } else {
                            // setsup value for new slide
                            var getCurrent = $('.'+o.container, obj).find('.current').attr('id');
                            getCurrent = getCurrent.split('-');
                            x = ((getCurrent[1]*1+direction));
                        }

                        // gets height of new slide
                        if (o.autoHeight===true) {
                            var newHeight = $('#'+o.slideClass+'-'+(x), obj).height() + o.padding;
                            $('.'+o.container, obj).animate({'height': newHeight}, o.animateSpeed, o.easing);
                        }

                        // sets next slide to slide in position
                        $('#'+o.slideClass+'-'+(x), obj).css({ opacity: 1, left: previousD, 'z-index': 100 });

                        // slides in new slide
                        $('#'+o.slideClass+'-'+(x), obj).animate({ left: 0 }, o.slideSpeed, o.easing, function() {
                            $(this).addClass('current');
                            $(this).css({ opacity: 1 });
                            u = false;
                            // Sets active state for pagination a
                            setToActive(this);
                        });

                        // slides out current slide
                        $('.'+o.container, obj).find('.current').animate({ 'left': nextD }, o.slideSpeed, o.easing, function() {
                            $(this).removeClass('current');
                            $(this).css({ opacity: 0, left: 0, 'z-index': 0 });
                        });

                    }
                    return false;
                });
            });
        }
    });
})(jQuery);


//滚动
(function($){

    $.fn.kxbdMarquee = function(options){
        var opts = $.extend({},$.fn.kxbdMarquee.defaults, options);

        return this.each(function(){
            var $marquee = $(this);//滚动元素容器
            var _scrollObj = $marquee.get(0);//滚动元素容器DOM
            var scrollW = $marquee.width();//滚动元素容器的宽度
            var scrollH = $marquee.height();//滚动元素容器的高度
            var $element = $marquee.children(); //滚动元素
            var $kids = $element.children();//滚动子元素
            var scrollSize=0;//滚动元素尺寸
            var _type = (opts.direction == 'left' || opts.direction == 'right') ? 1:0;//滚动类型，1左右，0上下

            //防止滚动子元素比滚动元素宽而取不到实际滚动子元素宽度
            $element.css(_type?'width':'height',10000);
            //获取滚动元素的尺寸
            if (opts.isEqual) {
                scrollSize = $kids[_type?'outerWidth':'outerHeight']() * $kids.length;
            }else{
                $kids.each(function(){
                    scrollSize += $(this)[_type?'outerWidth':'outerHeight']();
                });
            }
            //滚动元素总尺寸小于容器尺寸，不滚动
            if (scrollSize<(_type?scrollW:scrollH)) return;
            //克隆滚动子元素将其插入到滚动元素后，并设定滚动元素宽度
            $element.append($kids.clone()).css(_type?'width':'height',scrollSize*2);

            var numMoved = 0;
            function scrollFunc(){
                var _dir = (opts.direction == 'left' || opts.direction == 'right') ? 'scrollLeft':'scrollTop';
                if (opts.loop > 0) {
                    numMoved+=opts.scrollAmount;
                    if(numMoved>scrollSize*opts.loop){
                        _scrollObj[_dir] = 0;
                        return clearInterval(moveId);
                    }
                }
                if(opts.direction == 'left' || opts.direction == 'up'){
                    var newPos = _scrollObj[_dir] + opts.scrollAmount;
                    if(newPos>=scrollSize){
                        newPos -= scrollSize;
                    }
                    _scrollObj[_dir] = newPos;
                }else{
                    var newPos = _scrollObj[_dir] - opts.scrollAmount;
                    if(newPos<=0){
                        newPos += scrollSize;
                    }
                    _scrollObj[_dir] = newPos;
                }
            };
            //滚动开始
            clearInterval(moveId);
            var moveId = setInterval(scrollFunc, opts.scrollDelay);
            //鼠标划过停止滚动
            $marquee.hover(
                function(){
                    clearInterval(moveId);
                },
                function(){
                    clearInterval(moveId);
                    moveId = setInterval(scrollFunc, opts.scrollDelay);
                }
            );

            //控制加速运动
            if(opts.controlBtn){
                $.each(opts.controlBtn, function(i,val){
                    $(val).bind(opts.eventA,function(){
                        opts.direction = i;
                        opts.oldAmount = opts.scrollAmount;
                        opts.scrollAmount = opts.newAmount;
                    }).bind(opts.eventB,function(){
                        opts.scrollAmount = opts.oldAmount;
                    });
                });
            }
        });
    };
    $.fn.kxbdMarquee.defaults = {
        isEqual:true,//所有滚动的元素长宽是否相等,true,false
        loop: 0,//循环滚动次数，0时无限
        direction: 'left',//滚动方向，'left','right','up','down'
        scrollAmount:1,//步长
        scrollDelay:30,//时长
        newAmount:3,//加速滚动的步长
        eventA:'mousedown',//鼠标事件，加速
        eventB:'mouseup'//鼠标事件，原速
    };

    $.fn.kxbdMarquee.setDefaults = function(settings) {
        $.extend( $.fn.kxbdMarquee.defaults, settings );
    };

})(jQuery);