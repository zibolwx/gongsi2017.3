$(document).ready(function() {

});
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

