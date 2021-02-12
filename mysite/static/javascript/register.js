class PhotoGallery{
  constructor(){
    this.API_KEY = config.SECRET_KEY;
    this.galleryDIv = document.querySelector('.gallery');
    this.nav = document.querySelector('.nav-bar');
    this.container = document.querySelector('.container');
    // this.logo = document.querySelector('.logo')
    this.pageIndex = 1;
    this.searchValueGlobal = '';
    this.eventHandle();
  }



  eventHandle(){
    document.addEventListener('DOMContentLoaded',()=>{
      console.log("ffff");
      this.getImg(1);
    });

  }
  async getImg(index){
    // this.loadMore.setAttribute('data-img', 'curated');
    const baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=32`;
    const data = await this.fetchImages(baseURL);
    this.GenerateHTML(data.photos);
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
      <img src="${photo.src.medium}">

      `;
      this.galleryDIv.appendChild(item);
    })
  }

}

const gallery = new PhotoGallery;