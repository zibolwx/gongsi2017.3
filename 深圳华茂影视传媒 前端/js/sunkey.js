
function gslc() {
    var oBox=document.getElementsByClassName('gslc_list')[0];
    var aLl=oBox.getElementsByTagName('li');
    var aTime=document.getElementsByClassName('gslc_time');
    var aImg=document.getElementsByClassName('gslc_img');
    var aMs=document.getElementsByClassName('gslc_wzjs');

    for(var i=0;i<aLl.length;i++){
        aTime[i].index=i;
        aTime[i].onclick=function () {
            for(var i=0;i<aLl.length;i++){
                aLl[i].className='';
                aImg[i].style.display='none';
                aMs[i].style.display='none';
            }
            aLl[this.index].className='on';
            aImg[this.index].style.display='block';
            aMs[this.index].style.display='block';
        };
    }
}