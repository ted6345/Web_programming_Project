// 드롭다운을 위한 변수 설정
const formSearch = document.querySelector('.form-search');
const searchBarDropDown = document.querySelector('#search-bar-dropdown_recent_searches');
const searchBar = document.querySelector('.search-bar_input');
const searchBtn = document.querySelector('.search-bar_btn')

const formSearch2 = document.querySelector('.form-search2');
const searchBarDropDown2 = document.querySelector('#search-bar-dropdown_recent_searches2');
const searchBar2 = document.querySelector('.search-bar_input2');
const searchBtn2 = document.querySelector('.search-bar_btn2')

const btnList = [
    "history_link",
    "history_btn lastet-5-content_1", "history_btn lastet-5-content_2", "history_btn lastet-5-content_3", "history_btn lastet-5-content_4", "history_btn lastet-5-content_5",
    "mini-svg-icon", "svg", "path"
];

// 드롭다운 외 다른 영역을 클릭하면, 드롭다운을 닫기위한 함수
function getEvent() {
    window.addEventListener('click', function(e){
      console.log(btnList.indexOf(e.target.getAttribute('class')));
      console.log(e.target.getAttribute('class'))

      if (btnList.indexOf(e.target.getAttribute('class')) !== -1) {
        console.log("history")
        searchBarDropDown2.style.visibility = "hidden";
      }
      else {
        console.log("non history")
        if (formSearch.contains(e.target)){
          searchBarDropDown.style.visibility = "visible";
          searchBar.style.borderBottomLeftRadius = "0";
          searchBtn.style.borderBottomRightRadius = "0";
          searchBar.style.borderBottom = "1px solid grey";
          searchBtn.style.borderBottom = "1px solid grey";
        } else {
          searchBarDropDown.style.visibility = "hidden";
          searchBar.style.borderBottomLeftRadius = "6px";
          searchBtn.style.borderBottomRightRadius = "6px";
        }

        if (formSearch2.contains(e.target)){
          searchBarDropDown2.style.visibility = "visible";
          searchBar2.style.borderBottomLeftRadius = "0";
          searchBtn2.style.borderBottomRightRadius = "0";
          searchBar2.style.borderBottom = "1px solid grey";
          searchBtn2.style.borderBottom = "1px solid grey";
        } else {
          searchBarDropDown2.style.visibility = "hidden";
          searchBar2.style.borderBottomLeftRadius = "6px";
          searchBtn2.style.borderBottomRightRadius = "6px";
        }
      }
    });
}

getEvent()