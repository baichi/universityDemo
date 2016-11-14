/*SWIPER*/
var swiperRender = (function () {
    var $makisuBox = $('#makisuBox');

    function change(example) {
        var slideAry = example.slides,
            index = example.activeIndex;

        //->MAKISU
        if (index == 0) {
            $makisuBox.makisu({
                selector: 'dd',
                overlap: 0.6,
                speed: 0.8
            });
            $makisuBox.makisu('open');
        } else {
            $makisuBox.makisu({
                selector: 'dd',
                overlap: 0,
                speed: 0
            });
            $makisuBox.makisu('close');
        }

        //->SET ID
        [].forEach.call(slideAry, function (item, i) {
            item.id = i == index ? 'page' + (index + 1) : null;
        });
    }

    return {
        init: function (active) {
            var hbu_swiper = new Swiper('.swiper-container', {
                effect: 'coverflow',
                onTransitionEnd: change,
                onInit: change
            });
            hbu_swiper.slideTo(active, 0);//->开始初始化swiper区域的时候,运动索引为active对应的那一页的位置
        }
    }
})();


/*CUBE*/
/*1、在JS中想要操作谁就先获取谁*/
var $cube = $('.hbu_cube'),//->获取魔方区域
    $cubeBox = $cube.children('.cube_box'),//->获取魔方这个盒子
    $imgList = $cubeBox.children('img');//->获取魔方盒子中的六面
var $swiper = $('.hbu_swiper'),//->获取swiper区域
    $return = $swiper.children('.hbu_return');//->获取返回按钮

/*2、控制魔方区域和swiper区域的显示隐藏*/
/*移动端的点击事件如果使用CLICK的话会有300MS的延迟,因为在第一次点击完成后，浏览器会等300MS，看看是否还有第二次点击，如果有，属于双击，这样就不是CLICK了，如果没有才是CLICK*/
/*移动端都是使用手指操作的，所以移动端的事件有如下几种：
 * [单手指事件]
 * touchstart、touchmove、touchend
 *
 * [多手指事件]
 * gesturestart、gesturechange、gestureend
 *
 * Zepto.js类库中给我们提供了专门的方法用来操作移动端的事件:tap、singleTap、doubleTap、longTap、swipe、swipeLeft、swipeRight、swipeUp、swipeDown...
 */
//->点击魔方的每一个页面
$imgList.tap(function () {
    $cube.css('display', 'none');
    $swiper.css('display', 'block');
    //->控制swiper区域默认展示当前选中的这一页,传递0显示第一页,传递1显示第二页... =>把当前点击的这个IMG在魔方区域中的索引作为要展示swiper区域页面的索引传递进去即可
    var curIndex = $(this).index();//->this就是当前点击的IMG,index方法获取的就是它的索引
    swiperRender.init(curIndex);
});
$return.tap(function () {
    $cube.css('display', 'block');
    $swiper.css('display', 'none');
});


















