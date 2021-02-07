class PhotoGallery{
  constructor(){
    this.API_KEY = '563492ad6f917000010000019cb12da4f7db4d378977abb471d25982';
    this.galleryDIv = document.querySelector('.gallery');
    this.searchForm = document.querySelector('.form-search');
    this.searchForm2 = document.querySelector('.form-search2');


    this.loadMore = document.querySelector('.load-more');
    // this.logo = document.querySelector('.logo')
    this.pageIndex = 1;
    this.searchValueGlobal = '';
    this.eventHandle();
  }
  eventHandle(){
    document.addEventListener('DOMContentLoaded',()=>{
      this.getImg(1);
    });
    this.searchForm.addEventListener('submit', (e)=>{
      this.pageIndex = 1;
      this.getSearchedImages(e);
    });
    this.searchForm2.addEventListener('submit', (e)=>{
      this.pageIndex = 1;
      this.getSearchedImages2(e);
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
    const data = await response.json();
    // console.log(data);
    return data;
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
      this.galleryDIv.appendChild(item)
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
    const baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=24`
    const data = await this.fetchImages(baseURL);
    this.GenerateHTML(data.photos);

    e.target.reset();

    // 폼 데이터를 장고 뷰함수로 보내(POST) 최근 5개 데이터를 비동기로 리턴받도록 함
    this.postSearchData(searchValue);
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
    const baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=24`
    const data = await this.fetchImages(baseURL);
    this.GenerateHTML(data.photos);
    e.target.reset();
    this.postSearchData(searchValue);
  }
  async getMoreSearchedImages(index){
    // console.log(searchValue)
    const baseURL = `https://api.pexels.com/v1/search?query=${this.searchValueGlobal}&page=${index}&per_page=24`
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