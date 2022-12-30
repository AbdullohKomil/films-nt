// var users = [
//   {
//     name: "Abdulloh",
//     debt: 10000,
//   },
//   {
//     name: "Bekzod",
//     debt: 20000,
//   },
//   {
//     name: "Rustam",
//     debt: 35000,
//   },
//   {
//     name: "Jamshid",
//     debt: 50000,
//   },
//   {
//     name: "Bunyod",
//     debt: 5000,
//   },
// ];

// const newArr = users.map((el) => {
//   return {
//     name: el.name + 'bek',
//     debt: el.debt + '$'
//   };
// })
// console.log(newArr);

// const newArr = users.filter((el) => el.name.length == 6);
// console.log(newArr);

// var arr = [true,false,true,false,true,]

// const newArr = arr.filter((el) => el == true)

// console.log(newArr.length);

// var numbers = [1, 2, 3, 4, 5, 6];

// const arr = [1, "asass", true, undefined, 2, null, "", "fdksj"];
// const arr2 = ["1", "asass", true, undefined, false, null, "", "fdksj"];

// --------------------------------------------UY ISHI------------------------------------------------------------------

let elBookmarkList = document.querySelector(".bookmark-js-list");
let bookmarkList = new Set();
function render(array, node) {
  node.innerHTML = "";
  array.forEach((item) => {
    var newBox = document.createElement("div");
    newBox.classList.add(
      "col-3",
      "text-center",
      "text-white",
      "bg-success",
      "mb-5",
      "ms-2",
      "text-light"
    );
    var appendBox = node.appendChild(newBox);

    var elImg = document.createElement("img");
    elImg.setAttribute("src", item.poster);
    elImg.setAttribute("width", "200px");
    newBox.appendChild(elImg);

    var elTitle = document.createElement("h4");
    elTitle.innerHTML = item.title;
    newBox.appendChild(elTitle);

    var elRelease = document.createElement("p");
    elRelease.innerHTML = item.release_date;
    elRelease.classList.add("text-warning");
    newBox.appendChild(elRelease);

    var elGenr = document.createElement("p");
    elGenr.innerHTML = item.genres;
    elGenr.classList.add("w-100");
    newBox.appendChild(elGenr);

    const newBtn = document.createElement("button");
    newBtn.textContent = "bookmark";
    newBtn.dataset.filmId = item.id;
    newBtn.setAttribute("class", "btn btn-light js-bookmark");
    newBox.appendChild(newBtn);
  });
}
var elRow = document.querySelector(".row");

const renderBookmarkFilms = (array, node) => {
  node.innerHTML = "";
  array.forEach((item) => {
    const newItem = document.createElement("li");
    const newText = document.createElement("p");
    const newDeleteButton = document.createElement("button");

    newItem.setAttribute("class", " align-items-center p-1 bg-dark d-flex ");
    newText.setAttribute("class", "m-0 text-light me-3");
    newDeleteButton.setAttribute("class", "delete-bookmark");

    newText.textContent = item.title;
    newDeleteButton.innerHTML = "&times;";
    newDeleteButton.dataset.filmId = item.id;
    newItem.appendChild(newText);
    newItem.appendChild(newDeleteButton);
    node.appendChild(newItem);
  });
};

render(films, elRow);
var elSelect = document.querySelector("#select-js");

let newArr = [];

films.forEach((item) => {
  var newBox = document.createElement("div");
  var elRow = document.querySelector(".row");
  newBox.classList.add(
    "col-3",
    "text-center",
    "text-white",
    "bg-success",
    "mb-5",
    "ms-2",
    "text-light"
  );
  var appendBox = elRow.appendChild(newBox);

  var elImg = document.createElement("img");
  elImg.setAttribute("src", item.poster);
  elImg.setAttribute("width", "200px");
  newBox.appendChild(elImg);

  var elTitle = document.createElement("h4");
  elTitle.innerHTML = item.title;
  newBox.appendChild(elTitle);

  var elRelease = document.createElement("p");
  elRelease.innerHTML = item.release_date;
  elRelease.classList.add("text-warning");
  newBox.appendChild(elRelease);

  var elGenr = document.createElement("p");
  elGenr.innerHTML = item.genres;
  elGenr.classList.add("w-100");
  newBox.appendChild(elGenr);
});

var elSelect = document.querySelector("#select-js");
elSelect.addEventListener("change", function () {
  newArr = [];

  if (elSelect.value != "All") {
    films.forEach((film) => {
      if (film.genres.includes(elSelect.value)) {
        newArr.push(film);
        render(newArr, elRow);
      }
    });
    render(newArr, elRow);
  } else {
    render(films, elRow);
  }
});

var selectOptions = [];
let newSet = new Set();
films.forEach((item) => {
  item.genres.forEach((type) => {
    newSet.add(type);
    // console.log(type);
  });
});
// console.log(newSet);
newSet.forEach((type) => {
  var elOption = document.createElement("option");
  elOption.value = type;
  elOption.textContent = type;
  elSelect.appendChild(elOption);
});

var elForm = document.querySelector(".js-form");
var elInput = document.querySelector(".js-search");
let Arr2 = [];
elForm.addEventListener("input", (evt) => {
  elRow.innerHTML = "";
  evt.preventDefault();
  let elInputVal = elInput.value.toLocaleLowerCase();
  films.forEach((el) => {
    if (el.title.toLocaleLowerCase().includes(elInputVal)) {
      newArr.push(el);
    }
  });
  render(newArr, elRow);
  newArr = [];
});

let elSelect_2 = document.querySelector("#select-js-2");
elSelect_2.addEventListener("change", () => {
  let elSelect_2Val = elSelect_2.value;
  if (elSelect_2Val != "default") {
    if (elSelect_2Val == "A-Z") {
      const filmsSort = films.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      });
      render(filmsSort, elRow);
    } else if (elSelect_2Val == "Z-A") {
      const filmsSort_2 = films.sort((a, b) => {
        if (a.title > b.title) {
          return -1;
        }
        if (a.title < b.title) {
          return 1;
        }
        return 0;
      });
      render(filmsSort_2, elRow);
    }
  } else {
    window.location.reload();
  }
});

elRow.addEventListener("click", (evt) => {
  if (evt.target.matches(".js-bookmark")) {
    const filmId = evt.target.dataset.filmId;

    const findedFilm = films.find((film) => film.id === filmId);

    bookmarkList.add(findedFilm);
    renderBookmarkFilms(bookmarkList, elBookmarkList);
  }
});

elBookmarkList.addEventListener("click", (evt) => {
  if (evt.target.matches(".delete-bookmark")) {
    const filmId = evt.target.dataset.filmId;

    const findedFilm = films.find((film) => film.id === filmId);

    bookmarkList.delete(findedFilm);
    renderBookmarkFilms(bookmarkList, elBookmarkList);
  }
});
