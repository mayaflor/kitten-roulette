// Here's your API key

// 460e3088-2a9c-452d-a088-ccbfd2686a96

// Here's your user_id

// uf31v0

$(document).ready(() => {

  const url = "https://api.thecatapi.com/v1/images/search?460e3088-2a9c-452d-a088-ccbfd2686a96" 

  page("/", one);
  page("/favs", favs);
  page();
  
 function one(){
    for(let i=0; i < 4; i++){
      $.ajax({
        type: "GET",
        url,
        success: getCats
      })
    }
 }

  function getCats(data){
    console.log(data);
  
    let kittyContainer = `<div class="kitty-container" id="parent-${data[0]["id"]}"><img src="${data[0]["url"]}"><i id="${data[0]["id"]}" onclick="clickLike()" class="icon-heart like"></i></div>`
  
    $("#kitty-area").append(kittyContainer);
  }

  function favs(){
    console.log("favs")
  }

})

function clickLike(){
  let catId = $(".like").attr("id")
  localStorage.setItem("id", catId)
}

// localStorage.setItem("id", catId)

// localStorage.getItem("id")

// localStorage.removeItem("id")

