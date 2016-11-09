/*在这里编写自己需要的JS代码*/
var swiperRender = (function () {
    var $makisuBox = $('#makisuBox');

    function change(example) {
        var slideAry = example.slides,
            index = example.activeIndex;

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


var $cube = $('.all'),
    $cubeBox = $cube.children('.first'),
    $imgList = $cubeBox.children('div');
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