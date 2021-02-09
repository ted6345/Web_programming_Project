nav = document.querySelector('.nav-bar');
nav_searchbar = document.querySelector('.search-bar_container2');
topDropDown = document.querySelector('#search-bar-dropdown_recent_searches2');

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

