class PhotoGalleryDrop{
  constructor(){
    this.API_KEY = config.SECRET_KEY;
    this.galleryDIv = document.querySelector('.gallery');
    this.searchForm = document.querySelector('.form-search');
    this.searchForm2 = document.querySelector('.form-search2');
    this.header = document.querySelector('.hero');
    this.nav = document.querySelector('.nav-bar');
    this.nav_searchbar = document.querySelector('.search-bar_container2');
    this.container = document.querySelector('.container');
    this.loadMore = document.querySelector('.load-more');
    this.searchBarDropDown2 = document.querySelector('#search-bar-dropdown_recent_searches2');
    // this.logo = document.querySelector('.logo')
    this.recents = document.querySelectorAll('.history_link');
    this.pageIndex = 1;
    this.searchValueGlobal = '';
    this.eventHandle();
  }

  async historyBtnLink(e, t){
    this.loadMore.setAttribute('data-img', 'search');
    this.galleryDIv.innerHTML='';

    const searchValue = t;

    this.searchValueGlobal = searchValue;
    const baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=30&locale=ko-KR`;
    const data = await this.fetchImages(baseURL);

    this.errorHandling(data, searchValue); // 검색한 사진이 없을 경우, 에러 처리
    this.displayPhoto(data, e, searchValue); // 사진 출력
  }
  checkHistoryBtn(e, data) {
    var text = data.textContent;
    this.historyBtnLink(e, text);
    this.fixNav();
    // const rc = document.querySelectorAll('.history_link');
    // rc.forEach(element => element.addEventListener('click', function(e) {
    //   console.log("get div", element.getElementsByTagName("div")[0])
    //   console.log("get text", element.getElementsByTagName("div")[0].textContent)
    //   var text = element.getElementsByTagName("div")[0].textContent;
    //   console.log("element", element, "text", text)
    //   this.historyBtnLink(e, text);
    //   this.fixNav();
    // }.bind(this)));
  }
  fixNav () { // 검색 후 hero 삭제, 네비게이션바 고정 및 투명 제거를 위한 함수
    this.galleryTitle = document.querySelector('.gallery_title');
    this.galleryTitle.style.display = "none";

    this.body = document.body;
    this.header = document.querySelector('.hero');
    if(this.header != null) {
      console.log("hero already defined");
      this.body.removeChild(this.header);
      console.log("hero is deleted");
    }

    this.nav = document.querySelector('.nav-bar');
    this.nav.classList.add('fix');
    this.nav.style.backgroundColor = 'rgb(35, 42, 52)';
    this.nav_searchbar.style.visibility = 'visible';
    this.searchBarDropDown2.style.visibility = 'hidden';
    window.scrollTo(0,0);

  }
  eventHandle() {
    // const recents = document.querySelectorAll('.history_link');
    // this.checkHistoryBtn(recents);
    this.getEvent();
  }

  getEvent() { // 드롭다운 외 다른 영역을 클릭하면, 드롭다운을 닫기위한 함수

    // 드롭다운을 위한 변수 설정
    const formSearch = document.querySelector('.form-search');
    const searchBarDropDown = document.querySelector('#search-bar-dropdown_recent_searches');
    const searchBar = document.querySelector('.search-bar_input');
    const searchBtn = document.querySelector('.search-bar_btn')

    const formSearch2 = document.querySelector('.form-search2');
    const searchBarDropDown2 = document.querySelector('#search-bar-dropdown_recent_searches2');

    const searchBar2 = document.querySelector('.search-bar_input2');
    const searchBtn2 = document.querySelector('.search-bar_btn2')

    const btnList = ["his", "min", "svg", "pat"];

    window.addEventListener('click', function(e){
      const classFull = e.target.getAttribute('class');
      var target = e.target

      console.log(classFull);
      if (classFull != null && classFull.length >= 3) {
        var classLeftThree = classFull.slice(0, 3);
      }

      if (btnList.indexOf(classLeftThree) !== -1) {
        console.log("history area clicked")
        searchBarDropDown2.style.visibility = "hidden";
        console.log("classLeftThree", classLeftThree)
        console.log(classFull)

        var data;
        if (classFull === "history_link") {
          data = target.firstElementChild
          console.log(")))", target.firstElementChild);
        }
        else if (classFull.slice(0,11) === "history_btn") {
          data = target
          console.log(")))", target);
        }
        else if (classLeftThree === "min") {
          data = target.previousElementSibling;
          console.log(")))", target.previousElementSibling);
        }
        else if(classLeftThree === "svg") {
          data = target.parentElement.previousElementSibling;
          console.log(")))", target.parentElement.previousElementSibling);
        }
        else if(classLeftThree === "pat") {
          data = target.parentElement.parentElement.previousElementSibling;
          console.log(")))", target.parentElement.parentElement.previousElementSibling);
        }
        this.checkHistoryBtn(e, data);
      }
      else {
        console.log("non history area clicked")
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
    }.bind(this));
  }
  async fetchImages(baseURL){
    const response = await fetch(baseURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: this.API_KEY
      }
    });
    this.fetch_data = await response.json();
    // console.log(data);
    return this.fetch_data;
  }
  GenerateHTML(photos){
    photos.forEach(photo=>{
      const item= document.createElement('div');
      item.classList.add('item');
      item.innerHTML = `
        <a href="#layer-popup" class="btn-open"> 
            <img src="${photo.src.large}" id="${photo.src.large}">
            <h3>${photo.photographer}</h3>
        </a>
      `;
      this.galleryDIv.appendChild(item);
    })
  }
  errorHandling(data, searchValue) {
    if (data['status'] === 400 || data['total_results'] <= 0) { // 출력할 사진이 없을 때(에러)
      console.log("no picture");

      this.result_msg = document.querySelector('.result_msg');
      this.msgDisplay = this.result_msg.style.display;
      this.searchTitle = document.querySelector('.search_title');
      this.titleDisplay = this.searchTitle.style.display;

      if (this.msgDisplay === 'none') {
        console.log("msg visible")
        this.result_msg.style.display = 'block';
      }

      if (this.titleDisplay === 'block') {
        this.searchTitle.style.display = 'none';
      }

      this.result_msg.innerHTML = `<div><h1 class="error_msg">We Couldn\'t Find Anything For "${searchValue}"</h1></div>
                                   <div><h1 class="recomend_msg">Discover beautiful photos on <a href="">the main page >></a></h1></div>
                                   </div>`;
    }
  }
  displayPhoto(data, e, searchValue) {
    if (data['total_results'] >= 1) { // 출력할 사진이 있을 때
      console.log("yes picture");

      this.searchTitle = document.querySelector('.search_title');
      this.titleDisplay = this.searchTitle.style.display;

      if (this.titleDisplay === "none") {
        this.searchTitle.style.display = "block";

      }
      this.searchTitle.innerHTML = `"${searchValue}" Photos`;

      // 사진 출력
      this.result_msg = document.querySelector('.result_msg');
      if (typeof this.result_msg == "undefined") {
        console.log("result_msg is null(ok)");
        this.GenerateHTML(data.photos);

        if (e['type'] === "submit") {
          e.target.reset();
        }

        console.log("photo displayed");
      }
      else { // 에러메시지가 있다면 제거 후 사진 출력
        console.log("result_msg is not null");
        if (this.result_msg != null) {
          this.result_msg.style.display = "none";
        }
        console.log("result_msg is deleted");

        this.GenerateHTML(data.photos);

        if (e['type'] === "submit") {
          e.target.reset();
        }
        console.log("photo displayed");
      }
    }
  }
}

const galleryDrop = new PhotoGalleryDrop;