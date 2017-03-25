
function cpzx() {
    var oCpNav=document.getElementsByClassName('cpzs_dot')[0];
    var num2=oCpNav.getElementsByTagName('ol').length;

    var oBoxBig=document.getElementById('product');
    var ozanting=document.getElementsByClassName('cpzs_list')[0];
    var aList=oBoxBig.getElementsByTagName('li');
    var oObj=oBoxBig.getElementsByTagName('ul')[0];
    var num=Math.ceil(aList.length/8);
    var oMarkBox=oBoxBig.getElementsByClassName('cpzs_dot')[0];
    var aMark=oBoxBig.getElementsByTagName('ol');

    console.log(oMarkBox);
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
            starMove(oObj,{top:-(thisNum)*624});
        }
    }
    clearInterval(timer);
    timer=setInterval(function () {
        thisNum++;
        if(thisNum>=num){
            thisNum=0;
        }
        starMove(oObj,{top:-(thisNum)*624});
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


//加入收藏
function AddFavorite(sURL, sTitle){
    sURL = encodeURI(sURL);
    try{
        window.external.addFavorite(sURL, sTitle);
    }
    catch(e){
        try{
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch(e){
            alert("加入收藏失败，请使用Ctrl+D进行添加,或手动在浏览器里进行设置.");
        }
    }
}
//设为首页
function SetHome(url){
    if (document.all){
        document.body.style.behavior='url(#default#homepage)';
        document.body.setHomePage(url);
    }
    else{
        alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");
    }
}
/*
 表单验证js代码*/
function sb1(){
    var oSearch = document.getElementById("search");

    if(trim(oSearch.value)==null || trim(oSearch.value)==""){
        alert("请输入查询内容");
        search.focus();
        return false;
    }

    return true;
}
function trim(str){ //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
//表单验证2
function sb2(){
    var phone = document.getElementById("phone");
    var email = document.getElementById("email");
    var mingcheng = document.getElementById("mingcheng");
    var shouji=/^1\d{10}$/;//手机正则
    var youxiang=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;//邮箱正则

    if(shouji.test(phone.value)==false){
        alert("请输入正确的手机号");
        phone.focus();
        return false;
    }
    if(youxiang.test(email.value)==false){
        alert("请输入正确的邮箱");
        email.focus();
        return false;
    }
    if(trim(mingcheng.value)==null || trim(mingcheng.value)==""){
        alert("请输入公司名称，不少于一个字符");
        mingcheng.focus();
        return false;
    }
    return true;
}