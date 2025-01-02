let inp = document.querySelector("#inp");
let btn = document.querySelector("#bnt1");
let main = document.querySelector(".main");
let ulitem = document.querySelector("#ulitem");
let allTask = document.querySelector("#all_task");
let adiv = document.querySelector(".adiv");
let aitems = document.querySelector("#aitems");

// make function to add tasks

function add() {
  if (inp.value === "") {
    alert("Please enter some tasks to add.");
  }
  else {
    // make li and cross
    main.appendChild(ulitem);
    let li = document.createElement("li");
    li.innerHTML = inp.value;
    ulitem.appendChild(li);
    let cross = document.createElement("span");
    cross.innerHTML = "\u00d7";
    li.appendChild(cross);

    // for display only 4 tasks:
    while (ulitem.children.length > 4) {
      ulitem.removeChild(ulitem.firstChild);
    }
    // add an event on the cross:
    cross.addEventListener("click", () => {
      li.remove();
    });

    // for the all_task div:

    // create the list:
    adiv.appendChild(aitems);

    let ali = document.createElement("li");
    ali.innerHTML = inp.value;
    aitems.appendChild(ali);

    // create the cross button:
    let across = document.createElement("span");
    across.innerHTML = "\u00d7";
    ali.appendChild(across);

    //  for across:
    across.addEventListener("click", () => {
      ali.remove();
      saveData();
    });

    // create a circle div:

    let acheck = document.createElement("div");
    acheck.className = "acheck";
    ali.appendChild(acheck);

    // add event on for toggled  :

    ali.addEventListener("click", (event) => {
      if (event.target.tagName === "LI" || event.target === acheck) {
        ali.classList.toggle("checked");
        saveData();
      }
    });
    saveData();
  }

  inp.value = "";
}

// Show-Hide the alltask:
allTask.addEventListener("click", () => {
  if (adiv.style.display === "block") {
    adiv.style.display = "none";
  } else {
    adiv.style.display = "block";
  }
});

// Clear all button:

let clear = document.createElement("button");
clear.innerHTML = "Clear All";
adiv.appendChild(clear);

//  add event on clear button
clear.addEventListener("click", () => {
  aitems.innerHTML = " ";
  saveData();
});

// function to save data :
function saveData() {
  localStorage.setItem("data", aitems.innerHTML);
}

// to show data

function showData() {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    aitems.innerHTML = savedData;

    // Re-attach event listeners
    aitems.querySelectorAll("li").forEach((ali) => {
      ali.querySelector("span").addEventListener("click", () => {
        ali.remove();
        saveData();
      });

      ali.addEventListener("click", (event) => {
        if (
          event.target.tagName === "LI" ||
          event.target.className === "acheck"
        ) {
          ali.classList.toggle("checked");
          saveData();
        }
      });
    });
  }
}

showData();
