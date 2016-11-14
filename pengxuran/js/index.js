document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);

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
            hbu_swiper.slideTo(active, 0);
        }
    }
})();


/*CUBE*/
var $cube = $('.hbu_cube'),
    $cubeBox = $cube.children('.cube_box'),
    $imgList = $cubeBox.children('img');
var $swiper = $('.hbu_swiper'),
    $return = $swiper.children('.hbu_return');

/*2、控制魔方区域和swiper区域的显示隐藏*/
//->点击魔方的每一个页面
$imgList.tap(function () {
    $cube.css('display', 'none');
    $swiper.css('display', 'block');
    var curIndex = $(this).index();
    swiperRender.init(curIndex);
});
$return.tap(function () {
    $cube.css('display', 'block');
    $swiper.css('display', 'none');
});

/*3、控制魔方旋转*/
$cubeBox.attr({
    rotateX: 45,
    rotateY: 30
});
$cubeBox.on('touchstart', function (ev) {
    //->ev:事件对象,这里存储了手指的相关信息
    var point = ev.touches[0];//->获取第一根手指操作的相关信息
    $cubeBox.attr({
        strX: point.pageX,//->手指按下那一个点的的X轴坐标,我们把信息存储到当前魔方这个盒子身上了(存储到自定义属性上了)
        strY: point.pageY,
        changeX: 0,//->后期用来存储我们手指偏移的X/Y轴距离
        changeY: 0
    });
});

$cubeBox.on('touchmove', function (ev) {
    var point = ev.touches[0];
    var changeX = point.pageX - $cubeBox.attr('strX');
    var changeY = point.pageY - $cubeBox.attr('strY');
    $cubeBox.attr({
        changeX: changeX,
        changeY: changeY
    });
});

$cubeBox.on('touchend', function (ev) {
    var changeX = parseFloat($cubeBox.attr('changeX')),
        changeY = parseFloat($cubeBox.attr('changeY'));
    //->为了防止手指的误操作,我们在真实项目中一般都是滑动距离超过10px/30px才会认为是滑动
    if (Math.abs(changeX) < 10 && Math.abs(changeY) < 10) {
        //->不属于滑动,我们不做任何的处理,加了return，下面的代码将不再执行
        return;
    }

    //->我们的changeX左右滑其实控制的是魔方rotateY(沿着Y轴旋转的值);我们的changeY其实控制的是魔方rotateX(沿着X轴旋转的值)；并且每一次的旋转都是在原来基础之上旋转的；
    var rotateX = parseFloat($cubeBox.attr('rotateX')),
        rotateY = parseFloat($cubeBox.attr('rotateY'));
    rotateY = rotateY + changeX / 3;
    rotateX = rotateX - changeY / 3;
    $cubeBox.css('transform', 'scale(0.6) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)');

    //->运动完成后记录最新的旋转角度作为下一次旋转开始的值
    $cubeBox.attr({
        rotateX: rotateX,
        rotateY: rotateY
    });
});























