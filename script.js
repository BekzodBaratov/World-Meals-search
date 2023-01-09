"use Strict";

// "Arrabiata"
const mealItems = document.querySelector(".mealItems");
const inputMeal = document.querySelector(".inputMeal");
const btnChearch = document.querySelector(".btnChearch");
const getRecipe = document.querySelectorAll(".getRecipe");

let getRecipeAll;
let getAllData;
//////////////////////////////////////////////////////
function fetchAPI(mealName) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Ovqatni topolmadim ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((res) => {
      getAllData = res.meals;
      console.log(res);
      res.meals?.forEach((meal) => {
        renderHTML(meal);
      });
    });
  // .catch((error) => alert(error));
}

function cardHtml(data) {
  let html2 = `<div class="mealItemCard">
  <div class="close">x</div>
  <h2>${data.strMeal}</h2>
  <p>${data.strInstructions}</p>
  </div>`;
  mealItems.insertAdjacentHTML("afterbegin", html2);
  document.querySelector(".mealItemCard").style.display = "flex";
}

function closeBtn() {
  console.log("salom2");
  document.querySelector(".mealItemCard").style.display = "none";
}

function renderHTML(obj) {
  let html = `<div class="mealItem" >
  <div class="imgDiv">
  <img src="${obj.strMealThumb}" alt="meal_img">
  </div>
  <h2>${obj.strMeal}</h2>
  <button class="getRecipe" data-id=${obj.idMeal}>Get Recipe</button>
  </div>
  `;
  mealItems.insertAdjacentHTML("afterbegin", html);

  getRecipeAll = document.querySelectorAll(".getRecipe");
  const mealItem = document.querySelector(".mealItem");
  mealItem.addEventListener("click", (e) => {
    if (e.target.classList.value == "getRecipe") {
      let resep = getAllData.find((val) => {
        return e.target.getAttribute("data-id") == val.idMeal;
      });
      if (resep.idMeal === e.target.getAttribute("data-id")) {
        console.log(resep);
        cardHtml(resep);
      }
    }
    const close = document.querySelector(".close");
    const mealItemCard = document.querySelector(".mealItemCard");
    mealItemCard.addEventListener("click", () => {
      if (e.target.classList.value == "close") {
        closeBtn();
      }
    });
  });
}

///////////////////////////////////////////////

btnChearch.addEventListener("click", () => {
  fetchAPI(inputMeal.value);
  inputMeal.value = "";
  mealItems.innerHTML = "";
});
