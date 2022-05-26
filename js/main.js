var audio = new Audio('sounds/speen.mp3');
var audioWin = new Audio('sounds/win.mp3');
audioWin.src = 'sounds/win.mp3';
var wheelClick = false;
var winItemLength = 69;
var winItemImg = 0;
var winItemPrice = 0;
var winItemLvl = 0;
var winItemType = 0;
var dur = 14000;
//random items

function shuffle(array) {
    for (
        // инициализация цикла
        var j, x, i = array.length;
        // условие остановки (i<=0)
        i;
        // итерации цикла
        j = parseInt(Math.random() * i),
        x = array[--i], // i здесь уменьшается до нуля
        array[i] = array[j],
        array[j] = x
    );
}

function getRandom(min, max) {
    // Получаем массив чисел из диапазона от min до max
    var arr = Array.from(Array(max - min + 1).keys(), x => x + min);
    // Перемешиваем
    shuffle(arr);
    // возвращаем перемешанный массив
    return arr;
}
var a = getRandom(0, 73);
// console.log(a);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateWheel() {

    a.forEach((element, index) => {

        let imageId = getRandomInt(1, 28);
        let persent60 = getRandomInt(1, 3);
        let shadowStyle = getRandomInt(1, 3);
        let randomPrice = getRandomInt(400, 3000);
        let randomLvl = getRandomInt(1, 30);

        if (index != 69 && index != 72 && persent60 != 3) {
            randomPrice = getRandomInt(10, 200);
            $('.wheel_wrap_item').eq(index).addClass('wheel_wrap_item_code');
            $('.wheel_wrap_item').eq(index).children('.win_item_type').hide();
            $('.wheel_wrap_item').eq(index).children('.win_item_img').children().attr('src', 'img/code.png');
            $('.wheel_wrap_item').eq(index).children('.lvl').children('.lvl_border').hide();
            $('.wheel_wrap_item').eq(index).children('.lvl').children('span').html('Activation code');
            $('.wheel_wrap_item').eq(index).children('.gray_wrap').children('.gift').html('START');
            $('.wheel_wrap_item').eq(index).children('.gray_wrap').children('.price').html(randomPrice + ' USD');
        } else {

            if (index == 69) {
                randomPrice = getRandomInt(5000, 10000);
                shadowStyle = 3;
                winItemLength = 69;
            }
            $('.wheel_wrap_item').eq(index).children().children('img').attr('src', 'img/snickers/' + imageId + '.png');
            $('.wheel_wrap_item').eq(index).children().children('.price').html(randomPrice + " ≈ USD");
            $('.wheel_wrap_item').eq(index).children('.lvl').children('span').html("Lv" + randomLvl);

            if (shadowStyle == 1) {
                $('.wheel_wrap_item').eq(index).children('.win_item_type').addClass('win_green');
                $('.wheel_wrap_item').eq(index).children('.win_item_type').html('Trainer');
            }
            if (shadowStyle == 2) {
                $('.wheel_wrap_item').eq(index).children('.win_item_type').addClass('win_blue');
                $('.wheel_wrap_item').eq(index).children('.win_item_type').html('Jogger');
            }
            if (shadowStyle == 3) {
                $('.wheel_wrap_item').eq(index).children('.win_item_type').addClass('win_pink');
                $('.wheel_wrap_item').eq(index).children('.win_item_type').html('Walker');
            }
        }

        $('.wheel_wrap').attr('style', 'display:grid');
    });

}
updateWheel();

$('.wheel_items').show();
let pos = 0;
if ($(window).width() > 768)
    pos = $('.wheel_wrap_item').eq(winItemLength).offset().left - $(window).width() / 2.2;
else
    pos = $('.wheel_wrap_item').eq(winItemLength).offset().left - $(window).width() / 3.5;

console.log(pos);

console.log($(window).width());
//animate wheel
$('.wheel_start').click(function() {
    $('.popup_mask').hide();
    $('.popup_wrap').hide();

    if (wheelClick == false) {

        $(".wheel_wrap").animate({
            marginLeft: '-' + pos
        }, dur, 'easeOutCubic', callback);

        winItemImg = $('.wheel_wrap_item').eq(winItemLength).children().children('img').attr('src');
        winItemPrice = $('.wheel_wrap_item').eq(winItemLength).children().children('.price').html();
        winItemLvl = $('.wheel_wrap_item').eq(winItemLength).children('.lvl').children('span').html();
        winItemType = $('.wheel_wrap_item').eq(winItemLength).children('.win_item_type').html();
        wheelClick = true;
        var ind = 1;
        audio.volume = 0.03;
        audio.play();

    }
})

$('.btn_wheel').click(function() {
    $('.popup_info .popup_mask').toggle();
    $('.popup_info .popup_wrap').animate({ left: 'toggle' });
})



function callback() {
    $('.popup_price .popup_mask').show();
    $('.popup_price .popup_wrap').show();
    $('.popup_container .win_item .gray_wrap .price').html(winItemPrice);
    $('.popup_container .win_item_img img').attr('src', winItemImg);
    $('.popup_container .win_item .win_item_type').html(winItemType);
    $('.popup_container .win_item .lvl span').html(winItemLvl);
    $('.popup_price .win_item_type').addClass('win_pink');
    $('.win_item').removeClass('wheel_wrap_item_code');
    audio.pause();
    audio.currentTime = 0;

    audioWin.volume = 0.08;
    audioWin.play();

    $('.pyro').show();
}



//modals
var maxh = $(document).outerHeight(true);
$('.popup_mask').attr('style', 'height: ' + maxh + 'px;');

$('.popup_close').click(function() {
    $(this).parent().parent().siblings('.popup_mask').toggle();
    $(this).parent().parent('.popup_wrap').toggle();
})

$('.popup_mask').click(function() {
    $(this).toggle();
    $(this).siblings('.popup_wrap').hide();
    $('.pyro').hide();
})

$('.header_right_wallet').click(function() {
    $('.popup .popup_mask').toggle();
    $('.popup .popup_wrap').animate({ left: 'toggle' });
})


var h = $('body').height();
$('.full_bg').attr('style', 'height: ' + h + 'px !important');