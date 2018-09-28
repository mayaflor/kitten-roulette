// Here's your API key

// 460e3088-2a9c-452d-a088-ccbfd2686a96

// Here's your user_id

// uf31v0

const randomUrl = "https://api.thecatapi.com/v1/images/search?460e3088-2a9c-452d-a088-ccbfd2686a96" 
const favUrl = "https://api.thecatapi.com/v1/images/" 
const favsLocalStorage = localStorage.getItem("id");

$(document).ready(() => {

  $("#"+favsLocalStorage).addClass("liked");

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
    $.ajax({
      type: "GET",
      url: favUrl + favsLocalStorage,
      success: favPages
    })
  }

  console.log(favUrl + favsLocalStorage)

  function favPages(data) {
    console.log(data);
    let favsKittyContainer = `<div class="favs-kitty-container" id="parent-${data["id"]}"><img src="${data["url"]}"><i id="${data["id"]}" onclick="clickLike(this)" class="icon-heart like liked"></i></div>`
  
    $("#kitty-area").append(favsKittyContainer);
  }

})

function clickLike(icon){
  let catId = $(icon).attr("id");
  let jqCatID = "#"+catId;

  localStorage.setItem("id", catId);

  $(jqCatID).toggleClass("liked");

  if ( !$(jqCatID).hasClass("liked") ){
    localStorage.removeItem("id");
  }
}



