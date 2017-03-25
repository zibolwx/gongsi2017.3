$(document).ready(function() {

});
function sb2(){
    var phone = document.getElementById("phone");
    var email = document.getElementById("email");
    var mingcheng = document.getElementById("mingcheng");
    var shouji=/^1\d{10}$/;//手机正则
    var youxiang=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;//邮箱正则

    if(trim(mingcheng.value)==null || trim(mingcheng.value)==""){
        alert("请输入单位名称，不少于一个字符");
        mingcheng.focus();
        return false;
    }
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

    return true;
}
function trim(str){ //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}