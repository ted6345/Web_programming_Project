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
    // this.logo = document.querySelector('.logo')
    this.pageIndex = 1;
    this.searchValueGlobal = '';
    this.eventHandle();
  }

  fixNav () { // 검색 후 hero 삭제, 네비게이션바 고정 및 투명 제거를 위한 함수
    this.body = document.body;
    this.header = document.querySelector('.hero');
    if(this.header != null) {
      console.log("hero already defined");
      this.body.removeChild(this.header);
    }
    this.nav.classList.add('fix');
    this.nav.style.backgroundColor = 'rgb(35, 42, 52)';
    this.nav_searchbar.style.visibility = 'visible';
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
    })
    // this.logo.addEventListener('click',()=>{
    //   this.pageIndex = 1;
    //   this.galleryDIv.innerHTML = '';
    //   this.getImg(this.pageIndex);
    // })
  }
  async getImg(index){
    this.loadMore.setAttribute('data-img', 'curated');
    const baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=24`;
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
    searchBarDropDown.style.visibility = "hidden";
    searchBar.style.borderBottomLeftRadius = "6px";
    searchBtn.style.borderBottomRightRadius = "6px";
    const searchValue = e.target.querySelector('.search-bar_input').value;

    this.searchValueGlobal = searchValue;
    const baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=24`;
    const data = await this.fetchImages(baseURL);

    this.fromDataSaveToDisplayPhoto(searchValue, data, e);
  }
  fromDataSaveToDisplayPhoto (searchValue, data, e){
    console.log(searchValue);
    console.log(data);

    this.postSearchData(searchValue); // 검색 결과 저장
    this.errorHandling(data, searchValue); // 검색한 사진이 없을 경우, 에러 처리
    this.displayPhoto(data, e); // 사진 출력
  }
    errorHandling(data, searchValue) {
    if (data['status'] === 400){ // 출력할 사진이 없을 때(에러)
      console.log("no picture");
      this.loadMore = document.querySelector('.load-more');
      this.loadMoreVisibility = this.loadMore.style.visibility;
      this.result_msg = document.querySelector('.result_msg');
      // Load More가 있으면 숨기고 출력
      if (this.loadMoreVisibility === 'visible') {
        console.log("loadmore is visible");
        this.loadMore.style.visibility="hidden";
        console.log("hide loadmore");
        this.result_msg.innerHTML = `<section><h1 class="error_msg">We Couldn\'t Find Anything For "${searchValue}"</h1></section>
                                     <section><h1 class="recomend_msg">Discover beautiful photos on <a href="">the main page >></a></h1></section>
                                     </div>`;
      }
      else {
        this.result_msg.innerHTML = `<section><h1 class="error_msg">We Couldn\'t Find Anything For "${searchValue}"</h1></section>
                                     <section><h1 class="recomend_msg">Discover beautiful photos on <a href="">the main page >></a></h1></section>
                                     </div>`;
      }
    }
  }
  displayPhoto(data, e) {
    if (data['total_results'] >= 1) { // 출력할 사진이 있을 때
      console.log("yes picture");
      // Load More가 숨겨져 있으면 보이기
      this.loadMore = document.querySelector('.load-more');
      this.loadMoreVisibility = this.loadMore.style.visibility;
      if (this.loadMoreVisibility === "hidden") {
        this.loadMore.style.visibility = "visible";
      }

      // 사진 출력
      this.result_msg = document.querySelector('.result_msg');
      if (typeof this.result_msg == "undefined") {
        console.log("result_msg is null(ok)");
        this.GenerateHTML(data.photos);
        e.target.reset();
        console.log("photo displayed");
      }
      else { // 에러메시지가 있다면 제거 후 사진 출력
        console.log("result_msg is not null");
        if (this.result_msg != null) {
          this.container.removeChild(this.result_msg);
        }
        console.log("result_msg is deleted");

        this.GenerateHTML(data.photos);
        e.target.reset();
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

    searchBarDropDown2.style.visibility = "hidden";
    searchBar2.style.borderBottomLeftRadius = "6px";
    searchBtn2.style.borderBottomRightRadius = "6px";

    this.searchValueGlobal = searchValue;
    const baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=24`;
    const data = await this.fetchImages(baseURL);

    this.fromDataSaveToDisplayPhoto(searchValue, data, e);
  }
  async getMoreSearchedImages(index){
    // console.log(searchValue)
    const baseURL = `https://api.pexels.com/v1/search?query=${this.searchValueGlobal}&page=${index}&per_page=24`;
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