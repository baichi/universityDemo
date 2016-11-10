/*1、SWIPER*/
var swiperRender = (function () {
    var $makisuBox = $('#makisuBox');

    function change(example) {
        var slideAry = example.slides,
            index = example.activeIndex;

        //->MAKISU
        if (index == 2) {
            $makisuBox.css('display', 'block');
            $makisuBox.makisu({
                selector: 'dd',
                overlap: 0.6,
                speed: 0.8
            });
            $makisuBox.makisu('open');
        } else {
            $makisuBox.css('display', 'none');
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
                effect: 'cube',
                onTransitionEnd: change,
                onInit: change
            });
            hbu_swiper.slideTo(active, 0);
        }
    }
})();


/*2、CUBE*/
var $cube = $('.hbu_cube'),
    $cubeBox = $cube.children('.cube_box'),
    $imgList = $cubeBox.children('img');
var $swiper = $('.hbu_swiper'),
    $return = $swiper.children('.hbu_return');

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
    var point = ev.touches[0];
    $cubeBox.attr({
        strX: point.pageX,
        strY: point.pageY,
        changeX: 0,
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
    if (Math.abs(changeX) < 10 && Math.abs(changeY) < 10) {
        return;
    }
    var rotateX = parseFloat($cubeBox.attr('rotateX')),
        rotateY = parseFloat($cubeBox.attr('rotateY'));
    rotateY = rotateY + changeX / 3;
    rotateX = rotateX - changeY / 3;
    $cubeBox.css('transform', 'scale(0.6) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)');
    $cubeBox.attr({
        rotateX: rotateX,
        rotateY: rotateY
    });
});

/*雪花区域*/
var $tip = $('#tip');
$tip.tap(function () {
    window.clearTimeout(tipTimer);
    $tip.css('display', 'none');
    $cube.css('display', 'block');
});
var tipTimer = window.setTimeout(function () {
    $tip.css('display', 'none');
    $cube.css('display', 'block');
}, 3000);


