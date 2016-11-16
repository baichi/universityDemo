/*SWIPER*/
function change(example) {
    var slideAry = example.slides,
        index = example.activeIndex;
    [].forEach.call(slideAry, function (item, i) {
        item.id = i == index ? 'page' + (index + 1) : null;
    });
}
var hbu_swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    onTransitionEnd: change,
    onInit: change/*刚开始初始话成功的时候我们就执行一遍*/
});

/*MAKISU实现3D折叠:使用makisu需要引入jQuery/Zepto(PC端使用JQ,移动端使用Zepto)*/
var makisuBox = document.getElementById('makisuBox');//->在JS中通过元素的ID获取到这个元素
var $makisuBox = $(makisuBox);//->光获取还不行,还需要把获取的元素转换为JQ对象
$makisuBox.makisu({
    selector: 'dd', /*控制列表中需要实现3D折叠的元素*/
    overlap: 0.6,
    speed: 0.8/*控制折叠的角度和速度*/
});
$makisuBox.makisu('open');
/*
 * 样式中的调整:
 * ->背景不是给DL的,而是分别设定给DT/DD
 * ->调节每一个DD中EM/A所在的层级位置
 */