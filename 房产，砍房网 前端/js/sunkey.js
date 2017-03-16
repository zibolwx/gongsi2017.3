
function cpzx() {
    var oCpNav=document.getElementsByClassName('cpzx_nav')[0];
    var num2=oCpNav.getElementsByTagName('a').length;

    var oBoxBig=document.getElementById('product');
    var ozanting=document.getElementsByClassName('cp_list')[0];
    var aList=oBoxBig.getElementsByTagName('li');
    var oObj=oBoxBig.getElementsByTagName('ul')[0];
    var num=Math.ceil(aList.length/8);
    var oMarkBox=oBoxBig.getElementsByClassName('cp_mark')[0];
    var aMark=oBoxBig.getElementsByTagName('ol');

    var thisNum=0;
    var timer=null;

    /*设置产品导航居中*/
    oCpNav.style.width=num2*113+'px';

    //动态创建ol
    for(var i=0;i<num;i++){
        var nOl=document.createElement('ol');

        oMarkBox.appendChild(nOl);//插入到div内
    }
    aMark[0].className='on';

    //设置小圆圈居中
    oMarkBox.style.width=(18*aMark.length+7)+'px';

    //开始运动并设置on
    for(var j=0;j<aMark.length;j++){
        aMark[j].index=j;
        aMark[j].onclick=function () {
            for(var n=0;n<aMark.length;n++){
                aMark[n].className='';
            }
            this.className='on';
            thisNum=this.index;
            starMove(oObj,{top:-(thisNum)*700});
        }
    }
    clearInterval(timer);
    timer=setInterval(function () {
        thisNum++;
        if(thisNum>=num){
            thisNum=0;
        }
        starMove(oObj,{top:-(thisNum)*700});
        for(var n=0;n<aMark.length;n++){
            aMark[n].className='';
        }
        aMark[thisNum].className='on';
    },7000);
    /*鼠标移动上去暂停*/
    ozanting.onmouseover=function () {
        clearInterval(timer);
    };
    ozanting.onmouseout=function () {
        timer=setInterval(function () {
            thisNum++;
            if(thisNum>=num){
                thisNum=0;
            }
            starMove(oObj,{top:-(thisNum)*700});

            for(var n=0;n<aMark.length;n++){
                aMark[n].className='';
            }
            aMark[thisNum].className='on';
        },7000);
    };
}


//运动函数
function starMove(obj,json,fuEnd) {
    clearInterval(obj.timer);
    obj.timer=setInterval(function () {
        //
        var bStop=true;//判断是否全部到达设置变量

        for(var attr in json){
            var cur=0;

            if (attr=='opacity'){
                cur=Math.round(parseFloat(getStyle(obj,attr))*100);
            }else {
                cur=parseInt(getStyle(obj,attr));
            }

            var speed=(json[attr]-cur)/6;

            speed=speed>0?Math.ceil(speed):Math.floor(speed);

            if(cur!=json[attr]){
                bStop=false;
            }
            if (attr=='opacity'){
                obj.style.filter='alpha(opacity:'+(cur+speed)+')';
                obj.style[attr]=(cur+speed)/100;

                //      document.getElementById('txt1').value=obj.style[attr];
            }else {
                obj.style[attr]=cur+speed+'px';
            }
        }
        if(bStop){
            clearInterval(obj.timer);
            if (fuEnd) fuEnd();
        }

    },30);
}
//解决offsetBUG问题
function getStyle(obj,name) {
    if(obj.currentStyle){
        return obj.currentStyle[name];
    }else{
        return getComputedStyle(obj,false)[name];
    }
}



//弹出层
function openDialog(id,className)
{
    var mask = $('#mask');
    var login = $('#'+id);
    var sWidth = $(document.body).outerWidth(true);   //获取窗口文档body的总宽度，包括border和padding
    var sHeight = $(document.body).outerHeight(true);   //获取窗口文档body的总高度，包括border和padding
    var cHeight = $(window).height();                 //获取浏览器窗口的可视区高度
    var lWidth = login.width();                     //登录框的宽度
    var lHeight = login.height();                  //登录框的高度
    var left = (sWidth - lWidth) / 2;              //计算登录框的left值：等于总宽度减去登录框宽度再除以2
    var top = (cHeight - lHeight) / 2;             //计算登录框的top值：等于可视区高度减去登录框高度再除以2
    mask.css({
        'display': 'block',
        'width': sWidth + 'px',
        'height': sHeight + 'px'
    });
    login.css({
        'display': 'block',
        'top': top + 'px',
        'left': left + 'px'
    }).addClass('animated zoomInDown');          //添加动画类

    $('.' + className).click(function () {
        close();
    });
    mask.click(function () {
        close();
    });

    //隐藏遮罩层和登录框
    function close() {
        mask.css('display', 'none');
        login.css('display', 'none');
    }
    return false;
}


/*更改密码tab效果*/
function gaimi() {
    var boxGm=document.getElementsByClassName('gm_bt')[0];
    var gmList=boxGm.getElementsByTagName('a');
    var boxLi=document.getElementsByClassName('gm_bd')[0];
    var bdList=boxLi.getElementsByTagName('li');

    for(i=0;i<gmList.length;i++){
        gmList[i].index=i;
        gmList[i].onclick=function () {
            for(i=0;i<gmList.length;i++){
                gmList[i].className='';
                bdList[i].style.display='none';
            }
            this.className='on';
            bdList[this.index].style.display='block';
        };
    }
}


/*无缝滚动部分代码*/
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
