/*在这里编写自己需要的JS代码*/
function change(example) {
    var slideAry = example.slides;//->获取当前这个需要滑动的区域下所有的SLIDE(所有的页面)
    var index = example.activeIndex;//->获取当前滑动到的这个页面的索引(获取当前活动块的索引)，索引都是从零开始的,0是第一个页面,1第二个页面...
    /*循环数组中的每一项,拿每一项的索引和我们获取的index比较,如果相同,就给当前的这一项加一个ID,不同的则让ID为空即可*/
    for (var i = 0; i < slideAry.length; i++) {
        var item = slideAry[i];
        if (i == index) {
            item.id = 'page' + (index + 1);
        } else {
            item.id = null;
        }
    }
}
var hbu_swiper = new Swiper('.swiper-container', {
    effect: 'coverflow', /*使用不同的切换效果:slide/cube/coverflow/flip/fade*/
    onTransitionEnd: change/*当切换完成后,判断当前是第几页,然后给这一样增加ID为pageN,增加ID后这个页面里面的元素就可以实现动画效果了==>onTransitionEnd就是切换完成后,我们执行change这个方法,并且给方法传递了一个参数:当前Swiper这个类的一个实例*/
});
//->创建一个变量,用来接收Swiper这个类的实例(以后hbu_swiper代表就是当前滑动处理的这个区域)
//->第一个参数:如果你想让哪个区域实现滑动,那么就把这个区域传递进来,在这里的意思就是把样式类名为swiper-container的区域实现滑动操作
//->第二个参数:配置一些滑动的属性信息,例如：配置滑动的方向，是否循环滑动，滑动切换的动画，切换的时间等信息