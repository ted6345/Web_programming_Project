// 팝업 열기
$(document).on("click", ".btn-open", function (e) {
    var $href = $(this).attr("href");//속성값을 갖고옴 href = # layer-popup
    var $src = $(this).find("img").attr("id");
    console.log($src);
    popup($href,$src);

});

function popup(el,src) {
    var $el = $(el);
    // var $src = $(src);
    // console.log("popup " + $el);
    $('.layer-container').fadeIn();
    $el.find("img").attr("src",src);

    // pop-up layer을 가운데도 정렬시키기 위한 코드
    var navHeight =$('.nav-bar').outerHeight();
    var $elWidth = ~~($el.outerWidth()),
        $elHeight = ~~($el.outerHeight()),
        docHeight = $(window).innerHeight()-navHeight,
        docWidth = $(window).innerWidth();

    $elWidth = docWidth*0.5;
    $elHeight= docHeight*0.9;

    //
    // if($elWidth<$elHeight){
    //   var tmp = $elHeight;
    //   $elHeight= docHeight*0.9;
    //   $elWidth = docWidth*0.9;
    //
    //   // $elWidth = $elWidth* $elHeight/tmp;
    // }
    // else{
    //     var tmp = $elWidth;
    //     $elWidth= docWidth*0.9;
    //   // $elHeight = $elHeight* $elWidth/tmp;
    //     $elHeight= docHeight*0.9;
    //
    // }

    $el.css({
            top: (docHeight-$elHeight)/2+navHeight,
            left:(docWidth -$elWidth)/2,

            height : $elHeight,
            width: $elWidth

    })



    $el.find('a.btn-layerClose').click(function () {
        $('.layer-container').fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
        return false;
    });


    $('.dimBg').click(function () { // 외부영역을 클릭하면 레이어가 닫힌다.
        $('.layer-container').fadeOut();
        return false;
    });

}
