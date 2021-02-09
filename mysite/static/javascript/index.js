class PhotoGallery{
  constructor(){
    this.API_KEY = '563492ad6f917000010000019cb12da4f7db4d378977abb471d25982';
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

    this.pageIndex = 1;
    this.searchValueGlobal = '';
    this.eventHandle();
  }

  checkBtnLink() {
    this.recent = document.querySelectorAll('.history_link');
    // console.log(this.recent)
    for (let i=0 ; i < 10 ; i++) {
      this.recent[i].addEventListener('click', (e) => {
        var text = this.recent[i].getElementsByTagName("div")[0].innerText;
        console.log("button clicked")
        this.historyBtnLink(e, text);
        this.fixNav();
      });
    }
  }
  async historyBtnLink(e, text){
    this.loadMore.setAttribute('data-img', 'search');
    this.galleryDIv.innerHTML='';

    const searchValue = text;

    this.searchValueGlobal = searchValue;
    const baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=30`;
    const data = await this.fetchImages(baseURL);



    this.errorHandling(data, searchValue); // 검색한 사진이 없을 경우, 에러 처리
    this.displayPhoto(data, e, searchValue); // 사진 출력
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
  }

  eventHandle(){
    document.addEventListener('DOMContentLoaded',()=>{
      this.getImg(1);
    });
    this.searchForm.addEventListener('submit', (e)=>{
      console.log("searchForm1 in Hero clicked")
      this.pageIndex = 1;
      this.getSearchedImages(e);
      this.fixNav();
    });
    this.searchForm2.addEventListener('submit', (e)=>{
      console.log("searchForm in Nav clicked")
      this.pageIndex = 1;
      this.getSearchedImages2(e);

      this.input = document.querySelector('.search-bar_input2')
      this.input.value = "";
      this.fixNav();
    });
    this.loadMore.addEventListener('click', (e)=>{
      this.loadMoreImages(e);
      console.log(e);
    })
    this.checkBtnLink();
  }
  async getImg(index){
    this.loadMore.setAttribute('data-img', 'curated');
    const baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=30`;
    const data = await this.fetchImages(baseURL);
    this.GenerateHTML(data.photos)
    // console.log(data)
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
      <a href='${photo.src.original}' target="_blank">
        <img src="${photo.src.medium}">
        <h3>${photo.photographer}</h3>
      </a>
      `;
      this.galleryDIv.appendChild(item);
    })
  }
  async getSearchedImages(e){
    this.loadMore.setAttribute('data-img', 'search');
    e.preventDefault(); // 활성화되면 form에서 post request가 작동되지 않음
    this.galleryDIv.innerHTML='';
    const searchValue = e.target.querySelector('.search-bar_input').value;

    this.searchValueGlobal = searchValue;
    const baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=30`;
    const data = await this.fetchImages(baseURL);

    this.fromDataSaveToDisplayPhoto(searchValue, data, e);
  }
  fromDataSaveToDisplayPhoto (searchValue, data, e){
    console.log(searchValue);
    console.log(data);

    this.postSearchData(searchValue); // 검색 결과 저장
    this.errorHandling(data, searchValue); // 검색한 사진이 없을 경우, 에러 처리
    this.displayPhoto(data, e, searchValue); // 사진 출력
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
  postSearchData(searchValue) {
    $(document).ready(function() {
      $.ajax({
        method: 'POST',
        url: '/search/',
        data: {'search_content': searchValue},
        success: function (data) {
          console.log("ajax post request success")
          // 최근 5개 리스트를 비동기로 가져옴(GET)
          $(document).ready(function() {
            $.ajax({
              method: 'GET',
              url: '/search/',
              success: function (data) {
                console.log("ajax get success");
                for(let i=1; i <= data.length; i++) {
                  $('.lastest-5-content_'+i).html(data[i-1]['content']);
                }

              },
              error: function (data) {
                console.log("ajax get error");
              }
            });
          });

        },
        error: function (data) {
          console.log("ajax post error");
        }
      });
    });
  }
  async getSearchedImages2(e){
    this.loadMore.setAttribute('data-img', 'search');
    e.preventDefault();
    this.galleryDIv.innerHTML='';

    const searchValue = e.target.querySelector('.search-bar_input2').value;

    this.searchValueGlobal = searchValue;
    const baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=30`;
    const data = await this.fetchImages(baseURL);

    this.fromDataSaveToDisplayPhoto(searchValue, data, e);
  }
  async getMoreSearchedImages(index){
    // console.log(searchValue)
    const baseURL = `https://api.pexels.com/v1/search?query=${this.searchValueGlobal}&page=${index}&per_page=30`;
    const data = await this.fetchImages(baseURL);
    // console.log(data)
    this.GenerateHTML(data.photos);
  }
  loadMoreImages(e){
    let index = ++this.pageIndex;
    const loadMoreData = e.target.getAttribute('data-img');
    if(loadMoreData === 'curated'){
      // load next page for curated]
      this.getImg(index)
    }else{
      // load next page for search
      this.getMoreSearchedImages(index);
    }
  }
}

const gallery = new PhotoGallery;