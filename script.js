const addList = document.querySelector("#addList");
const userBtn = addList.innerText;
const ulList = document.querySelector("#ulList");
const title = document.querySelector("#title");
const desc = document.querySelector("#desc");
const textSearch = document.querySelector("#text-search");
const todoList = document.querySelector(".todo-list");
const titlDesc = document.querySelector(".titl-desc");

// ========================================= fixed navbar  here=========================================
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
      document.getElementById("navbar_top").classList.add("fixed-top");
      // add padding top to show content behind navbar
      navbar_height = document.querySelector(".navbar").offsetHeight;
      document.body.style.paddingTop = navbar_height + "px";
    } else {
      document.getElementById("navbar_top").classList.remove("fixed-top");
      // remove padding top from body
      document.body.style.paddingTop = "0";
    }
  });
});
// =========================================DOMContentLoaded  end======================================
//  ================ here we store a data in this array and get data from localStorage============================
let editedId = null;
let storeData = [];
let newStoreData = JSON.parse(localStorage.getItem("todoList"));
if (newStoreData != null) {
  storeData = newStoreData;
}

//  ============= add using add btn user data code =============================================================
addList.addEventListener("click", (e) => {
  e.preventDefault();
  let titles = title.value.trim(),
    descs = desc.value.trim();
  let noteInfo = { titles, descs };
  if (titles && descs) {
    if (editedId != null) {
      storeData.splice(editedId, 1, noteInfo);
      todoList.style.position = "static";
      window.location.reload();
    } else {
      storeData.push(noteInfo);
    }
    saveData(storeData);
    title.value = "";
    desc.value = "";
    displayData();
    addList.innerText = userBtn;
  }
});

//  ============= save user data in localStorage code ============================================================
function saveData() {
  localStorage.setItem("todoList", JSON.stringify(storeData));
}

//  ============= show user data from localStorage getItem code ================================================
function displayData() {
  ulList.innerHTML = "";

  if (storeData.length === 0) {
    ulList.innerHTML = `<li class="no-record-list">No-record-exist please inset your record...!</li>`;
  } else {
    storeData.forEach((element, index) => {
      console.log(storeData.length);
      const liElement = document.createElement("li");
      const storeLiData = `
    <span class="span-text">${index + 1}</span>
    <span class="span-text">${element.titles}</span>
    <span class="span-text">${element.descs}</span>
    <span class="span-text">
    <span  class="edit-list" onclick="editData(${index}), '${
        element.titles
      }', '${
        element.descs
      }' "><i class="fa-sharp fa-solid fa-pen-to-square"></i></span>
    <span  class="delete-list" onclick="deleteData(${index})"><i class="fa-solid fa-trash-can"></i></span>
    </span>
    `;

      liElement.innerHTML = storeLiData;
      ulList.append(liElement);
    });
  }
}
displayData();

//  ============= =============Edit user data code =============================================================
function editData(index) {
  editedId = index;
  title.value = storeData[index].titles;
  desc.value = storeData[index].descs;
  addList.innerHTML = `<i class="fa-sharp fa-solid fa-pen-to-square"></i>`;
  todoList.style.position = "fixed";
  todoList.style.backgroundColor = "#5e5e30";
  let threshold = 800,
    thresHold = 600,
    thres_Hold = 550;
  let screenWidth = window.innerWidth;
  if (screenWidth > threshold) {
    todoList.style.width = "60%";
  } else if (screenWidth > thresHold) {
    todoList.style.width = "80%";
  } else if (screenWidth > thres_Hold) {
    todoList.style.width = "90%";
  } else {
    todoList.style.width = "96%";
  }
}

//  ============= =============delete user data code =============================================================
const deleteData = (index) => {
  let confirmD = confirm("Make suore yon wana delete");
  if (!confirmD) {
    alert("Your data is safe ");
  } else {
    storeData.splice(index, 1);
    console.log(index);
    saveData(storeData);
    displayData();
  }
};

// =========================================Search btn  start======================================

const searchAllLi = document.querySelectorAll("#ulList li");
textSearch.addEventListener("input", (e) => {
  const searchStr = e.target.value.trim().toLowerCase();
  ulList.innerHTML = "";
  searchAllLi.forEach((element) => {
    const span_in_li = element.querySelectorAll("span");
    const matchText = span_in_li[1].innerText.toLowerCase();
    const matchTextDesc = span_in_li[2].innerText.toLowerCase();
    console.log(matchText);
    if (
      matchText.indexOf(searchStr) > -1 ||
      matchTextDesc.indexOf(searchStr) > -1
    ) {
      ulList.appendChild(element);
    }
  });
  if (ulList.innerHTML == "") {
    ulList.innerHTML = `<i> No Record Found...</i>`;
    ulList.style.color = "#eee";
  }
});

// =========================================Search btn  start======================================
// =========================================Edit Close btn  start======================================

// =========================================Search btn  start======================================
