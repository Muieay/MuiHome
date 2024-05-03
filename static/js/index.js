$(window).on("load", (function () {
    $(".xf_load").length && $(".xf_load").fadeOut(1300)
}));
var swiper = new Swiper(".xf_ico_banner", {
        navigation: {
            nextEl: ".swiper-button-next-ico",
            prevEl: ".swiper-button-prev-ico"
        }
    }), modal = document.getElementById("myModal"), img = document.getElementById("xf_wxImg"),
    modalImg = document.getElementById("img01"), captionText = document.getElementById("caption");
img.onclick = function () {
    modal.style.display = "block", modalImg.src = this.src, captionText.innerHTML = this.alt
};
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
    modal.style.display = "none"
};
const hours = document.querySelector(".hours"), minutes = document.querySelector(".minutes"),
    seconds = document.querySelector(".seconds");

function xfppp(e) {
    return e < 10 ? "0" + e : e
}

function getClick(e) {
    2 == e.button && (swal("为了不影响页面美观, 这边禁用您了您的右键！"), document.oncontextmenu = new Function("event.returnValue=false;"))
}

clock = () => {
    let e = new Date, t = e.getHours() % 12 + e.getMinutes() / 59, n = e.getMinutes(), o = e.getSeconds();
    t *= 30, n *= 6, o *= 6, rotation(hours, t), rotation(minutes, n), rotation(seconds, o), setTimeout(clock, 500)
}, rotation = (e, t) => {
    e.style.transform = `rotate(${t}deg)`
}, window.onload = clock(), $((function () {
    var e = new Date, t = e.getHours() + ":", n = e.getMinutes(), o = new Date, i = o.getFullYear(),
        s = o.getMonth() + 1, a = o.getDate(), c = (new Date).getDay(), u = t < 10 ? "0" + t : t,
        r = n < 10 ? "0" + n : n;
    $(".xf_time_1").html(u + r), $(".xf_time_2").html(i + "年" + xfppp(s) + "月" + xfppp(a) + "日 "), $(".xf_time_3").html(["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][c])
})), $(".xf_zhuanfa").click((function () {
    let e = document.createElement("input");
    document.body.appendChild(e), e.style.cssText = "position: absolute; right: 45%; top: 80%;", e.value = document.domain, e.focus(), e.select(), document.execCommand("copy") && document.execCommand("copy"), e.blur(), swal("复制本站域名成功!"), document.body.removeChild(e)
}));
let qixiazhandian = document.querySelector(".but_site"), jinriyunshi = document.querySelector(".but_fortune"),
    xf_fortune = document.querySelector(".xf_fortune"), xf_site = document.querySelector(".xf_site");
qixiazhandian.addEventListener("click", (function () {
    xf_fortune.style.display = "none", xf_site.style.display = "block"
})), jinriyunshi.addEventListener("click", (function () {
    xf_fortune.style.display = "block", xf_site.style.display = "none"
}));
var bool, musicInfo = [], nowmusic = "",
    audio = $("<audio />"), musicimg = $("<img>"), song = $("<div></div>"), auther = $("<div></div>"), isPaused = !1,
    isMuted = !1, len = 0, nowloca = 0, volume = 1;
var musicList = []
var currentIndex = 0;
var lastIndex = musicList.length-1;
function init() {
    $.ajax({
        url: `${metingApi}/?server=${userServer}&type=${userType}&id=${userId}`,
        type: "get", dataType: "json",
        success: function (e) {
            musicList = e;
            lastIndex = musicList.length-1;
            currentIndex = Math.floor(Math.random() * lastIndex);
            setMusic(currentIndex);
        }
    })
}
function setMusic(ii){
    audio.attr("autoplay", "autoplay"),
        audio.attr("src", musicList[ii].url), $(".musicbox").append(audio),
        musicimg.attr("src", musicList[ii].pic), musicimg.addClass("musicimg")
    $(".music-img").append(musicimg), auther.text(musicList[ii].artist),
        auther.addClass("auther"), song.text(musicList[ii].name), song.addClass("name"),
        $(".music-info").append(song), $(".music-info").append(auther), len = ii, nowloca = ii,
        nowmusic = musicList[ii]
}

function ProgressBar() {
    var e = audio.prop("duration"), t = audio.prop("currentTime");
    let n = parseInt(e / 60), o = parseInt(e % 60), i = parseInt(t / 60), s = parseInt(t % 60);
    if (o > 9) {
        let e = "0" + n + ":" + o;
        $(".end").text(e)
    } else {
        let e = "0" + n + ":0" + o;
        $(".end").text(e)
    }
    if (i > 0) if (s > 9) {
        let e = "0" + i + ":" + s;
        $(".start").text(e)
    } else {
        let e = "0" + i + ":0" + s;
        $(".start").text(e)
    } else if (s > 9) {
        let e = "0" + i + ":" + s;
        $(".start").text(e)
    } else {
        let e = "0" + i + ":0" + s;
        $(".start").text(e)
    }
    let a = $(".running").css("width"), c = t / e;
    a = parseFloat(a) * parseFloat(c), $(".running1").css("width", parseInt(a)), e == t && setMusic(currentIndex>=lastIndex ? 0 : ++currentIndex)
}

function replayMusic() {
    audio.prop("src", nowmusic.url), musicimg.prop("src", nowmusic.pic), auther.text(nowmusic.artist), song.text(nowmusic.name)
}

function pauseMusic() {
    isPaused ? (audio[0].play(), musicimg.css("animation-play-state", "running"), $("#pause").html("&#xe638;"), bool = !0) : (audio[0].pause(), musicimg.css("animation-play-state", "paused"), $("#pause").html("&#xea82;"), bool = !1), isPaused = !isPaused
}

function muteMusic() {
    var e = document.getElementsByTagName("audio");
    isMuted ? (e[0].muted = !1, $("#mute").html("&#xe64c;")) : (e[0].muted = !0, $("#mute").html("&#xe65e;")), isMuted = !isMuted
}

function preMusic() {
    0 == currentIndex ? swal("这是第一首歌曲了！") : setMusic(--currentIndex)
}

function nextMusic() {
    lastIndex == currentIndex ?  swal("这是最后一首歌曲了！") : setMusic(++currentIndex)
}

function changeVulme(e) {
    $(".vulmeBar").click((function (e) {
        let t = e.offsetX, n = e.offsetY;
        (t >= 0 && t <= 5 || n <= 0) && (volume = t / 100, audio.prop("volume", volume), $(".vulmeBar1").css("width", 100 * volume))
    }))
}

function changeProgress() {
    $(".running").click((function (e) {
        let t = e.offsetX, n = e.offsetY;
        var o = audio.prop("duration");
        if (t >= 0 && t <= 258 || n <= 0) {
            let e = t / 258 * o;
            document.getElementsByTagName("audio")[0].currentTime = e, $(".running1").css("width", t)
        }
    }))
}

function setTimer() {
    setInterval((() => {
        ProgressBar(), "60px" === $(".vulme").css("width") ? ($(".vulmeBar").css("width", 100), $(".vulmeBar1").css("width", 100 * volume)) : ($(".vulmeBar").css("width", 0), $(".vulmeBar1").css("width", 0))
    }), 1e3)
}
$("#icon-rotate").click((() => {
    $(".xf_right_box ").css("transform", "rotateY(180deg)"), $(".xf_music_box").css("display", "none"), $(".xf_friends").css("display", "block")
})), $("#xf-friend-rotate").click((() => {
    $(".xf_right_box ").css("transform", "rotateY(0deg)"), $(".xf_music_box").css("display", "block"), $(".xf_friends").css("display", "none")
})), $((function () {
    init(), setTimer()
})), !1 === bool && (console.log(111), $("#music-img").css("animationPlayState", "paused")), WIDGET = {
    CONFIG: {
        layout: "1",
        width: "450",
        height: "150",
        background: "5",
        dataColor: "FFFFFF",
        language: "zh",
        modules: "01",
        key: "b40becb7ef154292abb0ab080baba7d0"
    }
};
let xf_now_width1 = document.body.clientWidth, xf_now_width2 = window.screen.width;
(xf_now_width1 < 992 || xf_now_width2 < 992) && ($(".big_box").addClass("swiper mySwiper"), $(".main_content").addClass("swiper-wrapper"), $(".slidebox").addClass("swiper-slide"), $("#icon-rotate").click((() => {
    $(".xf_right_box ").css("transform", "rotateY(360deg)"), $(".xf_music_box").css("display", "none"), $(".xf_friends").css("display", "block")
})), $("#xf-friend-rotate").click((() => {
    $(".xf_right_box ").css("transform", "rotateY(0deg)"), $(".xf_music_box").css("display", "block"), $(".xf_friends").css("display", "none")
})));
swiper = new Swiper(".mySwiper", {
    pagination: ".home-slide .swiper-pagination",
    initialSlide: 1,
    observer: !0,
    observeParents: !0,
    paginationClickable: !0,
    pagination: {el: ".xf-swiper-pagination", clickable: !0},
    watchSlidesProgress: !0,
    slidesPerView: 1
});

function orient() {
    return 0 == window.orientation || 180 == window.orientation ? ($("body").attr("class", "portrait"), orientation = "portrait", !1) : 90 == window.orientation || -90 == window.orientation ? ($("body").attr("class", "landscape"), orientation = "landscape", !1) : void 0
}

$((function () {
    orient()
})), $(window).bind("orientationchange", (function (e) {
    orient()
}));
