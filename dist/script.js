const randomUrl = "https://api.thecatapi.com/v1/images/search?460e3088-2a9c-452d-a088-ccbfd2686a96" 
const favUrl = "https://api.thecatapi.com/v1/images/" 

$(document).ready(() => {

  page("/", ajaxRandomCats);
  page("/favs", ajaxFavCats);
  page();

})
  
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
  $(".favs-kitty-container").hide();
  let kittyContainer = `<div class="kitty-container" id="parent-${data[0]["id"]}"><img src="${data[0]["url"]}"><i id="${data[0]["id"]}" onclick="clickLike(this)" class="icon-heart like"></i></div>`
  $("#kitty-area").append(kittyContainer);
}

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

function ajaxFavCats(){
  const favsLocalStorage = JSON.parse(localStorage.getItem("id"));
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
  $(".kitty-container").hide();
  $("#kitty-area").append(favsKittyContainer);
}