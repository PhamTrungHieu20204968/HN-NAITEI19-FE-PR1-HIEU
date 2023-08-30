const gridIcon = document.querySelector(".grid-icon");
const listIcon = document.querySelector(".list-icon");
const gridLayout = document.querySelector(".grid-wrapper");
const listLayout = document.querySelector(".list-wrapper");

// console.log(gridLayout, listLayout);

gridIcon.addEventListener("click", function () {
  if (!gridIcon.className.includes("active")) {
    gridIcon.classList.add("active");
    listIcon.classList.remove("active");

    gridLayout.style.display = "block";
    listLayout.style.display = "none";
  }
});

listIcon.addEventListener("click", function () {
  console.log();
  if (!listIcon.className.includes("active")) {
    listIcon.classList.add("active");
    gridIcon.classList.remove("active");

    listLayout.style.display = "block";
    gridLayout.style.display = "none";
  }
});
