/*表单验证代码*/
function trim(str){ //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function sb1(){
    var amima = document.getElementById("mima");
    var aphone = document.getElementById("phone");

    var mima_ts=document.getElementById('mima_ts');
    var aphone_ts=document.getElementById('phone_ts');

    var patrn=/^(\w){6,20}$/; //密码正则
    var shouji=/^1\d{10}$/;//手机正则
    var youxiang=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;//邮箱正则



    if(shouji.test(aphone.value)==false){
        aphone_ts.style.display='block';
        aphone.focus();
        return false;
    }else {
        aphone_ts.style.display='none';
    }
    if(patrn.test(amima.value)==false){
        mima_ts.style.display='block';
        amima.focus();
        return false;
    }else {
        mima_ts.style.display='none';
    }
    return true;
}

function sb2(){
    var amima = document.getElementById("mima2");
    var aphone = document.getElementById("phone2");
    var amima2 = document.getElementById("mima3");

    var mima_ts=document.getElementById('mima_ts2');
    var mima_ts2=document.getElementById('mima_ts3');
    var aphone_ts=document.getElementById('phone_ts2');

    var patrn=/^(\w){6,20}$/; //密码正则
    var shouji=/^1\d{10}$/;//手机正则

    if(shouji.test(aphone.value)==false){
        aphone_ts.style.display='block';
        aphone.focus();
        return false;
    }else {
        aphone_ts.style.display='none';
    }
    if(patrn.test(amima.value)==false){
        mima_ts.style.display='block';
        amima.focus();
        return false;
    }else {
        mima_ts.style.display='none';
    }
    if(amima2.value!=amima.value){
        mima_ts2.style.display='block';
        amima2.focus();
        return false;
    }else {
        mima_ts2.style.display='none';
    }

    return true;
}

function sb3() {
    var oName=document.getElementById('name');
    var oLxfs=document.getElementById('lxfs');
    var ofkts=document.getElementById('fk_ts');

    if(trim(oName.value)==null || trim(oName.value)==""){
        oName.focus();
        ofkts.innerHTML='账号不能为空';
        ofkts.style.display='block';
        return false;
    }
    if(trim(oLxfs.value)==null || trim(oLxfs.value)==""){
        oLxfs.focus();
        ofkts.innerHTML='请输入联系方式';
        ofkts.style.display='block';
        return false;
    }

}