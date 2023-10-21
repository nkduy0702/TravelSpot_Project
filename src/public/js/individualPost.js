const deleteIcon = document.getElementById("deleteIcon");
const updateIcon = document.getElementById("updateIcon");

deleteIcon.addEventListener("click", (e) => {
  console.log(e.target.childNodes[0].textContent);
});

updateIcon.addEventListener("click", (e) => {
  console.log(e.target.childNodes[0].textContent);
});
