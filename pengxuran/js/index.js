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

/*2������ħ�������swiper�������ʾ����*/
//->���ħ����ÿһ��ҳ��
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

/*3������ħ����ת*/
$cubeBox.attr({
    rotateX: 45,
    rotateY: 30
});
$cubeBox.on('touchstart', function (ev) {
    //->ev:�¼�����,����洢����ָ�������Ϣ
    var point = ev.touches[0];//->��ȡ��һ����ָ�����������Ϣ
    $cubeBox.attr({
        strX: point.pageX,//->��ָ������һ����ĵ�X������,���ǰ���Ϣ�洢����ǰħ���������������(�洢���Զ�����������)
        strY: point.pageY,
        changeX: 0,//->���������洢������ָƫ�Ƶ�X/Y�����
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
    //->Ϊ�˷�ֹ��ָ�������,��������ʵ��Ŀ��һ�㶼�ǻ������볬��10px/30px�Ż���Ϊ�ǻ���
    if (Math.abs(changeX) < 10 && Math.abs(changeY) < 10) {
        //->�����ڻ���,���ǲ����κεĴ���,����return������Ĵ��뽫����ִ��
        return;
    }

    //->���ǵ�changeX���һ���ʵ���Ƶ���ħ��rotateY(����Y����ת��ֵ);���ǵ�changeY��ʵ���Ƶ���ħ��rotateX(����X����ת��ֵ)������ÿһ�ε���ת������ԭ������֮����ת�ģ�
    var rotateX = parseFloat($cubeBox.attr('rotateX')),
        rotateY = parseFloat($cubeBox.attr('rotateY'));
    rotateY = rotateY + changeX / 3;
    rotateX = rotateX - changeY / 3;
    $cubeBox.css('transform', 'scale(0.6) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)');

    //->�˶���ɺ��¼���µ���ת�Ƕ���Ϊ��һ����ת��ʼ��ֵ
    $cubeBox.attr({
        rotateX: rotateX,
        rotateY: rotateY
    });
});























