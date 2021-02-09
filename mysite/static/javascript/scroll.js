// var didScroll;
// var lastScrollTop = 0;
// var delta = 5;
// var navbarHeight = $('nav').outerHeight();
nav = document.querySelector('.nav-bar');
nav_searchbar = document.querySelector('.search-bar_container2');
// hero_searchbar = document.querySelector('.search-bar_container')
topDropDown = document.querySelector('#search-bar-dropdown_recent_searches2');

// 네비게이션바 설
$(window).scroll(function (event) {
    didScroll = true;
    var st = $(this).scrollTop();
    fix = document.querySelector('.fix');

    if (fix == null) {
        if(st > 300){
            nav.style.backgroundColor = 'rgb(35, 42, 52)';
            nav_searchbar.style.visibility = 'visible';
        }
        else {
            topDropDown.style.visibility = 'hidden';
            nav.style.backgroundColor = 'transparent';
            nav_searchbar.style.visibility = 'hidden';
        }
    }
});

// 자동 스크롤
$(window).scroll(function() {
  if ($(window).scrollTop() === $(document).height() - $(window).height()) {
    var loadMore = document.querySelector('.load-more');
    loadMore.click();
    console.log("scroll_end")
  }
});