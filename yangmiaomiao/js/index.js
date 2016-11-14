/**
 * Created by A on 2016/11/13.
 */
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);

~function (desW) {
    var winW = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = winW / desW * 100 + "px";
}(320);

var mySwiper = new Swiper('.swiper-container', {
    direction: "vertical",
    loop: true,
    speed: 500,
    pagination: '.swiper-pagination',
    paginationType: 'progress',
    onInit: function (swiper) {
        swiper.myactive = 1;
    },
    onTransitionEnd: function (swiper) {
        swiper.myactive = swiper.activeIndex;
        var myId = swiper.slides[swiper.myactive].getAttribute("trueId");
        console.log(swiper.myactive);
        for (var i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].id = i == swiper.myactive ? myId : null;
        }
    }
});


/*音频的自动播放*/
~function () {
    var audioBox = document.querySelector(".audio"),
        myAudio = audioBox.getElementsByTagName("audio")[0];
    window.setTimeout(function () {
        myAudio.play();
        myAudio.addEventListener("canplay", function () {
            audioBox.style.display = "block";
            audioBox.className += " audioMove";
        }, false);
    }, 1000);
    audioBox.addEventListener("click", function () {
        if (myAudio.paused) {
            myAudio.play();
            audioBox.className = "audio audioMove";
            return;
        }
        myAudio.pause();
        audioBox.className = "audio";
    }, false);

}();
