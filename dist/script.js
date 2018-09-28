// Here's your API key

// 460e3088-2a9c-452d-a088-ccbfd2686a96

// Here's your user_id

// uf31v0

const randomUrl = "https://api.thecatapi.com/v1/images/search?460e3088-2a9c-452d-a088-ccbfd2686a96" 
const favUrl = "https://api.thecatapi.com/v1/images/" 
const favsLocalStorage = JSON.parse(localStorage.getItem("id"));
console.log(favsLocalStorage)

$(document).ready(() => {

  // $("#"+favsLocalStorage).addClass("liked");

  page("/", ajaxRandomCats);
  page("/favs", ajaxFavCats);
  page();

  // function index() {
  //   $("#kitty-area").html(ajaxRandomCats());
  // }

  // function favs() {
  //   $("#kitty-area").html(ajaxFavCats());
  // }
  
  function ajaxRandomCats(){
    for(let i=0; i < 4; i++){
      $.ajax({
        type: "GET",
        url: randomUrl,
        success: getCats
      })
    }
  }

  function getCats(data){
    console.log(data);
  
    let kittyContainer = `<div class="kitty-container" id="parent-${data[0]["id"]}"><img src="${data[0]["url"]}"><i id="${data[0]["id"]}" onclick="clickLike(this)" class="icon-heart like"></i></div>`
  
    $("#kitty-area").append(kittyContainer);
  }

  function ajaxFavCats(){
    favsLocalStorage.forEach(function (value, index) {
      $.ajax({
        type: "GET",
        url: favUrl + value,
        success: favPages
      })
    });

  }

  function favPages(data) {
    let favsKittyContainer = `<div class="favs-kitty-container" id="parent-${data["id"]}"><img src="${data["url"]}"><i id="${data["id"]}" onclick="clickLike(this)" class="icon-heart like liked"></i></div>`
  
    $("#kitty-area").append(favsKittyContainer);
  }

})

function clickLike(icon){
  icon.classList.toggle("liked");
  let getFavs = JSON.parse(localStorage.getItem("id"));
  let catId = $(icon).attr("id");
  let newFavs

  if (getFavs) {
    let index = getFavs.findIndex( value => value === catId );

    if ( index >= 0 ){
      newFavs = [ ...getFavs];
      newFavs.splice(index, 1);
    } else{
      newFavs = [ ...getFavs, catId ];
    }

  } else {
    newFavs = [ catId ];
  }

  localStorage.setItem("id", JSON.stringify(newFavs));
}



