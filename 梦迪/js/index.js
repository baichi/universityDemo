/**
 * Created by wangmengdi on 2016/11/15.
 */
var oCon=document.getElementsByClassName("container");
var oLis=oCon.getElementsByTagName("li");
var oDivs=oCon.getElementsByTagName("div");
console.log("ok");
function conChange(nIndex){
    for(var i=0;i<oLis.length;i++){
        oLis[i].className="";
        oDivs[i].className="";
    }
    oLis[nIndex].className="select";
    oDivs[nIndex].className="select";
}
for(var i=0;i<oLis.length;i++){
    oLis[i].meng=i;
    oLis[i].onmousemove=function(){
        conChange(this.meng);
        console.log("ok");
    }
}
