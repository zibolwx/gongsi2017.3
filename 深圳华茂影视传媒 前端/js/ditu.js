// 百度地图API功能
var map = new BMap.Map('allmap');
var poi = new BMap.Point(114.106422,22.569987);
map.centerAndZoom(poi, 16);
map.enableScrollWheelZoom();

var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
    '电话：15889776489 <br/>Ｅ-mail：huamao@huamao.com<br/> 联系人：甘先生<br/>地址：深圳市福田区园岭街道八卦四路新阳大厦一段153-1号' +
    '</div>';

//创建检索信息窗口对象
var searchInfoWindow = null;
searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
    title  : "华贸影视传媒",      //标题
    width  : 290,             //宽度
    height : 105,              //高度
    panel  : "panel",         //检索结果面板
    enableAutoPan : true,     //自动平移
    searchTypes   :[
        BMAPLIB_TAB_SEARCH,   //周边检索
        BMAPLIB_TAB_TO_HERE,  //到这里去
        BMAPLIB_TAB_FROM_HERE //从这里出发
    ]
});
var marker = new BMap.Marker(poi); //创建marker对象
marker.enableDragging(); //marker可拖拽
marker.addEventListener("click", function(e){
    searchInfoWindow.open(marker);
})
map.addOverlay(marker); //在地图中添加marker
//样式1
var searchInfoWindow1 = new BMapLib.SearchInfoWindow(map, "信息框1内容", {
    title: "信息框1", //标题
    panel : "panel", //检索结果面板
    enableAutoPan : true, //自动平移
    searchTypes :[
        BMAPLIB_TAB_FROM_HERE, //从这里出发
        BMAPLIB_TAB_SEARCH   //周边检索
    ]
});
function openInfoWindow1() {
    searchInfoWindow1.open(new BMap.Point(116.319852,40.057031));
}
//样式2
var searchInfoWindow2 = new BMapLib.SearchInfoWindow(map, "信息框2内容", {
    title: "信息框2", //标题
    panel : "panel", //检索结果面板
    enableAutoPan : true, //自动平移
    searchTypes :[
        BMAPLIB_TAB_SEARCH   //周边检索
    ]
});
function openInfoWindow2() {
    searchInfoWindow2.open(new BMap.Point(116.324852,40.057031));
}
//样式3
var searchInfoWindow3 = new BMapLib.SearchInfoWindow(map, "信息框3内容", {
    title: "信息框3", //标题
    width: 290, //宽度
    height: 40, //高度
    panel : "panel", //检索结果面板
    enableAutoPan : true, //自动平移
    searchTypes :[
    ]
});
function openInfoWindow3() {
    searchInfoWindow3.open(new BMap.Point(116.328852,40.057031));
}/**
 * Created by Administrator on 2017/3/4.
 */
