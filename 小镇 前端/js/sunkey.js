
/*二维码部分代码*/
function ewm(obj1,obj2) {
    obj1.onmouseover=function () {
        obj2.style.display='block';
    };
    obj1.onmouseout=function () {
        obj2.style.display='none';
    };
}
/*选项卡部分js代码*/
function indexTab() {
    var atabBt=document.getElementsByClassName('active-title');
    var atab_List=document.getElementsByClassName('xxyl_nr');
    for(var i=0;i<atabBt.length;i++){
        atabBt[i].index=i;
        atabBt[i].onclick=function () {
            for(var i=0;i<atabBt.length;i++){
                atabBt[i].className='active-title';
                atab_List[i].style.display='none';
            }
            this.className='active-title active_title_one';
            atab_List[this.index].style.display='block';
        };
    }
}

/*banner数字跳动部分代码*/

function numJmp() {
    var bumBox=document.getElementsByClassName('center-word')[0];
    var Num=bumBox.getElementsByTagName('span')[0];
    var setNmu=793;
    var timer=null;

    clearInterval(timer);
    timer=setInterval(function () {
        setNmu+=13;
        Num.innerHTML=setNmu;
        if(setNmu>=1774){
            clearInterval(timer);
        }
    },30);
}
/*事件绑定兼容性处理*/
function myAddEvent(obj,ev,fn) {
    if (obj.attachEvent){
        obj.attachEvent('on'+ev,fn);
    }else {
        addEventListener(ev,fn,false);
    }
}
/*悬浮部分js代码*/
/*获取滚动距离*/
function getScrollTop() {
    var scrollPos;
    if (window.pageYOffset) {
        scrollPos = window.pageYOffset; }
    else if (document.compatMode && document.compatMode != 'BackCompat')
    { scrollPos = document.documentElement.scrollTop; }
    else if (document.body) { scrollPos = document.body.scrollTop; }
    return scrollPos;
}

function xuanfu() {
    var axfBox=document.getElementsByClassName('xf_box');
    var axfAim=document.getElementsByClassName('xf_phone_wz');
    var olxfs=document.getElementsByClassName('xf_phone')[0];
    var olxfsAim=olxfs.getElementsByTagName('img')[0];
    for(var i=0;i<axfBox.length;i++){
        axfBox[i].index=i;
        axfBox[i].onmouseover=function () {
            axfAim[this.index].style.display='block';
        };
        axfBox[i].onmouseout=function () {
            axfAim[this.index].style.display='none';
        };
    }

    olxfs.onmouseover=function () {
        olxfsAim.style.width='248px';
        olxfsAim.style.height='183px';
        axfAim[0].style.display='block';
    };
    olxfs.onmouseout=function () {
        olxfsAim.style.width='0';
        olxfsAim.style.height='100%';
        axfAim[0].style.display='none';
    };
    axfBox[2].onclick=function () {
        var num=getScrollTop();
        var timer=null;
        
        clearInterval(timer);
        timer=setInterval(function () {
            num-=20;
            if(num>0){
                window.scrollTo(0,num);
            }else {
                clearInterval(timer);
                window.scrollTo(0,0);
            }
        },5);
    };
    document.getElementsByTagName("body")[0].onscroll=function gundong2(){
        var juli=getScrollTop();
       if(juli>=600){
           axfBox[2].style.display='block';
       }else {
           axfBox[2].style.display='none';
       }

    }
}


/*投资页面展开部分代码*/
function zhankai() {
    var oAim=document.getElementsByClassName('inv_filet')[0];
    var oBtn=document.getElementById('btn_sq');

    oBtn.onclick=function () {
        if(oAim.className=='inv_filet more_filet_status'){
            oAim.className='inv_filet';
            oBtn.innerHTML='收起<i class="icon iconfont icon-dingbu">';
        }else {
            oAim.className='inv_filet more_filet_status';
            oBtn.innerHTML='展开<i class="icon iconfont icon-dingbu">';
        }
    }
}


/*投资页面选项卡部分开始*/
function tzTab(obj1,obj2,mark) {
    for(var i=0;i<obj1.length;i++){
        obj1[i].index=i;
        obj1[i].onclick=function () {
            for(var i=0;i<obj1.length;i++){
                obj1[i].className="";
                obj2[i].style.display="none";
            }
            this.className=mark;
            obj2[this.index].style.display="block";
        }
    }
}

/*运动框架引入*/
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


/*小镇招商详情页面渐隐选项卡开始*/
function tabZS(obj1,obj2,mark) {
    for(var i=0;i<obj1.length;i++){
        obj1[i].index=i;
        /*初始化*/
        obj1[i].onclick=function () {
            for(var i=0;i<obj1.length;i++){
                obj1[i].className="";
                obj2[i].style.display='none';
                /*obj2[i].style.filter='alpha(opacity:0)';
                obj2[i].style.opacity='0';*/
                starMove(obj2[i],{opacity:0});
            }
            this.className=mark;
            obj2[this.index].style.display='block';
            starMove(obj2[this.index],{opacity:100});
        }
    }
}

/*小镇建设详情页部分切换代码*/
function jeTab() {
    var jsBTbox=document.getElementsByClassName('jianshe_list')[0];
    var aBTlist=jsBTbox.getElementsByTagName('div');
    var ajsAim=document.getElementsByClassName('nav_mark')[0];
    var top=20;
    var aLeft=document.getElementsByClassName('container_left')[0];
    var axfBox=document.getElementsByClassName('xf_box');
    var container_right_list=document.getElementsByClassName('container_right_list');

    for(var i=0;i<aBTlist.length;i++){
        aBTlist[i].index=i;
        aBTlist[i].onclick=function () {
            for(var i=0;i<aBTlist.length;i++){
                container_right_list[i].style.display='none';
                starMove(container_right_list[i],{opacity:0});
            }
            top=20+this.index*48;
            starMove(ajsAim,{top:top});

            container_right_list[this.index].style.display='block';
            starMove(container_right_list[this.index],{opacity:100});
        }
    }
    /*给dm添加事件绑定*/
    aLeft.className='container_left fl';
    window.onscroll = function gundong1(e){
        var e =e || window.event;
        var juli=getScrollTop();
        var topJuli=getScrollTop();
        if(juli>=600){
            axfBox[2].style.display='block';
        }else {
            axfBox[2].style.display='none';
        }
        if(topJuli>=72){
            aLeft.className='container_left fl leftfix';
        }else{
            aLeft.className='container_left fl';
        }
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



/*注册表单部分表单选项*/
function aZhuceJs() {
    var ajuse=document.getElementsByClassName('my-identify')[0];
    var ajuseP=ajuse.getElementsByTagName('p');
    var ajuseImg1=ajuse.getElementsByClassName('identify-img1');
    var ajuseImg2=ajuse.getElementsByClassName('identify-img2');

    for(var i=0;i<ajuseP.length;i++){
        ajuseP[i].index=i;
        ajuseP[i].onclick=function () {
            for(var i=0;i<ajuseP.length;i++){
                ajuseP[i].className='';
                ajuseImg1[i].style.display='block';
                ajuseImg2[i].style.display='none';
            }
            this.className='identify-active';
            ajuseImg1[this.index].style.display='none';
            ajuseImg2[this.index].style.display='block';
        }
    }
}

